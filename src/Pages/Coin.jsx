import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../Components/Banner/CoinInfo";
import parse from "html-react-parser"; // ✅ fixed import
import { SingleCoin } from "../Config/Api";
import { numberWithCommas } from "../Components/utils/format";
import { CryptoState } from "../CryptoContext";
import "./Coin.css";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    };

    fetchCoin();
  }, [id]);

  if (!coin) return <div className="loader" />;

  return (
    <div className="coin-container">
      <div className="coin-sidebar">
        <img src={coin?.image.large} alt={coin?.name} className="coin-image" />
        <h3 className="coin-heading">{coin?.name}</h3>
        <p className="coin-description">
          {parse(coin?.description.en.split(". ")[0])}.
        </p>
        <div className="coin-market-data">
          <div className="coin-data-row">
            <h5 className="coin-label">Rank:</h5>
            <span>{numberWithCommas(coin?.market_cap_rank)}</span>
          </div>

          <div className="coin-data-row">
            <h5 className="coin-label">Current Price:</h5>
            <span>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </span>
          </div>

          <div className="coin-data-row">
            <h5 className="coin-label">Market Cap:</h5>
            <span>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </span>
          </div>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
