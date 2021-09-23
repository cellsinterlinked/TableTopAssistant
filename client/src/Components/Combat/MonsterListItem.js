import React, {useState, useEffect} from 'react'
import './MonsterCreator.css';
import {GiPieceSkull} from 'react-icons/gi'
import { CgCloseR }  from 'react-icons/cg'

const MonsterListItem = ({monster, removeThisCrap, setActiveMonster, newMonsterData, setNewMonsterData, monsterStatusHandler, hack, setHack}) => {
  const [dead, setDead] = useState(false)

  return (
    
      <div className="monster-list-item-container" draggable="true" >
        <div className="monster-item-image">
          {monster.dead === true && <GiPieceSkull className="dead-icon" />}
          {monster.dead === false && <img src={monster.icon} alt="" />}
        </div>
        <div className="select-monster-container">
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
          setHack(hack)
          setDead(!dead)
        }}>
          <CgCloseR className="monster-delete-icon"/>
        </div>



      </div>
    

  )
}

export default MonsterListItem;