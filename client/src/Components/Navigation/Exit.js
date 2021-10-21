import React from 'react'
import './Exit.css';
import { Link } from 'react-router-dom';

const Exit = ({bigLogoutFunction, closeModal}) => {

  const removeExit = () => {
    sessionStorage.clear()
    closeModal()
  }
  return (
    <div className="exit-buttons-container">
      <Link to={`/`}>
      <button className="yes-exit" onClick={removeExit}>YES</button>
      </Link>
      <button className="no-exit" onClick={closeModal}>NO</button>
    </div>
  )
}

export default Exit 