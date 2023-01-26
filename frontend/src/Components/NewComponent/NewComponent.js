import React, { useState } from 'react'
import { useNewsContext } from '../../hooks/useNewsContext'
import './NewComponent.css'
import DeletePopup from '../DeletePopup/DeletePopup'

function NewComponent({element}) {

  const { dispatch } = useNewsContext()

  const [showPopup, setShowPopup] = useState(false)
  const [showContentPopup , setShowContentPopup] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)

  const togglePopup = () => { setShowPopup(!showPopup) }
  const toggleContentPopup = () => { setShowContentPopup(!showContentPopup) }
  const toggleErrorPopup = () => { setShowErrorPopup(!showErrorPopup) }

  const handleDelete = async () => {
    if(element.canBeRemoved) {
      const response = await fetch('/api/news/' + element._id, {
        method: 'DELETE'
      })

      const json = await response.json()

      if(response.ok) {
        dispatch({ type: 'DELETE_NEW', payload: json})
      }
    } else {
      toggleErrorPopup();
      togglePopup();
    }
  }
  

  return (
    <div className={element.canBeRemoved ? 'newComponent green-border' : 'newComponent red-border'}>
        <div className="newHeader">
            <h2 className='newTitle'>{element.title}</h2>
            <button className='componentButton' onClick={togglePopup} title='Delete NEW'><strong>-</strong></button>
        </div>
        <DeletePopup handleDelete={handleDelete} togglePopup={togglePopup} showPopup={showPopup}/>
        <div className="newContent" onClick={toggleContentPopup}>
            <span className='newContentText' title='Read more'> {element.content} </span>
            <div className={showContentPopup ? "contentPopup shown" : "contentPopup notShown"}>
              <h2>{element.title}</h2>
              {element.content}
            </div>
        </div>
        <div className={showErrorPopup ? "errorPopup shown" : "errorPopup notShown"}>
          <h5 className='errorText'>This element can not be deleted! It is a default element meant to describe the overview of the project</h5>
          <h6 className='errorText'>NOTE: Eeach element with a red border can not be deleted. In order to test an element functionality just add one element and test it.</h6>
          <button className='errorButton' onClick={toggleErrorPopup}>OK</button>
        </div>
    </div>
  )
}

export default NewComponent