import React, {useState} from 'react';
import './NPC.css';
import ScrollToBottom from 'react-scroll-to-bottom';

const NPC = ({item, deleteNPCData, sendNPCNote}) => {
  const [displayNotes, setDisplayNotes] = useState(false);
  const [notePost, setNotePost] = useState("")

  const notesHandler = () => {
    setDisplayNotes(true)
  }

  const protraitHandler = () => {
    setDisplayNotes(false)
  }

  const deleteHandler = () => {
    deleteNPCData(item.name)
  }

  const noteHandler = () => {
    let noteObject = {name: item.name, note: notePost}
    if (notePost !== null) {sendNPCNote(noteObject)}
    document.getElementById("noteInput").value = ""
  }


  return( 
    <div className="npc-card">

      {displayNotes && 
      <div className="scroll-hate">
        <h1 className="notes-header">Notes</h1>
      <ScrollToBottom className="npc-notes-container">
        <p>Here is our first note about this npc</p>
        <p>Here is our second note about this npc</p>
        <p>Here is even more notes about our npc</p>
        <p>This NPC is really a dick</p>
        <p>Here is our first note about this npc</p>
        <p>Here is our second note about this npc</p>
        <p>Here is even more notes about our npc</p>
        <p>This NPC is really a dick</p>
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
      <button onClick={deleteHandler}>DELETE</button>
      {!displayNotes && <button onClick={notesHandler}>NOTES</button>}
      {displayNotes && <button onClick={protraitHandler}>PORTRAIT</button>}

    </div>
  )
}

export default NPC