import React from 'react';
import './DiceDrawer.css';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const DiceDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-right"
      mountOnEnter
      unmountOnExit
      >
      <aside className="diceDrawer">
        {props.children}
      </aside>
      </CSSTransition>
  )

  return ReactDOM.createPortal(content, document.getElementById('dice-hook'))
};

export default DiceDrawer;