import React, { useState } from 'react'
import { useNewsContext } from '../../hooks/useNewsContext'
import './NewComponent.css'
import DeletePopup from '../DeletePopup/DeletePopup'

function NewComponent({element}) {

  const { dispatch } = useNewsContext()

  const handleDelete = async () => {
    const response = await fetch('/api/news/' + element._id, {
      method: 'DELETE'
    })

    const json = await response.json()

    if(response.ok) {
      dispatch({ type: 'DELETE_NEW', payload: json})
    }
  }

  const [showPopup, setShowPopup] = useState(false)
  const togglePopup = () => { setShowPopup(!showPopup) }

  return (
    <div className='newComponent'>
        <div className="newHeader">
            <h2 className='newTitle'>{element.title}</h2>
            <button className='componentButton' onClick={togglePopup}><strong>-</strong></button>
        </div>
        <DeletePopup handleDelete={handleDelete} togglePopup={togglePopup} showPopup={showPopup}/>
        <div className="newContent">
            <span className='newContentText'>{element.content}</span>
        </div>
    </div>
  )
}

export default NewComponent