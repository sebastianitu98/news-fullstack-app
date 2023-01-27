import { useEffect, useRef, useState } from 'react';
import { useNewsContext } from './hooks/useNewsContext';
import './App.css';
import AddNewPopup from './Components/AddNewPopup/AddNewPopup';
import Header from './Components/Header/Header';
import NewsPanel from './Components/NewsPanel/NewsPanel';

function App() {

  const {news, dispatch} = useNewsContext()
  const [addNewPopupVisibility, setAddNewPopupVisibility] = useState(false)

  useEffect(() => {
    //get data from the server (get all news)
    const getData = async () => {
      const response = await fetch('/api/news')
      const json = await response.json()
      if(response.ok) {
        dispatch({ type: 'SET_NEWS', payload: json })
      }
    }
    getData()
  }, [])

  const appElement = useRef(null)
  
  const popupAction = () => {
    setAddNewPopupVisibility(current =>!current)
  }

  return (
    <div className="App" ref={appElement}>
      <Header popupAction={popupAction}/>

      {news && <NewsPanel news={news}/>}

      <div className={addNewPopupVisibility ? 'addNewPopupElement visibile' : 'addNewPopupElement hidden'}>
        <AddNewPopup popupAction={popupAction}/>
      </div>
      
    </div>
  );
}

export default App;
