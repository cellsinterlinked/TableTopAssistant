import React, {useState, useEffect} from 'react';
import './MonsterDropDown.css'

const MonsterInputs = ({item, setSize, setIcon}) => {
  const [individualSize, setIndividualSize] = useState("small")
  const [individualIcon, setIndividualIcon] = useState("")


  return (
    <div className="monster-input-container">
      <input type="text" className="monster-input" placeholder="Portrait URL" value={individualIcon} onChange={(event) => setIndividualIcon(event.target.value)}/>
                <div className="monster-size-container">
                  <div className={individualSize === "small" ? "chosen" : "not-chosen"} onClick={() => setIndividualSize("small")}>S</div>
                  <div className={individualSize === "medium" ? "chosen" : "not-chosen"} onClick={() => setIndividualSize("medium")}>M</div>
                  <div className={individualSize === "large" ? "chosen" : "not-chosen"} onClick={() => setIndividualSize("large")}>L</div>
                  {/* <button onClick={() => console.log(individualSize)}>F</button> */}
                </div>
    </div>
  )
}

export default MonsterInputs;
