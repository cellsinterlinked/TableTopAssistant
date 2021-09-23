import React from 'react'
import { CSSTransition } from 'react-transition-group'
import Backdrop from '../Navigation/BackDrop'
import ReactDOM from 'react-dom';
import './Modal.css'

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.modalStyle}`}>
      
      <header className="modalHeader">
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className="modalContent">{props.children}</div>
        <footer className="modalFooter">{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
  }

  const Modal = (props) => {
    return (
      <>
        {props.show && <Backdrop onClick={props.onCancel} />}
        <CSSTransition
          in={props.show}
          mountOnEnter
          unmountOnExit
          timeout={200}
          classNames="modal"
        >
          <ModalOverlay {...props}  />
        </CSSTransition>
      </>
    );
  };
  
  export default Modal;

