import axios from 'axios';
const ROOT_API_URL = 'https://api.coingecko.com/api/v3';
let cancelToken;

const cleanRequests = () => {
    if (cancelToken) {
        try {
            cancelToken.cancel();
            cancelToken = axios.CancelToken.source();
        } catch (error) {
            cancelToken = axios.CancelToken.source();
            //console.log(error)
        }
    }
    else {
        cancelToken = axios.CancelToken.source();
    }
}

const GetDefaultCoinList = async () => {
    cleanRequests();
    const response = await axios.get(`${ROOT_API_URL}/search/trending`, {
        cancelToken: cancelToken.token
    });
    return response.data;
}

const GetCoin = async ({id}) => {
    cleanRequests();
    const response = await axios.get(`${ROOT_API_URL}/coins/${id}`, {
        cancelToken: cancelToken.token
    });
    return response.data;
}

const SearchCoins = async ({searchText}) => {
    cleanRequests();
    cancelToken = axios.CancelToken.source();
    const response = await axios.get(`${ROOT_API_URL}/search?query=${searchText}`, {
        cancelToken: cancelToken.token
    });
    return response.data;
}


export { GetDefaultCoinList, GetCoin, SearchCoins };