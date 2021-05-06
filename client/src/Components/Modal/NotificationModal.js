import React from 'react'
import { CSSTransition } from 'react-transition-group'
import Backdrop from '../Navigation/BackDrop'
import ReactDOM from 'react-dom';
import './NotificationModal.css'

const NotificationModalOverlay = (props) => {
  const content = (
    <div className="notification-modal">
      
      <header className="notification-modalHeader">
        <h2>{props.header}</h2>
      </header>
      {/* <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      > */}
        <div className="notification-modalContent">{props.children}</div>
        <footer className="notification-modalFooter">{props.footer}</footer>
      {/* </form> */}
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('notification-hook'));
  }

  const NotificationModal = (props) => {
    return (
      <>
        {/* {props.show && <Backdrop onClick={props.onCancel} />} */}
        <CSSTransition
          in={props.show}
          mountOnEnter
          unmountOnExit
          timeout={200}
          classNames="notification-modal"
        >
          <NotificationModalOverlay {...props}  />
        </CSSTransition>
      </>
    );
  };
  
  export default NotificationModal;

