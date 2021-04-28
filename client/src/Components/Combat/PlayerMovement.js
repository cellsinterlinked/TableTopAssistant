import React, {useState, useEffect} from 'react'
import './MonsterCreator.css';
import PlayerListItem from './PlayerListItem';



const PlayerMovement = ({endTurn, stats}) => {
  return (
    <div className="monster-creator-container">
      
      <div className="monster-list-container">
       <PlayerListItem stats={stats}/>
        <button onClick={endTurn} className="minions-button">CONFIRM MOVEMENT</button>

      </div>
    </div>
  )
}

export default PlayerMovement;