import axios from 'axios';
const ROOT_API_URL = 'https://api.coingecko.com/api/v3';

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

const GetDefaultCoinList = async ({requestToken}) => {
    const response = await axios.get(`${ROOT_API_URL}/search/trending`, {
        cancelToken: requestToken.token
    });
    return response.data;
}

const GetCoin = async ({id, requestToken}) => {
    const response = await axios.get(`${ROOT_API_URL}/coins/${id}`, {
        cancelToken: requestToken.token
    });
    return response.data;
}

const SearchCoins = async ({searchText, requestToken}) => {
    const response = await axios.get(`${ROOT_API_URL}/search?query=${searchText}`, {
        cancelToken: requestToken.token
    });
    return response.data;
}


export { GetDefaultCoinList, GetCoin, SearchCoins, GetRequestToken, CancelRequestToken };