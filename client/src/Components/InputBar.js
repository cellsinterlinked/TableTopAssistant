import React, { useState } from 'react';
import Dice from '../Resources/toppng.com-emini-polyhedral-black-green-gold-x7-green-black-rpg-dice-436x397.png';
import DiceRoll from './DiceRoll';
import './InputBar.css';

const InputBar = (props) => {
  // const [stats, setStats] = useState({
  //   hp: '0',
  //   ac: '0',
  //   melee: '0',
  //   ranged: '0',
  //   str: '0',
  //   dex: '0',
  //   con: '0',
  //   int: '0',
  //   wis: '0',
  //   cha: '0'
  // })

  


  return (
  <form className="inputBarContainer" onSubmit={props.sendMessage}>

    <div className="charBox3">
      <img src="https://www.muddycolors.com/wp-content/uploads/2018/01/Art-id-314800-Human-Blade-final-363x600.jpg" alt="pretty character"></img>

    </div>

    <div className="charBox1">

    <div className="input-character-name">
      <h1>{props.name}</h1>
    </div>

    <div className="charInputDiv">
      <p>HP</p>
    <input 
    className="charInput"
    value={props.message}
    onChange={(event) => props.setMessage(event.target.value)}
    onKeyPress={event => event.key === 'Enter' ? props.sendMessage(event) : null}
    >
    </input>
    </div>


    <div className="charInputDiv">
      <p>AC</p>
      <input className="charInput"></input>
    </div>

    <div className="charInputDiv">
      <p>Melee Bonus</p>
      <input className="charInput"></input>
    </div>

    <div className="charInputDiv">
      <p>Ranged Bonus</p>
      <input className="charInput"></input>
    </div>
    </div>

  <div className="charBox2">

    <div className="charInputDiv">
      <p>Str Save</p>
      <input className="charInput"></input>
    </div>

    <div className="charInputDiv">
      <p>Dex Save</p>
      <input className="charInput"></input>
    </div>

    <div className="charInputDiv">
      <p>Con Save</p>
      <input className="charInput"></input>
    </div>

    <div className="charInputDiv">
      <p>Int save</p>
      <input className="charInput"></input>
    </div>

    <div className="charInputDiv">
      <p>Wis Save</p>
      <input className="charInput"></input>
    </div>

    <div className="charInputDiv">
      <p>Cha Save</p>
      <input className="charInput"></input>
    </div>

    <div className="submit-stats-container">
      <button className="submit-stats" type="button" onClick={props.sendMessage} >Update Stats</button>
    </div>
  </div>


    <div className="charBox4">
      <img id="diceImage" src={Dice} alt="dice"></img>

    </div>


    <DiceRoll/>
  {/* <button className='sendButton' type='submit'>Set Stats</button> */}
  </form>

  
  )
  
}

export default InputBar