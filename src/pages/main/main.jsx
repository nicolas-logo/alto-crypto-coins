import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from "../../components/navBar/navBar";
import AllCoins from '../allCoins/allCoins';
import Coin from '../coin/coin';

export const SearchContext = React.createContext();

const Main = () => {
    const [searchText, setSearchText] = useState('');
    const value = {searchText, setSearchText};

    return (
        <SearchContext.Provider value={value}>
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<AllCoins />} />
                    <Route path='/coin' element={<Coin />} />
                </Routes>
            </Router>
        </SearchContext.Provider>
        
    )
}

export default Main;