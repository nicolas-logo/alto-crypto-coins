import axios from 'axios';
const ROOT_API_URL = 'http://localhost:9001/api';

const GetRequestToken = () => {
    const requestToken = axios.CancelToken.source();
    return requestToken;
}

const CancelRequestToken = ({requestToken}) => {
    try {
        requestToken.cancel();        
    } catch (error) {
        //err
    }
}

const GetAllCoinsFromDb = async ({requestToken}) => {
    const response = await axios.get(`${ROOT_API_URL}/coins`);
    return response.data;
}

const GetCoinFromDb = async ({symbol}) => {
    try {
        const response = await axios.get(`${ROOT_API_URL}/coins/${symbol}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
    
}

const SaveCoinToDb = async ({comment, symbol}) => {
    const response = await axios.post(`${ROOT_API_URL}/coins`, {
        comment,
        symbol
    });
    return response;
}

const UpdateCoinOnDb = async ({id, comment, symbol, requestToken}) => {
    const response = await axios.put(`${ROOT_API_URL}/coins/${id}`, {
        cancelToken: requestToken.token,
        id,
        comment,
        symbol
    });
    return response;
}


export { GetAllCoinsFromDb, GetCoinFromDb, SaveCoinToDb, UpdateCoinOnDb, GetRequestToken, CancelRequestToken };