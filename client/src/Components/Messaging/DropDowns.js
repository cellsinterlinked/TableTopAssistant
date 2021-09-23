import React, {useState, useEffect} from 'react';
import './DropDowns.css';
import {MdExpandMore} from 'react-icons/md';

const DropDowns = ({users, setRecipients, recipients, name}) => {
const [drop1Extended, setDrop1Extended] = useState(false)
const [drop2Extended, setDrop2Extended] = useState(false)
const [userArray, setUserArray] = useState()



useEffect(() => {
  setUserArray(users.filter(user => user.name !== name))
},[name, users])


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

  

  const handleCheckboxChange = (event) => {
    // console.log(recipients)
    let newArray = [...recipients, event.target.id];
    if (recipients.includes(event.target.id)) {
      newArray = newArray.filter(user => user !== event.target.id)
    }
    setRecipients(newArray)
    // console.log(recipients)
  }

  return (
    <div className="dropdown-container" onMouseLeave={() => setDrop2Extended(false)}>
      <form>
        {/* <div className='multi-select'>
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


        </div> */}


        <div className='multi-select2'>
          <div className="select-box" onClick={showDropDown2}>
          <select>
            <options>Select Players</options>
          </select>
            <div className="over-select"><p>SELECT RECIPIENTS</p><MdExpandMore className={drop2Extended ? "down-drop rotated" : "down-drop"}/></div>
          </div>
          <div id={drop2Extended ? "check-boxes-expanded" : "check-boxes"} >
          {users && userArray && userArray.map((user) => <label key={user.id} for={user.name}>
            <input className="recipient-check-box" type="checkbox" id={user.name} onChange={handleCheckboxChange}/>
              <p className="recipient-name-list">{user.name}</p>
              </label>)}

          
          
            

          </div>


        </div>
      </form>

    </div>
  )
}

export default DropDowns;