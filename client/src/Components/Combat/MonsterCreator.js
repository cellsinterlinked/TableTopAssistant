import React, {useState, useEffect, useRef} from 'react'
import './MonsterCreator.css';
import CustomDropDown from '../Reusable/CustomDropdown';
import MonsterDropDown from '../Reusable/MonsterDropDown';
import { CgCloseR }  from 'react-icons/cg'
import {GiPieceSkull} from 'react-icons/gi'
import MonsterListItem from './MonsterListItem';

const MonsterCreator  = ({monsterData, sendMonsterInfo, setActiveMonster, setQuery, removeThisCrap, newMonsterData, setNewMonsterData, hack, setHack, endTurn, endMonsterTurn, clearMonsterInfo}) => {

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
 


  const monsterStatusHandler = (activeMonster) => {
    console.log(activeMonster)
  if (newMonsterData){
    if (activeMonster.dead === false) {
  let monsterDataCopy = newMonsterData;
  monsterDataCopy[activeMonster.value - 1] = {...monsterDataCopy[activeMonster.value - 1], dead: true}
  console.log("going from not dead to dead")
  setNewMonsterData([...monsterDataCopy])

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
  }

  return (
    <div className="monster-creator-container">
      <CustomDropDown title="NUMBER OF UNITS" items={monsterNumberArr} singleState={monsterNum} setSingleState={setMonsterNum} setSecondState={setMonsterGroup}  />
      {monsterNum && newMonsterData && <MonsterDropDown title="MONSTER ICONS" items={monsterGroup} setMonsterGroup={setMonsterGroup} monsterGroup={monsterGroup} />}
       <button onClick={checker} className="minions-button">CREATE MY MINIONS!</button>
      <div className="monster-list-container">
        {newMonsterData && newMonsterData.map(monster => (
          <MonsterListItem hack={hack} setHack={setHack}key={monster.id} monsterStatusHandler={monsterStatusHandler} monster={monster} removeThisCrap={removeThisCrap} setActiveMonster={setActiveMonster} newMonsterData={newMonsterData} setNewMonsterData={setNewMonsterData} />
          
        ))}
        {newMonsterData && <button onClick={endMonsterTurn} className="minions-button">CONFIRM MOVEMENT</button>}
        {newMonsterData && <button className="minions-button" onClick={clearMonsterInfo}>CLEAR MONSTERS</button>}
      </div>
    </div>
  )
}

export default MonsterCreator;