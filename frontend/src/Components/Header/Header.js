import React from 'react'
import './Header.css'

function Header({popupAction}) {
  return (
    <div className='header'>
        <h1 className='title'>News APP</h1>
        <button onClick={popupAction} className='addNew' title='Add NEW'>
            <strong>+</strong>
        </button>
    </div>
  )
}

export default Header