import React, {useState} from 'react'
import './Dice.css';
import DiceRoll from '../DiceRoll'
import DicePic from '../../Resources/toppng.com-emini-polyhedral-black-green-gold-x7-green-black-rpg-dice-436x397.png'


const Dice = ({sendPlayerRoll}) => {
  return (
    <div className="dice-container">
      <div className="dice-picture-container">
        <img src={DicePic} alt=""></img>
      </div>
      <DiceRoll sendPlayerRoll={sendPlayerRoll} />

    </div>
  )
}

export default Dice;