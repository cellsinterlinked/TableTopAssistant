import React, {useState, useEffect} from 'react';
import './NPC.css';
import ScrollToBottom from 'react-scroll-to-bottom';


const NPC = ({item, deleteNPCData, sendNPCNote, notePost, setNotePost, npcNotes, role}) => {
  const [localNotes, setLocalNotes] = useState()
  const [displayNotes, setDisplayNotes] = useState(false);
  // const [notePost, setNotePost] = useState("")

  useEffect(() => {
    setLocalNotes(npcNotes[item.name])
  },[npcNotes, item.name])

  const notesHandler = () => {
    setDisplayNotes(true)
  }

  const protraitHandler = () => {
    setDisplayNotes(false)
  }

  const deleteHandler = () => {
    deleteNPCData(item.name)
  }

  const noteHandler = async() => {
    // let noteObject = {name: item.name, note: notePost}
     if (notePost !== null) {await sendNPCNote(item.name, notePost)}
    document.getElementById("noteInput").value = ""
    setLocalNotes(npcNotes[item.name])
  }


  return( 
    <div className="npc-card">

      {displayNotes && 
      <div className="scroll-hate">
        <h1 className="notes-header">Notes</h1>
      <ScrollToBottom className="npc-notes-container">
        {localNotes !== [] && localNotes.map((note, index) => (<li key={index}>{note}</li>) )}
        {localNotes === [] && <h1>Enter A Below To Leave Notes About This NPC</h1>}
      </ScrollToBottom>
      </div>}
      {displayNotes &&
        <div className="npc-notes-input-container">
        <textarea id="noteInput" className="npc-notes-input" placeholder="Add a new note" onChange={(event) => setNotePost(event.target.value)}>

        </textarea>
        <button onClick={noteHandler}>Write Note</button>
        </div>
        
      
      }

        

      
      {!displayNotes && <div className="npc-image">
        <img src={item.portrait} alt=""></img>
      </div>}
      <p>{item.name}</p>
      {role === "dm" && <button onClick={deleteHandler}>DELETE</button>}
      {!displayNotes && <button onClick={notesHandler}>NOTES</button>}
      {displayNotes && <button onClick={protraitHandler}>PORTRAIT</button>}

    </div>
  )
}

export default NPC