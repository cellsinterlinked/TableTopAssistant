import React, { useState } from 'react';
import Dice from '../Resources/toppng.com-emini-polyhedral-black-green-gold-x7-green-black-rpg-dice-436x397.png';
import DiceRoll from './DiceRoll';
import './InputBar.css';

const InputBar = ({stats, setStats, name, playerData, setPlayerData, sendPlayerData }) => {
  

  const setDiceRoll = (roll) => {
    setStats({...stats, dice: roll})
  }

  


  return (
  <form className="inputBarContainer" onSubmit={sendPlayerData}>

    <div className="charBox3">
      <img src="https://www.muddycolors.com/wp-content/uploads/2018/01/Art-id-314800-Human-Blade-final-363x600.jpg" alt="pretty character"></img>

    </div>

    <div className="charBox1">

    <div className="input-character-name">
      <h1>{name}</h1>
    </div>

    <div className="charInputDiv">
      <p>HP</p>
    <input 
    className="charInput"
    value={stats.hp}
    onChange={(event) => setStats({...stats, hp: event.target.value})}
    // value={props.playerData}
    // onChange={(event) => props.setPlayerData(event.target.value)}
    // onKeyPress={event => event.key === 'Enter' ? props.sendPlayerData(event) : null}
    >
    </input>
    </div>


    <div className="charInputDiv">
      <p>AC</p>
      <input className="charInput"
        value={stats.ac}
        onChange={(event) => setStats({...stats, ac: event.target.value})}
      >
      </input>
      <button onClick={() => console.log(stats)}>ShowState</button>
    </div>

    <div className="charInputDiv">
      <p>Melee Bonus</p>
      <input className="charInput"
      value={stats.melee}
      onChange={(event) => setStats({...stats, melee: event.target.value})}
      ></input>
    </div>

    <div className="charInputDiv">
      <p>Ranged Bonus</p>
      <input className="charInput"
      value={stats.ranged}
      onChange={(event) => setStats({...stats, ranged: event.target.value})}
      ></input>
    </div>
    </div>

  <div className="charBox2">

    <div className="charInputDiv">
      <p>Str Save</p>
      <input className="charInput"
      value={stats.str}
      onChange={(event) => setStats({...stats, str: event.target.value})}
      ></input>
    </div>

    <div className="charInputDiv">
      <p>Dex Save</p>
      <input className="charInput"
      value={stats.dex}
      onChange={(event) => setStats({...stats, dex: event.target.value})}
      ></input>
    </div>

    <div className="charInputDiv">
      <p>Con Save</p>
      <input className="charInput"
      value={stats.con}
      onChange={(event) => setStats({...stats, con: event.target.value})}
      ></input>
    </div>

    <div className="charInputDiv">
      <p>Int save</p>
      <input className="charInput"
      value={stats.int}
      onChange={(event) => setStats({...stats, int: event.target.value})}
      ></input>
    </div>

    <div className="charInputDiv">
      <p>Wis Save</p>
      <input className="charInput"
      value={stats.wis}
      onChange={(event) => setStats({...stats, wis: event.target.value})}
      ></input>
    </div>

    <div className="charInputDiv">
      <p>Cha Save</p>
      <input className="charInput"
      value={stats.cha}
      onChange={(event) => setStats({...stats, cha: event.target.value})}
      ></input>
    </div>

    <div className="submit-stats-container">
      <button className="submit-stats" type="button" onClick={sendPlayerData} >Update Stats</button>
    </div>
  </div>


    <div className="charBox4">
      <img id="diceImage" src={Dice} alt="dice"></img>

    </div>


    <DiceRoll setDiceRoll = {setDiceRoll}/>
  {/* <button className='sendButton' type='submit'>Set Stats</button> */}
  </form>

  
  )
  
}

export default InputBar