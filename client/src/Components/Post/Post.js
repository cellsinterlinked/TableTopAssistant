import React, {useState} from 'react'
import './Post.css';

const Post = (props) => {
  const [tempWorld, setTempWorld] = useState(null)
  const [tempChar, setTempChar] = useState({portrait: "", name: ""})
  // const [tempCharName, setTempCharName] = useState(null)
  

  const newMapHandler = () => {
    if(tempWorld !== null) {props.sendMapData(tempChar)}
    setTempWorld(null);
    document.getElementById("mapInput").value = ""
    console.log(`new map handler is working ${tempWorld} is map`)
  }

  const newNPCHandler = () => {
    if(tempChar.name && tempChar.portrait !== "") {props.sendNPCData(tempChar)}
    setTempChar({portrait: "", name: ""})
    document.getElementById("portrait-input").value = ""
    document.getElementById("npc-name-input").value = ""
  }

  const checkState = () => {
    console.log(tempChar)
  }

  return(
    <div className="postContainer">
      <div className="worldContainer">
      <p>POST A MAP</p>
      <input id="mapInput" placeholder="Map URL" className="mapInput" type="text" value={tempWorld} onChange={(event) => setTempWorld(event.target.value)}></input>
      <div className="worldButtonContainer"><button className="worldSubmitButton" onClick={newMapHandler}>SET MAP</button></div>
      {tempWorld && <div className="mapPrev"><img src={tempWorld} alt="" /></div>}
      </div>

      <div className="portraitContainer">
        <p>POST AN NPC</p>
        <input id="portrait-input" placeholder="Portrait URL" className="portraitInput" type="text" value={tempChar.portrait} onChange={(event) => setTempChar({...tempChar, portrait: event.target.value})}></input>
        <input id="npc-name-input" placeholder="Name" className="portraitInput" type="text" value={tempChar.name} onChange={(event) => setTempChar({...tempChar, name:event.target.value})}></input>
        <div className="portraitButtonContainer"><button className="portraitSubmitButton" onClick={newNPCHandler}>CREATE NPC</button></div>
        <div className="portraitButtonContainer"><button className="portraitSubmitButton" onClick={checkState}>Check state</button></div>
        {tempChar && <div className="portraitPreview"><img src={tempChar.portrait} alt="" /></div>}
        {/* {tempCharArray !== [] && <div className="portraitListContainer">Pictures of Stuff</div> } */}
        
      </div>


      

    </div>
  )
}
export default Post;