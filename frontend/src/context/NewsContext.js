import { createContext, useReducer } from "react";

export const NewsContext = createContext()

export const newsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NEWS':
            return {
                news: action.payload
            }
        case 'CREATE_NEW':
            return {
                news: [...state.news, action.payload]
            }
        case 'DELETE_NEW':
            return {
                news: state.news.filter((n) => n._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const NewsContextProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(newsReducer, {
        news: null
    })


    return(
        <NewsContext.Provider value={{...state, dispatch}}>
            {children}
        </NewsContext.Provider>
    )
}