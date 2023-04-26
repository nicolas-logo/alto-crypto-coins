const CoinContentType = (data) => {
    return {
        id: data.item ? data.item.id : data.id,
        name: data.item ? data.item.name : data.name,
        thumb: data.item ? data.item.small : data.thumb,
        symbol: data.item ? data.item.symbol : data.symbol
    }
}

export default CoinContentType;