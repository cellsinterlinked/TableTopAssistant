import React, {useState, useEffect} from 'react'
import './MonsterCreator.css';
import PlayerListItem from './PlayerListItem';
import DiceRoll from '../DiceRoll';



const PlayerMovement = ({endTurn, stats, partyPosition, setPlayerSize, playerSize, partyData, name, sendPlayerRoll}) => {
  return (
    <div className="monster-creator-container">
      
      <div className="monster-list-container">
       <PlayerListItem stats={stats} setPlayerSize={setPlayerSize} playerSize={playerSize} partyData={partyData} name={name}/>
        <button onClick={endTurn} className="minions-button">CONFIRM MOVEMENT</button>
        {/* <button onClick={() => {console.log(partyPosition)}} className="minions-button">Party Position</button> */}
      </div>
      <div className="black-background">
      <DiceRoll sendPlayerRoll={sendPlayerRoll} />

      </div>
    </div>
  )
}

export default PlayerMovement;