import React from 'react'
import './PlayerListItem.css';

const PlayerListItem = ({stats}) => {
  return(
    <div className="player-list-item-container">

      <div className="player-movement-portrait-container">
        {stats.portrait !== "" ? <img alt="" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F48%2Fd9%2Ffe%2F48d9fe2350419ac984aac2a74076878a--fantasy-art-men-fantasy-heroes.jpg&f=1&nofb=1"/> : <h1 className="no-portrait-content">YOU MUST SET CHARACTER STATS AND PORTRAIT BEFORE USING THE COMBAT MAP!</h1>}
      </div>

      <div className="player-movement-control-bar">
          <button>CLICK THEN CHOOSE LOCATION</button>

          <div className="player-movement-size-container">
              <div className="player-size-button">S</div>
              <div className="player-size-button">M</div>
              <div className="player-size-button">L</div>
          </div>

      </div>
    </div>
  )
}

export default PlayerListItem;