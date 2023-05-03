import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { GetCoin, GetRequestToken, CancelRequestToken } from '../../apiClients/coinClientAPI';
import { useEffect, useState, useCallback } from "react";
import Image from 'react-bootstrap/Image';
import _ from 'lodash';
import './coin.css';

const Coin = () => {

    const [searchParams] = useSearchParams();

    const [coin, setCoin] = useState([]);
    const [requestToken, setRequestToken] = useState({});

    const getCoin = useCallback( async () => {
        const id = searchParams.get('id');
        const c = await GetCoin({id, requestToken});
        setCoin(c);
    },[searchParams, requestToken])

    useEffect(() => {
        setRequestToken(GetRequestToken());
        getCoin();

        return() => {
            CancelRequestToken({requestToken})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div className='container-md'>
            <div className='row mt-5'>
                <div className='col-md-3'>
                    <Image 
                        className='coin-image mx-auto d-block' 
                        src={_.get(coin, 'image.large')} 
                        alt="Coin"
                        height={150}
                        width={150}
                        roundedCircle={true} />
                    <h3>{_.get(coin, 'symbol')}</h3>
                    <h5>{_.get(coin, 'name')}</h5>
                    <div className='row'>
                        <h6><b>Current Price:</b> {_.get(coin, 'market_data.current_price.usd')}</h6>
                    </div>
                    <div className='row'>
                        <h6><b>Supply:</b> {_.get(coin, 'market_data.total_supply')}</h6>
                    </div>
                    
                </div>
                <div className='col-md-9'>
                    {_.get(coin, 'description.en')}
                </div>
            </div>
        </div>
    );
}

export default Coin;