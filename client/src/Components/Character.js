import React, {useState, useEffect} from 'react';
import './Character.css';
import DiceLoad from './DiceLoad';

const Character = ({partyRolls, partyData, name, individualRole}) => {
  const [playerStats, setPlayerStats] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  // let user = props.name

  // let playerStats = props.partyData[user] || null;
  // let playerRoll = props.partyRolls[user]

  const funFunction = async () => {
     setIsLoading(true)
     setTimeout(() => {setIsLoading(false)}, 2000)

  }

  useEffect(() => {
  
    setPlayerStats(partyData[name])
  },[partyData, name])

  useEffect(() => {
    funFunction()
  }, [individualRole])

  



  return (
    <>
    {!playerStats && <div className='char-Container'>
      <div className="empty-character">
        <h1 className="update-char-name">{name}</h1>
        <h1 className="update-stats-h1">Update Your Stats!</h1>

      </div>
      </div>}


    {playerStats &&  <div className='char-Container'>
      {/* <button onClick={() => console.log(playerStats)}>CharacterInfo</button> */}
      <div className="player-container-1">
        <h1>{name}</h1>
        <div className="i-hate-you">
          <img alt="" src={playerStats.text.portrait}></img>
        </div>
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