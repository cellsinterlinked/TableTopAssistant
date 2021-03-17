import React, {useState, useEffect} from 'react';
import './DropDowns.css';

const DropDowns = () => {
const [drop1Extended, setDrop1Extended] = useState(false)
const [drop2Extended, setDrop2Extended] = useState(false)

  const showDropDown = () => {
    if (drop1Extended) {
      setDrop1Extended(false)
    }
    if (!drop1Extended) {
      setDrop1Extended(true)
    }
  }

  const showDropDown2 = () => {
    if (drop2Extended) {
      setDrop2Extended(false)
    }
    if (!drop2Extended) {
      setDrop2Extended(true)
    }
  }

  return (
    <div className="dropdown-container">
      <form>
        <div className='multi-select'>
          <div className="select-box" onClick={showDropDown}>
          <select>
            <options>Select A Languages</options>
          </select>
            <div className="over-select"><p>Select A Language</p></div>
          </div>
          <div id={drop1Extended ? "check-boxes-expanded" : "check-boxes"}>
            <label for="language-one"><input type="checkbox" id="language-one"/>First Checkbox</label>
            <label for="language-two"><input type="checkbox" id="language-two"/>Second Checkbox</label>
            <label for="language-three"><input type="checkbox" id="language-three"/>Third Checkbox</label>

          </div>


        </div>


        <div className='multi-select2'>
          <div className="select-box" onClick={showDropDown2}>
          <select>
            <options>Select Players</options>
          </select>
            <div className="over-select"><p>Select Players</p></div>
          </div>
          <div id={drop2Extended ? "check-boxes-expanded" : "check-boxes"}>
            <label for="player-one"><input type="checkbox" id="player-one"/>First Checkbox</label>
            <label for="player-two"><input type="checkbox" id="player-two"/>Second Checkbox</label>
            <label for="player-three"><input type="checkbox" id="player-three"/>Third Checkbox</label>

          </div>


        </div>
      </form>

    </div>
  )
}

export default DropDowns;