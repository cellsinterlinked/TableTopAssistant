import React, {useEffect, useState, useRef} from 'react';
import { GiConsoleController } from 'react-icons/gi';
import './Combat.css';
import MonsterCreator from './MonsterCreator';
import {GiPieceSkull} from 'react-icons/gi'
import PlayerMovement from './PlayerMovement';

const Combat = ({setUserYPosition, setUserXPosition, userXPosition, userYPosition, sendPlayerPosition, users, partyPosition, name, array, monsterData, sendMonsterInfo, role, stats, clearMonsterInfo}) => {
  
  const [newMonsterData, setNewMonsterData] = useState()
  const [activeMonster, setActiveMonster] = useState()
  const [hack, setHack] = useState(false)


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
//       // console.log(xValue.current)
//       // console.log(yValue.current)
//       }
//     );
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
    let position = {x: xValue.current, y: yValue.current}
    sendPlayerPosition(position)
    console.log(partyPosition)
  }

  const endMonsterTurn = () => {
    sendMonsterInfo(newMonsterData)
    console.log("end monster turn fired")
  }


  const wtfIsGoingOn = () => {
    console.log(stats)
  }

  
  
  
return (
    <div className="combat-outer-border">
        <button onClick={wtfIsGoingOn}>CHeck for shit</button>
    
      
      <div  id="contentContainer">
        {/* <img id="thing" alt="" style={{left: `${xValue.current}px`, top: `${yValue.current}px`}}src="//www.kirupa.com/images/smiley_red.png"></img> */}
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




          {/* {Object.keys(partyPosition).map((user, index) =>  <div 
          key={user} 
          id={user} 
          style={{left: `${partyPosition[user].position.x - ((index + 1) * 28)}px`, 
                  top: `${partyPosition[user].position.y}px`, 
                  position: "absolute", 
                  zIndex: `${array[index]}`, 
                  height: "28px",
                  width: "28px", 
                  transition: "left 0.5s ease-in, top 0.5s ease-in"}} 
           
          >
            <img 
          alt="" 
          src={partyPosition[user].icon}
          className="youSuck"
          >
          </img>
          </div> )} */}
          

          

          
        <img 
          className="combat-image" 
          alt="" 
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fksr-ugc.imgix.net%2Fassets%2F024%2F571%2F640%2Fd1fbc0f59a39b0171b84a00ad5a2e8df_original.jpg%3Fixlib%3Drb-2.1.0%26w%3D680%26fit%3Dmax%26v%3D1553776162%26auto%3Dformat%26gif-q%3D50%26q%3D92%26s%3D494a229e0ef305174afa42e843a5fda2&f=1&nofb=1"
          >
          </img>
            
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
        /> :
        
        <PlayerMovement endTurn={endTurn} stats={stats}/>
        
        }



    </div>
  )
}

export default Combat

