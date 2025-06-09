import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../Config/Api';
import { useNavigate } from 'react-router';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from '../Components/utils/format';
import './CoinsTable.css';

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate(); // ✅ useNavigate instead of useHistory

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const totalPages = Math.ceil(handleSearch().length / 10);

  return (
    <main>

    <div className="coins-table-wrapper">
      <h2 className="coins-table-title">Cryptocurrency Prices by Market Cap</h2>

      <input
        type="text"
        placeholder="Search for a Crypto Currency..."
        className="search-input"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

      <div className="table-container">
        {loading ? (
            <div className="loader"></div>
        ) : (
            <table className="coins-table">
            <thead>
              <tr>
                <th>Coin</th>
                <th className="text-right">Price</th>
                <th className="text-right">24h Change</th>
                <th className="text-right">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {handleSearch()
                .slice((page - 1) * 10, page * 10)
                .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                        <tr
                        key={row.id}
                        className="table-row"
                        onClick={() => navigate(`/coins/${row.id}`)} // ✅ fixed navigation
                        >
                      <td className="coin-cell">
                        <img src={row.image} alt={row.name} />
                        <div>
                          <span className="coin-symbol">{row.symbol}</span>
                          <span className="coin-name">{row.name}</span>
                        </div>
                      </td>
                      <td className="text-right">
                        {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                      </td>
                      <td className={`text-right ${profit ? 'positive' : 'negative'}`}>
                        {profit && '+'}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className="text-right">
                        {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
            <button
            key={i + 1}
            className={`page-button ${page === i + 1 ? 'active' : ''}`}
            onClick={() => {
                setPage(i + 1);
                window.scrollTo({ top: 450, behavior: 'smooth' });
            }}
            >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
        </main>
  );
}
