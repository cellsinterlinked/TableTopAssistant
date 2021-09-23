import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './NPCDisplay.css';
import NPC from './NPC';

const NPCDisplay = (props) => {
  const [NPCDisplayState, setNPCDisplayState] = useState(null)
  const [x, setX] = useState(0)

  useEffect(() => {
    setNPCDisplayState([...props.npcArray])
    console.log(props.npcArray)
  }, [props.npcArray])
    

  



  const goLeft = () => {
  
    x === 0 ? setX(-100 * (NPCDisplayState.length - 1)) : setX(x + 100);
    console.log(x);
  };

  const goRight = () => {
   
    x === -100 * (NPCDisplayState.length - 1) ? setX(0) : setX(x - 100);
    console.log(x);
  };


  return(
    <>
    {NPCDisplayState &&
    <div className="container-container">
    <div className="NPC-display-container">

      <button id="npcLeft" onClick={goLeft}>
        <FaChevronLeft className="arrow" />
      </button>
      
      <div className="npcSpinner">
        {NPCDisplayState.map((item, index) => (
          <div key={index} className="slidingNPC" style={{ transform: `translateX(${x}%)`}}>
            <NPC role={props.role} item={item} deleteNPCData={props.deleteNPCData} sendNPCNote={props.sendNPCNote} notePost={props.notePost} setNotePost={props.setNotePost} npcNotes={props.npcNotes}/>
          </div>
        ))}
      </div>

      <button id="npcRight" onClick={goRight}>
        <FaChevronRight className="arrow" />
      </button>


    </div>
    </div>
    }

    {NPCDisplayState === [] && <div>No State Bruh</div>}
    </>
  )
}

export default NPCDisplay;