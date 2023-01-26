import React, { useState } from 'react'
import { useNewsContext } from '../../hooks/useNewsContext'
import './AddNewPopup.css'

function AddNewPopup({popupAction}) {
    
    const { dispatch } = useNewsContext()

    const [title, setTitle] = useState('')
    const [uploadDate, setUploadDate] = useState('')
    const [content, setContent] = useState('')
    const [expireDate, setExpireDate] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newNew = {title, uploadDate, content, expireDate}

        const response = await fetch('/api/news', {
            method: 'POST',
            body: JSON.stringify(newNew),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            console.log(error)
        } else {
        setTitle('')
        setUploadDate('')
        setContent('')
        setExpireDate('')
        setError(null)
        setEmptyFields([])
        dispatch({type: "CREATE_NEW", payload: json})
        }
    }

  return (
    <div className='addNewPopup'>
        <h2 className='addNewPopupTitle'> Add NEW</h2>
        <form className='addNewForm' action='/button-type' onSubmit={handleSubmit}>

            <input className={`inputField ${emptyFields.includes('title') ? 'error' : ''}`} type="text" id="title" name="title" placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title}/>
            <label className='label' for="Date of upload">Date of upload</label>
            <input className={`inputField ${emptyFields.includes('uploadDate') ? 'error' : ''}`} type="date" id="uploadDate" name="uploadDate" placeholder='Uploaded at date:' onChange={(e) => setUploadDate(e.target.value)} value={uploadDate}/>
            <textarea className={`contentField ${emptyFields.includes('content') ? 'error' : ''}`} name="message" placeholder='Content:' onChange={(e) => setContent(e.target.value)} value={content}/>
            <label className='label' for="Expiring date">Expiring date</label>
            <input className={`inputField ${emptyFields.includes('expireDate') ? 'error' : ''}`} type="date" id="expireDate" name="expireDate" placeholder='Expires at date:' onChange={(e) => setExpireDate(e.target.value)} value={expireDate}/>

            <div className="addNewPopupButtons">
                <button className='closePopupButton' type="reset" onClick={popupAction}>Close</button>
                <button className='addNewButton' type="submit">Add</button>
            </div>
        </form>
    </div>
  )
}

export default AddNewPopup