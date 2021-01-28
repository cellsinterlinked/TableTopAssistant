import React from 'react';
import './Character.css';

const Character = (props) => {
  return (
    <div className='char-Container'>
      <div className="player-container-1">
        <h1>{props.name}</h1>
          <img alt="" src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fcovers%2Fimages%2F000%2F962%2F185%2Flarge%2Fcurro-rodriguez-heavyarmor1.jpg%3F1437145425&f=1&nofb=1'></img>
        </div>
      <div className="player-container-2">
        <div player-stat-holder>
          <div className='stats-1'> 

          </div>
          <div className='stats-2'> 

          </div>
        </div>
        <div className='player-dice-display'>
          <p>Dice Roll</p>
          <div className='player-dice-box'>
            <p></p>
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default Character;