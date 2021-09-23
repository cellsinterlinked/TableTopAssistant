import React, {useState, useEffect} from 'react';
import './Character.css';
import DiceLoad from './DiceLoad';
import {GiIciclesAura} from 'react-icons/gi';
import {MdLiveHelp} from 'react-icons/md'

const Character = ({partyRolls, partyData, name, individualRole}) => {
  const [playerStats, setPlayerStats] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [correctName, setCorrectName] = useState("")

  // let user = props.name

  // let playerStats = props.partyData[user] || null;
  // let playerRoll = props.partyRolls[user]

  const funFunction = async () => {
     setIsLoading(true)
     setTimeout(() => {setIsLoading(false)}, 1000)

  }

  useEffect(() => {
  
    setPlayerStats(partyData[name])
    setCorrectName(newName())
  },[partyData, name])

  useEffect(() => {
    funFunction()
  }, [individualRole])

  
const newName = () => {
  const caps = name.charAt(0).toUpperCase() + name.slice(1);
  return caps;
  
}


  return (
    <>
    {!playerStats && <div className='char-Container'>
      <div className="empty-character">
        <h1 className="update-char-name">{correctName}</h1>
        <h1 className="update-stats-h1">UPDATE YOUR STATS!</h1>
        <div className="stats-directions">
          <p>CLICK THE CHARACTER ICON ON RIGHT SIDE NAVIGATION TOOL</p>
          <GiIciclesAura style={{height: "3rem", width: "auto"}}/>
          <p>IF YOU NEED HELP WITH ANY OTHER PART OF THE USER INTERFACE, CLICK THE TUTORIAL ICON</p>
          <MdLiveHelp style={{height: "3rem", width: "auto"}} />
        </div>

      </div>
      </div>}


    {playerStats &&  <div className='char-Container'>
      {/* <button onClick={() => console.log(playerStats)}>CharacterInfo</button> */}
      <div className="player-container-1">
        <div className="i-hate-you">
          <img alt="" src={partyData[name].text.portrait}></img>
        </div>
        <h1>{correctName}</h1>
        </div>





      <div className="player-container-2">
        <div className='player-stat-holder'>
          <div className='stats-1'>

            <p>HP {playerStats.text.hp}</p>  
            <p>AC {playerStats.text.ac}</p>
            <p>Melee+ {playerStats.text.melee}</p>
            <p>Ranged+ {playerStats.text.ranged}</p>
            <p>P.P. +</p>
            <p>P.I. +</p>
          </div>
          <div className='stats-2'> 
            <p>Str+ {playerStats.text.str}</p>
            <p>Dex+ {playerStats.text.dex}</p>
            <p>Con+ {playerStats.text.con}</p>
            <p>Wis+ {playerStats.text.wis}</p>
            <p>Int+ {playerStats.text.int}</p>
            <p>Con+ {playerStats.text.cha}</p>
          </div>
        </div>
        <div className='player-dice-display'>
          <h1 className="player-display-roll-text">Recent Dice Roll</h1>
          {!isLoading && <div className='player-dice-box'>
             {individualRole === undefined ? <p>0</p> : <p>{individualRole.number}</p>}
            {/* <button onClick={() => console.log(playerRoll.number)}>Click</button> */}
          </div>}
          {isLoading && <DiceLoad/>}
        </div>

      
      </div>
    </div>}
    </>
  )
}

export default Character;