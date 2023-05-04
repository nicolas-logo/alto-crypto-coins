import Image from 'react-bootstrap/Image';

const CoinCard = ({name, thumb, symbol}) => {
    return(
        <div className="coin-card" data-testid="coin-card">
            <div>
                <Image 
                    src={thumb} 
                    alt="coin" 
                    roundedCircle={true}
                    height={35} 
                    width={35}
                    className='coin-thumb mx-auto d-block mt-2'> 
                </Image>
                <p name="name">{name}</p>
                <p name="symbol"><b>{symbol}</b></p>
            </div>
        </div>
    );
}

export default CoinCard;