const ROOT_API_URL = 'https://api.coingecko.com/api/v3';


const GetDefaultCoinList = async () => {
    const response = await fetch(`${ROOT_API_URL}/search/trending`);
    const data = await response.json();
    return data;
}

const GetCoin = async ({id}) => {
    const response = await fetch(`${ROOT_API_URL}/coins/${id}`);
    const data = await response.json();
    return data;
}

const SearchCoins = async ({searchText}) => {
    const response = await fetch(`${ROOT_API_URL}/search?query=${searchText}`);
    const data = await response.json();
    return data;
}


export { GetDefaultCoinList, GetCoin, SearchCoins };