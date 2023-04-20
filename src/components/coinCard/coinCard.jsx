import Image from 'react-bootstrap/Image';

const CoinCard = ({name, image, symbol}) => {
    return(
        <div className="coin-card">
            <div>
                <Image 
                    src={image} 
                    alt="coin" 
                    roundedCircle={true}
                    height={35} 
                    width={35}
                    className='coin-thumb mx-auto d-block mt-2'> 
                </Image>
                <p>{name}</p>
                <p><b>{symbol}</b></p>
            </div>
        </div>
    );
}

export default CoinCard;