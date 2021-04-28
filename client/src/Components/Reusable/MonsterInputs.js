import React, {useState} from 'react';
import './MonsterDropDown.css'

const MonsterInputs = ({item, setSize, setIcon, setMonsterGroup, monsterGroup}) => {
  const [individualSize, setIndividualSize] = useState("small")

  
  const mediumMod = () => {
    let newArr = [...monsterGroup]
    newArr[item.value - 1] = {...newArr[item.value - 1], size: "medium"}
    setMonsterGroup(newArr)
    setIndividualSize("medium")
    console.log(newArr)
  }

  const smallMod = () => {
    let newArr = [...monsterGroup]
    newArr[item.value - 1] = {...newArr[item.value - 1], size: "small"}
    setMonsterGroup(newArr)
    setIndividualSize("small")
    console.log(newArr)
  }

  const largeMod = () => {
    let newArr = [...monsterGroup]
    newArr[item.value - 1] = {...newArr[item.value - 1], size: "large"}
    setMonsterGroup(newArr)
    setIndividualSize("large")
    console.log(newArr)
  }

  const iconHandler = (event) => {
    let newArr = [...monsterGroup]
    newArr[item.value - 1] = {...newArr[item.value - 1], icon: event.target.value }
    setMonsterGroup(newArr)
  }




  return (
    <div className="monster-input-container">
      <input type="text" className="monster-input" placeholder="Portrait URL" value={monsterGroup[item.value - 1].icon} onChange={iconHandler}/>
                <div className="monster-size-container">
                  <div className={individualSize === "small" ? "chosen" : "not-chosen"} onClick={smallMod}>S</div>
                  <div className={individualSize === "medium" ? "chosen" : "not-chosen"} onClick={mediumMod}>M</div>
                  <div className={individualSize === "large" ? "chosen" : "not-chosen"} onClick={largeMod}>L</div>
               
                </div>
    </div>
  )
}

export default MonsterInputs;
