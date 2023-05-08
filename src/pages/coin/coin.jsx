import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { GetCoin, GetRequestToken, CancelRequestToken } from '../../apiClients/coinClientAPI';
import { GetCoinFromDb, SaveCoinToDb } from '../../apiClients/dbAPI';

import { useEffect, useState, useCallback } from "react";
import Image from 'react-bootstrap/Image';
import _ from 'lodash';
import './coin.css';

// custom hooks
import MessageLabel from '../../components/messageLabel/messageLabel';

const Coin = () => {

    const [searchParams] = useSearchParams();

    const [coin, setCoin] = useState({});
    const [comment, setComment] = useState('');
    const [requestToken, setRequestToken] = useState({});
    const [infoApi, setInfoApi] = useState({type: '', message: '', timeout: null});

    const getCoin = useCallback( async () => {
        const id = searchParams.get('id');
        const c = await GetCoin({id, requestToken});
        await setCoin(c);
    },[searchParams]);

    useEffect(() => {
        const getCoinFromDb = async () => {
            const c = coin.symbol ?
                await GetCoinFromDb({symbol: coin.symbol}) :
                null;
            if (c)
                setComment(c.comment);
        };
        getCoinFromDb();
    },[coin])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setInfoApi({type: 'warning', message: 'guardando...', timeout: 3000});
        SaveCoinToDb({symbol: coin.symbol, comment})
        .then(() => setInfoApi({type: 'success', message: 'guardado', timeout: 3000}))
        .catch(err => setInfoApi({type: 'danger', message: err.message, timeout: 3000}));
        
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    useEffect(() => {
        setRequestToken(GetRequestToken());
        getCoin();

        return() => {
            CancelRequestToken({requestToken})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[getCoin])

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
                    <div>{_.get(coin, 'description.en')}</div>
                    <form className='mt-4' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="text-area">Comentario:</label>
                            <textarea 
                                id='text-area' 
                                className='form-control' 
                                value={comment}
                                onChange={handleCommentChange}></textarea>
                            <button className='btn btn-primary mt-2' type="submit">Guardar</button>
                            <MessageLabel {...infoApi} ></MessageLabel>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
    );
}

export default Coin;