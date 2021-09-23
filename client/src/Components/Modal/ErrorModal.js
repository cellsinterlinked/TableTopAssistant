import { Link } from 'react-router-dom';  
import React from 'react';
import Modal from './Modal';
import './ErrorModal.css';

const ErrorModal = (props) => {
  return (
    <Modal
      modalStyle = {props.modalStyle}
      // onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={
        
        
      <Link style={{textDecoration: "none", margin:"auto"}} to="/">
        <button onClick={props.onClear}>
          Okay
        </button>
      
      </Link>
      }
    >
      <p className="error-message">{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;