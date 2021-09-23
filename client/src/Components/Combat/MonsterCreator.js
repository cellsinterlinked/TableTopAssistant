import React, {useState, useEffect, useRef} from 'react'
import './MonsterCreator.css';
import CustomDropDown from '../Reusable/CustomDropdown';
import MonsterDropDown from '../Reusable/MonsterDropDown';
import { CgCloseR }  from 'react-icons/cg'
import {GiPieceSkull} from 'react-icons/gi'
import MonsterListItem from './MonsterListItem';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'


const MonsterCreator  = ({monsterData, sendMonsterInfo, setActiveMonster, setQuery, removeThisCrap, newMonsterData, setNewMonsterData, hack, setHack, endTurn, endMonsterTurn, clearMonsterInfo, clearPlayerPosition, activeMonster, showNotification}) => {

  const monsterNumberArr = [
    {id:"monster1", value:1, dead:false, xPosition:20, yPosition:20, icon: "", size: "small"}, {id:"monster2", value:2, dead:false, xPosition:20, yPosition:60, icon: "", size: "small"}, 
    {id:"monster3", value:3, dead:false, xPosition:20, yPosition:100, icon: "", size: "small"}, {id:"monster4", value:4, dead:false, xPosition:20, yPosition:140, icon: "", size: "small"}, 
    {id:"monster5", value:5, dead:false, xPosition:20, yPosition:180, icon: "", size: "small"}, {id:"monster6", value:6, dead:false, xPosition:20, yPosition:220, icon: "", size: "small"}, 
    {id:"monster7", value:7, dead:false, xPosition:20, yPosition:260, icon: "", size: "small"}, {id:"monster8", value:8, dead:false, xPosition:20, yPosition:300, icon: "", size: "small"}, 
    {id:"monster9", value:9, dead:false, xPosition:20, yPosition:340, icon: "", size: "small"}, {id:"monster10", value:10, dead:false, xPosition:20, yPosition:380, icon: "", size: "small"},
    {id:"monster11", value:11, dead:false, xPosition:20, yPosition:420, icon: "", size: "small"},{id:"monster12", value:12, dead:false, xPosition:20, yPosition:460, icon: "", size: "small"},
    {id:"monster13", value:13, dead:false, xPosition:20, yPosition:500, icon: "", size: "small"},{id:"monster14", value:14, dead:false, xPosition:20, yPosition:540, icon: "", size: "small"},
    {id:"monster15", value:15, dead:false, xPosition:20, yPosition:580, icon: "", size: "small"},
  ]
  const [monsterNum, setMonsterNum] = useState([{id:0, value:0}]);
  const [monsterGroup, setMonsterGroup] = useState()
  const [monsterOrder, setMonsterOrder] = useState(newMonsterData ? [...newMonsterData] : null)

  

  const monsterStatusHandler = (activeMonster) => {
    console.log(activeMonster)
  if (newMonsterData){
    if (activeMonster.dead === false) {
  let monsterDataCopy = newMonsterData;
  monsterDataCopy[activeMonster.value - 1] = {...monsterDataCopy[activeMonster.value - 1], dead: true}
  console.log("going from not dead to dead")
  setNewMonsterData([...monsterDataCopy])
  console.log(newMonsterData)

} 

  if (activeMonster.dead === true) {
  let monsterDataCopy = newMonsterData;
  monsterDataCopy[activeMonster.value - 1] = {...monsterDataCopy[activeMonster.value - 1], dead: false}
  console.log("going from dead to not dead")
  console.log(monsterDataCopy);
  setNewMonsterData([...monsterDataCopy])
  
}
  }
  }

  const checker = () => {
    console.log(monsterNum, monsterGroup)
    sendMonsterInfo(monsterGroup)
    setMonsterOrder([...monsterGroup])
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(monsterOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMonsterOrder(items)
  }

  return (
    <div className="monster-creator-container">
      <CustomDropDown title="NUMBER OF UNITS" items={monsterNumberArr} singleState={monsterNum} setSingleState={setMonsterNum} setSecondState={setMonsterGroup}  />
      {monsterNum[0].id !== 0 &&  <MonsterDropDown title="MONSTER ICONS" items={monsterGroup} setMonsterGroup={setMonsterGroup} monsterGroup={monsterGroup} />}
       <button onClick={checker} className="minions-button">CREATE MY MINIONS!</button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="monsters">
        {(provided) => (
      <div className="monster-list-container" {...provided.droppableProps} ref = {provided.innerRef}>
        {monsterOrder && monsterOrder.map((monster, index) => (
          <Draggable key={monster.id} draggableId={monster.id} index={index}>
          {(provided) => (
            <div className="monster-list-item-container" draggable="true" {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}  >
             
            <div className="monster-item-image">
              {monster.dead === true && <GiPieceSkull className="dead-icon" />}
              {monster.dead === false && <img src={monster.icon} alt="" />}
            </div>
            <div className={activeMonster && activeMonster.id === monster.id ? "select-monster-container activeSelect" : "select-monster-container"}>
              <button onClick={() => {
            removeThisCrap();
            setActiveMonster(monster);
            // does remove this crap need to be actually called here? does the onclick need an anonymous function?
            
            }}>
                SELECT
              </button>
              </div>
            <div className="monster-item-delete" onClick={() => {
              monsterStatusHandler(monster)
              showNotification("Monster Status Changed")
              setHack(hack)

            }}>
              <CgCloseR className="monster-delete-icon"/>
            </div>
          </div>
          )}
          </Draggable>
          ))}
        {provided.placeholder}
      </div>
        )}
      </Droppable>
      </DragDropContext>
        {newMonsterData && <button onClick={endMonsterTurn} className="minions-button">CONFIRM MOVEMENT</button>}
        {newMonsterData && <button className="minions-button" onClick={() => {setMonsterOrder(null)
          clearMonsterInfo() }}>CLEAR MONSTERS</button>}

        <button className='minions-button' onClick={clearPlayerPosition}>CLEAR PLAYERS</button>
    </div>
  )
}

export default MonsterCreator;