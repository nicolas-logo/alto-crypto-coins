import axios from 'axios';
const ROOT_API_URL = 'https://api.coingecko.com/api/v3';
let cancelToken;

const cleanRequests = async () => {
    if (cancelToken) {
        await cancelToken.cancel()
    }
    
    cancelToken = await axios.CancelToken.source();
}

const GetDefaultCoinList = async () => {
    await cleanRequests();
    const response = await axios.get(`${ROOT_API_URL}/search/trending`, cancelToken.token);
    return response.data;
}

const GetCoin = async ({id}) => {
    await cleanRequests();
    const response = await axios.get(`${ROOT_API_URL}/coins/${id}`, cancelToken.token);
    return response.data;
}

const SearchCoins = async ({searchText}) => {
    await cleanRequests();
    const response = await axios.get(`${ROOT_API_URL}/search?query=${searchText}`, cancelToken.token);
    return response.data;
}


export { GetDefaultCoinList, GetCoin, SearchCoins };