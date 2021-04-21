import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import './MonsterDropDown.css';
import MonsterInputs from './MonsterInputs';

function Dropdown({ title, items, multiSelect = false, headingStyle, setSingleState, singleState}) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
        setSingleState([item]);
     

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
    <div className={`monster-drop-wrapper ${headingStyle}`}>
      <div
        tabIndex={0}
        className={`monster-drop-header ${headingStyle}`}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className='-monster-drop-header__title'>
          <p className="monster-drop-header__title--bold">{title}</p>
        </div>
        <div className="monster-drop-header__action">
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>
      {open && (
        <ul className="monster-drop-list">
          {items.map(item => (
            <li className="monster-drop-list-item" key={item.id}>
              <button >
                <MonsterInputs item={item} />
                {/* <input type="text" className="monster-input" placeholder="Portrait URL" />
                <div className="monster-size-container">
                  <button>S</button>
                  <button>M</button>
                  <button>L</button>
                </div> */}
                {/* <span>{item.value}</span>
                <span>{isItemInSelection(item) && 'Selected'}</span> */}
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
