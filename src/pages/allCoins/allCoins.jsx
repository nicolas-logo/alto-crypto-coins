import React from 'react';
import searchIcon from './../../Assets/search.svg';
import CoinCard from '../../components/coinCard/coinCard'
import { useEffect, useState } from "react";
import { GetCoinList, SearchCoins } from '../../apiClients/coinClientAPI';
import { Link } from 'react-router-dom';
import CoinContentType from '../../contentTypes/coins';


const AllCoins = () => {
    const [coins, setCoins] = useState([]);
    const [searchText, setSearchText] = useState([]);
    //this is used just to show or not trending coins h3
    const [showingTrendingCoins, setShowingTrendingCoins] = useState(true);

    const getDefaultCoinList = async () => {
        const coinList = await GetCoinList();

        const coinsMapped = coinList.coins.map(coin => CoinContentType(coin));

        setCoins(coinsMapped);
    }

    const searchCoin = async () => {debugger;
        const coinList = await SearchCoins({searchText});
        
        const coinsMapped = coinList.coins.map(coin => CoinContentType(coin));
        
        setCoins(coinsMapped);
        setShowingTrendingCoins(false);
    }

    //to prevent multiple request to the api, we just search on Enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchCoin();
        }
      }

    useEffect(() => {
        getDefaultCoinList();
    },[])

    return(
        <>
            <div className="search">
                <input
                    placeholder="Search for coin..."
                    onChange={(event) => {setSearchText(event.target.value)}}
                    onKeyDown={handleKeyDown}
                />
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => {}}
                />
            </div>
            <main>
                { showingTrendingCoins ? (
                    <div className='row'>
                        <h3>Trending Coins:</h3>
                    </div>
                ): null } 
                <div className="container">
                    {
                        coins?.length > 0 ? 
                            (coins.map(coin => ( 
                                <Link key={coin.id} to={`/coin?id=${coin.id}`}>
                                    <CoinCard 
                                        id={coin.id} 
                                        name={coin.name} 
                                        image={coin.thumb}
                                        symbol={coin.symbol} />
                                </Link>     
                            ))) :
                            <h3>No coins matched...</h3>
                    }
                </div>
            </main>
        </>
    );
}

export default AllCoins;