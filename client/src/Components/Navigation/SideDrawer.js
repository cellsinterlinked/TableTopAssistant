import React from 'react';
import './SideDrawer.css';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-right"
      mountOnEnter
      unmountOnExit
      >
      <aside className="sideDrawer">
        {props.children}
      </aside>
      </CSSTransition>
  )

  return ReactDOM.createPortal(content, document.getElementById('chat-drawer-hook'))
};

export default SideDrawer;