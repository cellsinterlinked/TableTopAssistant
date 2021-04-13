import React, {useState} from 'react'
import './Help.css';

const Help = () => {
  const [imageState, setImageState] = useState("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2F51%2F83%2F70%2F51837059f0a09c351ef1a1c4e5ca8919--ship-map-rpg-map.jpg&f=1&nofb=1")

  return (
    <div className="help-container">
      <img className="help-image" src={imageState} alt=""></img>
      <div className="help-footer">
        <p onClick={() => setImageState('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F7e%2F9e%2F4e%2F7e9e4e727946b5cdb89468da5db54c9a.jpg&f=1&nofb=1')}>POSTING CHARACTER STATS</p>
        <p>PLAYER SCREEN</p>
        <p>DICE ROLLS</p>
        <p>MESSAGING</p>
        <p>COMBAT MAP</p>
        <p>POSTING MAPS</p>
        <p>POSTING NPC's</p>
      </div>
    </div>
  )
}

export default Help