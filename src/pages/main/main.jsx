import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { AppProvider } from '../../providers/AppProvider';

const NavBar = lazy( () => import("../../components/navBar/navBar"));
const AllCoins = lazy( () => import("../allCoins/allCoins"));
const Coin = lazy( () => import("../coin/coin"));

export const SearchContext = React.createContext();

const Main = () => {
    //const [searchText, setSearchText] = useState('');
    //const value = {searchText, setSearchText};

    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<AllCoins />} />
                        <Route path='/coin' element={<Coin />} />
                    </Route>
                </Routes>
            </Router>
        </AppProvider>
    )
}

const Layout = () => {
    return (
        <>
            <NavBar />
            <Suspense fallback={<h1>Loading...</h1>}>
                <Outlet />
            </Suspense>   
        </>
    )
}

export default Main;