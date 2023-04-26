import React from 'react';
import searchIcon from './../../Assets/search.svg';
import CoinCard from '../../components/coinCard/coinCard'
import { useEffect, useState } from "react";
import { GetCoinList, SearchCoins } from '../../apiClients/coinClientAPI';
import { Link } from 'react-router-dom';


const AllCoins = () => {
    const [coins, setCoins] = useState([]);
    const [searchText, setSearchText] = useState([]);
    //this is used just to show or not trending coins h3
    const [showingTrendingCoins, setShowingTrendingCoins] = useState(true);

    const getDefaultCoinList = async () => {
        const coinList = await GetCoinList();
        setCoins(coinList.coins);
    }

    const searchCoin = async () => {
        const coinList = await SearchCoins({searchText});
        setCoins(coinList.coins);
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
                        coins.map(coin => (
                            // this is made like this because trending coins response has different structure
                            // could be also restructured on the response of the API and using just 1 Link Card instead of 2
                            coin.item ? (
                            <Link key={coin.item.id} to={`/coin?id=${coin.item.id}`}>
                                <CoinCard 
                                    id={coin.item.id} 
                                    name={coin.item.name} 
                                    image={coin.item.small}
                                    symbol={coin.item.symbol} />
                            </Link>
                            ) :
                            (
                            <Link key={coin.id} to={`/coin?id=${coin.id}`}>
                                <CoinCard 
                                    id={coin.id} 
                                    name={coin.name} 
                                    image={coin.thumb}
                                    symbol={coin.symbol} />
                            </Link>
                            )
                                
                        ))
                    }
                </div>
            </main>
        </>
    );
}

export default AllCoins;