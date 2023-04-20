import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from "./components/navBar/navBar";
import AllCoins from './pages/allCoins/allCoins';
import Coin from './pages/coin/coin';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

const App = ()  => {
    return (
        <div className="app">
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<AllCoins />} />
                    <Route path='/coin' element={<Coin />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;