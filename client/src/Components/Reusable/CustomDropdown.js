import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import './CustomDropdown.css';
import {MdExpandMore} from 'react-icons/md';

function Dropdown({ title, items, multiSelect = false, headingStyle, setSingleState, singleState, setSecondState}) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
        setSingleState([item]);
        setSecondState(items.slice(0, [item.value]))
        // this is going to fuck up your front page if you keep it like this. Consider making an if statement or another component for this drop down completely

      } else if (multiSelect) {
        setSelection([...selection, item]);
        setSingleState([...singleState, item])
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
      setSingleState([...selectionAfterRemoval])
    }
  }

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
        <MdExpandMore className={open ? "down-drop rotated" : "down-drop"}/>
          {/* <p>{open ? 'Close' : 'Open'}</p> */}
        </div>
      </div>
      {open && (
        <ul className="drop-list">
          {items.map(item => (
            <li className="drop-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
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
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
