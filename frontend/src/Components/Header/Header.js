import React from 'react'
import './Header.css'

function Header({popupAction}) {
  return (
    <div className='header'>
        <h1 className='title'>News PANEL</h1>
        <button onClick={popupAction} className='addNew'>
            <strong>+</strong>
        </button>
    </div>
  )
}

export default Header