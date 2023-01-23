import React from 'react'
import './DeletePopup.css'

function DeletePopup({handleDelete, togglePopup, showPopup}) {

  return (
    <div className={showPopup ? 'deletePopup shown' : 'deletePopup notShown'}>
        <p className='paragraph'>Are you sure?</p>
        <p className='paragraph'>Your action will delete the NEW!!</p>
        <div className="buttons">
            <button className='button' onClick={handleDelete}>YES</button>
            <button className='button' onClick={togglePopup}>NO</button>
        </div>
    </div>
  )
}

export default DeletePopup