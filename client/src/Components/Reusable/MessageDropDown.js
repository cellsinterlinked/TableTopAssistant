import React, { useState, useEffect } from 'react';
import onClickOutside from 'react-onclickoutside';
import './MessageDropDown.css'

function MessageDropdown({ title, items, multiSelect = true, headingStyle, setSingleState, singleState, name, users}) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [userArray, setUserArray] = useState()

  useEffect(() => {
    setUserArray(items.filter(user => user.name !== name))
  },[name, items])

  const toggle = () => setOpen(!open);
  MessageDropdown.handleClickOutside = () => setOpen(false);




  function handleOnClick(item) {
    if (!selection.some(current => current.name === item.name)) {
      if (!multiSelect) {
        setSelection([item.name]);
        setSingleState([item.name]);

      } else if (multiSelect) {
        setSelection([...selection, item.name]);
        setSingleState([...singleState, item.name])
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.name !== item.name
      );
      setSelection([...selectionAfterRemoval]);
      setSingleState([...selectionAfterRemoval])
    }
  }
// this isn't working worth a shit



  function isItemInSelection(item) {
    if (selection.some(current => current.id === item.id)) {
      return true;
    }
    return false;
  }




  return (
    <div className={`drop-wrapper ${headingStyle}`}>
      <div
        tabIndex={0}
        className={`drop-header ${headingStyle}`}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className='drop-header__title'>
          <p className="drop-header__title--bold">{title}</p>
        </div>
        <div className="drop-header__action">
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>
      {open && (
        <ul className="drop-list">
          {userArray.map(item => (
            <li className="drop-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.name}</span>
                <span>{isItemInSelection(item) && 'Selected'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => MessageDropdown.handleClickOutside,
};

export default onClickOutside(MessageDropdown, clickOutsideConfig);
