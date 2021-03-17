import React from 'react';
import './PostDrawer.css';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const PostDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-right"
      mountOnEnter
      unmountOnExit
      >
      <aside className="postDrawer">
        {props.children}
      </aside>
      </CSSTransition>
  )

  return ReactDOM.createPortal(content, document.getElementById('post-hook'))
};

export default PostDrawer;