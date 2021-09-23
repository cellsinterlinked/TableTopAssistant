import React, {useEffect, useState, useRef} from 'react';
import { GiConsoleController } from 'react-icons/gi';
import './Combat.css';
import MonsterCreator from './MonsterCreator';
import {GiPieceSkull} from 'react-icons/gi'
import PlayerMovement from './PlayerMovement';
import PlayerInitiative from './PlayerInitiative';

const Combat = ({
  setUserYPosition, 
  setUserXPosition, 
  userXPosition, 
  userYPosition, 
  sendPlayerPosition, 
  users, 
  partyPosition, 
  name, 
  array, 
  monsterData, 
  sendMonsterInfo, 
  role, 
  stats, 
  clearMonsterInfo, 
  clearPlayerPosition, 
  combatMap, 
  partyData, 
  partyRolls,
  showNotification
}) => {
  
  const [newMonsterData, setNewMonsterData] = useState(monsterData ? [...monsterData]: null)
  const [activeMonster, setActiveMonster] = useState()
  const [hack, setHack] = useState(false)
  const [playerSize, setPlayerSize] = useState(partyPosition[name] ? partyPosition[name].position.size : "small")

  const xValue = useRef(localStorage.getItem('xValue') ? JSON.parse(localStorage.getItem('xValue')) : 50)
  const yValue = useRef(localStorage.getItem('yValue') ? JSON.parse(localStorage.getItem('yValue')) : 50)

useEffect(() => {
  if(monsterData) {
  setNewMonsterData([...monsterData])}
  else {
    setNewMonsterData()
  }
},[monsterData])

  // make this use effect conditional for if it is a player
  
//   useEffect(() => {
//     if (role === 'DM') {return}
//     else if(role === 'PLAYER') {
//     let theThing = document.querySelector("#thing");
//     let container = document.querySelector("#contentContainer")
//     container.addEventListener("click", function(event) {
//       xValue.current = event.clientX - container.getBoundingClientRect().left - (theThing.clientWidth / 2);
//       yValue.current = event.clientY - container.getBoundingClientRect().top - (theThing.clientHeight / 2);
//       window.localStorage.setItem("xValue", JSON.stringify(xValue.current))
//       window.localStorage.setItem('yValue', JSON.stringify(yValue.current))
//       // for monster instead of doing this,just make it go straight to the new copy monsterData
//       setUserXPosition(xValue.current)
//       setUserYPosition(yValue.current)
//       }
    
//     );
//     }
// }, [users])
// make this use effect conditional for if its a DM



let container = document.querySelector("#contentContainer")
let thisBullshit = (event) => {
  let monsterToken = document.querySelector(`#${activeMonster.id}`);
  let monsterX = event.clientX - container.getBoundingClientRect().left - (monsterToken.clientWidth / 2);
  let monsterY = event.clientY - container.getBoundingClientRect().top - (monsterToken.clientHeight / 2);
  let monsterDataCopy = newMonsterData;
  monsterDataCopy[activeMonster.value - 1] = {...monsterDataCopy[activeMonster.value - 1], xPosition: monsterX}
  monsterDataCopy[activeMonster.value - 1] = {...monsterDataCopy[activeMonster.value - 1], yPosition: monsterY}
  console.log(monsterToken)
  monsterToken.style.left = monsterX + "px";
  monsterToken.style.top = monsterY + "px";
  setNewMonsterData(monsterDataCopy)
  monsterToken = 0;
  // container.removeEventListener("click", thisBullshit)
  return(console.log("you clicked")) }
  
  let removeThisCrap = () => {
    container.removeEventListener("click", thisBullshit)
  }


  useEffect(() => {
  if (activeMonster) {
    container.addEventListener("click", thisBullshit)
  }}, [activeMonster])
    
    
    
  

// activeMonster, newMonsterData, monsterData

  const endTurn = () => {
    let position = {x: xValue.current, y: yValue.current, size: playerSize}
    sendPlayerPosition(position)
    console.log(partyPosition)
  }

  const endMonsterTurn = () => {
    sendMonsterInfo(newMonsterData)
    showNotification('Monster Movement Sent')
    console.log("end monster turn fired")
  }


  const wtfIsGoingOn = () => {
    console.log(stats)
  }

  
  
  
return (
    <div className="combat-outer-border">
        {/* <button onClick={wtfIsGoingOn}>CHeck for shit</button> */}
    <PlayerInitiative   
      partyData={partyData}
      partyRolls={partyRolls}
      users={users}
      />
      
      <div  id="contentContainer">
        {role && role !== "DM" &&<div id="thing" className={partyPosition[name] ? `${partyPosition[name].position.size}` : 'small'}  style={{left: `${xValue.current}px`, top: `${yValue.current}px`}}src="//www.kirupa.com/images/smiley_red.png">
          <img className="my-icon-image" alt="" src={stats.portrait}></img>
          </div>}
       {/* this should contain the image of the player's character, and the players character should not render below with the other characters */}

        {newMonsterData && newMonsterData.map(monster => <button 
          id={monster.id}
          key={monster.id} 
          className={`monster-token-container ${monster.size}`}
          style={{left: `${monster.xPosition}px`, top: `${monster.yPosition}px`}}
          // onClick={() => {if (activeMonster === monster) {setActiveMonster(null)} else {setActiveMonster(monster)}}}
          >
          {monster.dead === true ? <GiPieceSkull className="dead-token"/> : <img alt="" src={monster.icon}></img>}
          {/* {monster.dead === false && <img alt="" src={monster.icon}></img>} */}

          </button>)}


          {/* {Object.keys(partyPosition).map((user, index) */}

          {Object.keys(partyPosition).filter(player => player !== name).map((user, index) =>  <div 
          className={`${partyPosition[user].position.size} circle`}
          key={user} 
          id={user}  
          style={{left: `${partyPosition[user].position.x}px`, 
                  top: `${partyPosition[user].position.y}px`, 
                  position: "absolute", 
                  zIndex: `${array[index]}`,
                  borderRadius: "50%" ,
                  // height: "28px",
                  // width: "28px", 
                  transition: "left 0.5s ease-in, top 0.5s ease-in"}} 
           
          >
            {partyData[user] && <img 
          alt="" 
          src={partyData[user].text.portrait}
          className="youSuck"
          >
          </img>}
          </div> )}
          

          

          
        {combatMap && <img 
          className="combat-image" 
          alt="" 
          src={combatMap}
          >
          </img>}
            
      </div>

      {role === "DM" ? <MonsterCreator 
        endTurn={endTurn} 
        hack={hack} 
        setHack={setHack} 
        sendMonsterInfo={sendMonsterInfo} 
        monsterData={monsterData} 
        setActiveMonster={setActiveMonster} 
        removeThisCrap={removeThisCrap} 
        newMonsterData={newMonsterData} 
        setNewMonsterData={setNewMonsterData}
        endMonsterTurn={endMonsterTurn}
        clearMonsterInfo={clearMonsterInfo}
        clearPlayerPosition={clearPlayerPosition}
        activeMonster={activeMonster}
        showNotification={showNotification}
        /> :
        
        <PlayerMovement endTurn={endTurn} stats={stats} partyPosition={partyPosition} setPlayerSize={setPlayerSize} playerSize={playerSize}/>
        
        }



    </div>
  )
}

export default Combat

