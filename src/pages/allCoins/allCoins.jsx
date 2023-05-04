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

    const prevSearch = useRef(searchText);

    //this is used just to show or not trending coins h3
    const [showingTrendingCoins, setShowingTrendingCoins] = useState(true);

    const searchCoin = useCallback(async () => {
        //if (searchText === prevSearch.current) return;
        
        prevSearch.current = searchText
        const { error } = ValidateSearchText({searchText});

        setSearchError(error);
        if (error) return;

        const coinList = await SearchCoins({searchText, requestToken});

        return coinList;
        
    },[searchText])
    
    const GetCoins = useCallback(async () => {
        const coinList = searchText ? await searchCoin() : await GetDefaultCoinList({requestToken});
        setShowingTrendingCoins(searchText === '');

        const coinsMapped = coinList.coins.map(coin => CoinContentType(coin));

        setCoins(coinsMapped);
    }, [searchText, searchCoin]);

    

    //to prevent multiple request to the api, we just search on Enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            GetCoins({requestToken});
        }
      }

    useEffect(() => {
        requestToken = GetRequestToken();
        GetCoins({requestToken});
        return() => {
            CancelRequestToken({requestToken});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleSort = () => {
        setSort(!sort);
    }

    useMemo(() => {
        if (sort) {
            setCoins(coins.sort((a, b) => a.name.localeCompare(b.name)))
        }
    }, [sort, coins])

    const handleSearchText = (text) => {
        dispatch({
            type: 'UPDATE_SEARCH_TEXT',
            value: text
        })
    }

    return(
        <>
            <div className="search">
                <input
                    placeholder="Search for coin..."
                    value={searchText}
                    onChange={(event) => {handleSearchText(event.target.value)}}
                    onKeyDown={handleKeyDown}
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