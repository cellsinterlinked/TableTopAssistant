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

  return (
    <div className="dropdown-container">
      <form>
        <div className='multi-select'>
          <div className="select-box" onClick={showDropDown}>
          <select>
            <options>Select A Language</options>
          </select>
            <div className="over-select">Select A Language</div>
          </div>
          <div id={drop1Extended ? "check-boxes-expanded" : "check-boxes"}>
            <label for="one"><input type="checkbox" id="one"/>First Checkbox</label>
            <label for="two"><input type="checkbox" id="two"/>Second Checkbox</label>
            <label for="three"><input type="checkbox" id="three"/>Third Checkbox</label>

          </div>


        </div>



      </form>

    </div>
  )
}

export default DropDowns;