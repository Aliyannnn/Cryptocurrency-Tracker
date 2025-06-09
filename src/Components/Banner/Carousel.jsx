import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // FIXED: use react-router-dom
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";
import { TrendingCoins } from "../../Config/Api";
import axios from "axios";
import { numberWithCommas } from "../utils/format";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
    
      <Link className="carousel-item" to={`/coins/${coin.id}`} key={coin.id}>
        <img className="carousel-img" src={coin?.image} alt={coin.name} />
        <span className="coin-symbol">
          {coin?.symbol.toUpperCase()}&nbsp;
          <span className={`price-change ${profit ? "green" : "red"}`}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className="coin-price">
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
        
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
    1024: { items: 6 },
  };

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1000} // smoother speed
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
