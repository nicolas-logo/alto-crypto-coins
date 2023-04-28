import React, { useReducer, useContext } from 'react';

const AppContext = React.createContext();

const useAppContext = () => {
    return useContext(AppContext);
}

const initialState = {
    searchText: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_SEARCH_TEXT': {
            return {
                ...state,
                searchText: action.value
            }
        }
        default: return state
    }
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <AppContext.Provider value={{searchText: state.searchText, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export {
    AppProvider,
    useAppContext
}