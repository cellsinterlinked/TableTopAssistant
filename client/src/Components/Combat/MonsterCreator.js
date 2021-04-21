import React, {useState, useEffect, useRef} from 'react'
import './MonsterCreator.css';
import CustomDropDown from '../Reusable/CustomDropdown';
import MonsterDropDown from '../Reusable/MonsterDropDown';

const MonsterCreator  = () => {

  const monsterNumberArr = [
    {id:1, value:1, active:false, xPosition:0, yPosition:0, icon: "", size: "small"}, {id:2, value:2, active:false, xPosition:0, yPosition:0, icon: "", size: "small"}, 
    {id:3, value:3, active:false, xPosition:0, yPosition:0, icon: "", size: "small"}, {id:4, value:4, active:false, xPosition:0, yPosition:0, icon: "", size: "small"}, 
    {id:5, value:5, active:false, xPosition:0, yPosition:0, icon: "", size: "small"}, {id:6, value:6, active:false, xPosition:0, yPosition:0, icon: "", size: "small"}, 
    {id:7, value:7, active:false, xPosition:0, yPosition:0, icon: "", size: "small"}, {id:8, value:8, active:false, xPosition:0, yPosition:0, icon: "", size: "small"}, 
    {id:9, value:9, active:false, xPosition:0, yPosition:0, icon: "", size: "small"}, {id:10, value:10, active:false, xPosition:0, yPosition:0, icon: "", size: "small"},
    {id:11, value:11, active:false, xPosition:0, yPosition:0, icon: "", size: "small"},{id:12, value:12, active:false, xPosition:0, yPosition:0, icon: "", size: "small"},
    {id:13, value:13, active:false, xPosition:0, yPosition:0, icon: "", size: "small"},{id:14, value:14, active:false, xPosition:0, yPosition:0, icon: "", size: "small"},
    {id:15, value:15, active:false, xPosition:0, yPosition:0, icon: "", size: "small"},
  ]
  const [monsterNum, setMonsterNum] = useState([{id:0, value:0}]);
  const [monsterGroup, setMonsterGroup] = useState()
 



  


  const checker = () => {
    console.log(monsterNum, monsterGroup, monsterNumberArr.slice(0, 5))
  }

  return (
    <div className="monster-creator-container">
      <CustomDropDown title="NUMBER OF UNITS" items={monsterNumberArr} singleState={monsterNum} setSingleState={setMonsterNum} setSecondState={setMonsterGroup} />
      {monsterNum && <MonsterDropDown title="MONSTER ICONS" items={monsterGroup} />}
      <button onClick={checker} className="minions-button">CREATE MY MINIONS!</button>
    </div>
  )
}

export default MonsterCreator;