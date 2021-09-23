import React, {useState} from 'react'
import './Post.css';

const Post = (props) => {
  const [tempWorld, setTempWorld] = useState("")
  const [tempChar, setTempChar] = useState({portrait: "", name: ""})
  const [tempCombatMap, setTempCombatMap] = useState('')
  // const [tempCharName, setTempCharName] = useState(null)

  // NEXT THING TO DO build out tempCombatMap and use setCombatMap from props to send
  

  const newMapHandler = () => {
    if(tempWorld !== "") {props.sendMapData(tempWorld)
      props.showNotification('Map Was Posted!')
      console.log("should be firing")
    }
    setTempWorld("");
    document.getElementById("mapInput").value = ""
    console.log(`new map handler is working ${tempWorld} is map`)
  }

  const newNPCHandler = () => {
    if(tempChar.name && tempChar.portrait !== "") {props.sendNPCData(tempChar)
      props.showNotification('New NPC Was Added!')
      console.log("should be firing")
    }
    setTempChar({portrait: "", name: ""})
    document.getElementById("portrait-input").value = ""
    document.getElementById("npc-name-input").value = ""
  }

  const newCombatHandler = () => {
    if(tempCombatMap !== '') {props.sendCombatMap(tempCombatMap)
      props.showNotification('Combat Map Was Added!')
      console.log("should be firing")
    
    }
    setTempCombatMap('')
    document.getElementById('battle-map-input').value = ""
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
        {/* <div className="portraitButtonContainer"><button className="portraitSubmitButton" onClick={checkState}>Check state</button></div> */}
        {tempChar && <div className="portraitPreview"><img src={tempChar.portrait} alt="" /></div>}
        {/* {tempCharArray !== [] && <div className="portraitListContainer">Pictures of Stuff</div> } */}
        
      </div>

      <div className="battle-map-post-container">
        <p>POST A COMBAT MAP</p>
        <input id="battle-map-input" placeholder="Battle Map URL" className="mapInput" type="text" value={tempCombatMap} onChange={(event) => setTempCombatMap(event.target.value)}></input>
        <div className="worldButtonContainer"><button className="worldSubmitButton" onClick={newCombatHandler}>SET COMBAT MAP</button></div>
        {tempCombatMap && <div className="mapPrev"><img src={tempCombatMap} alt="URL Not Valid"/></div>}

      </div>


      

    </div>
  )
}
export default Post;