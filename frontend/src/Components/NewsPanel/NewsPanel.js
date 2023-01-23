import React from 'react'
import './NewsPanel.css'
import NewComponent from '../NewComponent/NewComponent'

function NewsPanel({news}) {
  return (
    <div className='newsPanel'>
        {news.map( element => <NewComponent key={element._id} element={element}/> )}
    </div>
  )
}

export default NewsPanel