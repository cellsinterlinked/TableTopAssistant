import React from 'react';
import './MapDrawer.css';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';

const MapDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-right"
      mountOnEnter
      unmountOnExit
      >
      <aside className="mapDrawer">
        {props.children}
      </aside>
      </CSSTransition>
  )

  return ReactDOM.createPortal(content, document.getElementById('map-drawer-hook'))
};

export default MapDrawer;