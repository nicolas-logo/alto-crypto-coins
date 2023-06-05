import CoinCard from '../../components/coinCard/coinCard'
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { GetDefaultCoinList, SearchCoins, GetRequestToken, CancelRequestToken } from '../../apiClients/coinClientAPI';
import { Link } from 'react-router-dom';
import CoinContentType from '../../contentTypes/coins';
import ValidateSearchText  from '../../utils/searchUtils';
import { useAppContext } from '../../providers/AppProvider';
import _ from 'lodash';

import './allCoins.css';

let requestToken;

const AllCoins = () => {
    const {searchText, dispatch} = useAppContext();
    const [coins, setCoins] = useState([]);
    const [searchError, setSearchError] = useState('');
    const [sort, setSort] = useState(false);


    // This is used just to show or not trending coins h3
    const [showingTrendingCoins, setShowingTrendingCoins] = useState(true);
    

    // Search for coin list by search text
    const searchCoin = useCallback(async () => {
        const { error } = ValidateSearchText({searchText});

        setSearchError(error);
        if (error) return;

        const coinList = await SearchCoins({searchText, requestToken});

        return coinList;
        
    },[searchText])
    
    
    // Gets default coin list or searched, depending on search text
    // using useCallback hook to prevents rewriting on rendering
    const GetCoins = useCallback(async () => {
        const coinList = searchText ? await searchCoin() : await GetDefaultCoinList({requestToken});
        setShowingTrendingCoins(searchText === '');

        const coinsMapped = coinList.coins.map(coin => CoinContentType(coin));

        setCoins(coinsMapped);
    }, [searchText, searchCoin]);


    // Creates a debounce function for GetCoins
    const GetCoinsDebounced =  _.debounce(GetCoins, 500);


    // Updates the sort state
    const handleSort = () => {
        setSort(!sort);
    }

    
    // It sorts the current coin list
    // using useMemo hook to prevents rewriting this function when rendering
    useMemo(() => {
        if (sort) {
            setCoins(coins.sort((a, b) => a.name.localeCompare(b.name)))
        }
    }, [sort, coins])


    // It updates the provider with the current search
    // to later be used when the user come back to this page
    const handleSearchText = (text) => {
        dispatch({
            type: 'UPDATE_SEARCH_TEXT',
            value: text
        })
    }


    // Is triggered when the search texts is modified
    // uses debounce to wait until the user stop typing 
    useEffect(() => {
        console.log('searchText modified')
        GetCoinsDebounced();
        return () => GetCoinsDebounced.cancel();
        //not included GetCoinsDebounced to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);


    // Runs just once the first time the component is rendered
    // gets a token and gets the default coins
    useEffect(() => {
        requestToken = GetRequestToken();
        GetCoinsDebounced();
        return() => {
            CancelRequestToken({requestToken});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <div className="search">
                <input
                    placeholder="Search for coin..."
                    value={searchText}
                    onChange={(event) => {handleSearchText(event.target.value)}}
                    
                />
                <div className='sort_input'>
                    <label>Sort</label>
                    <input type='checkbox' onChange={handleSort} />
                </div>
            </div>
            <main>
                <p className='labelError'>{searchError}</p>
                { showingTrendingCoins ? (
                    <div className='row'>
                        <h3>Trending Coins:</h3>
                    </div>
                ): null } 
                <div className="container">
                    {
                        coins?.length > 0 ? 
                            (coins.map(coin => ( 
                                <Link key={ _.get(coin,'id') } to={`/coin?id=${ _.get(coin,'id') }`}>
                                    <CoinCard {...coin} />
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