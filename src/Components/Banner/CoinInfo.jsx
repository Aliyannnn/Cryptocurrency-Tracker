import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../../Config/Api";
import { Line } from 'react-chartjs-2';
import SelectButton from "./SelectButton";
import { chartDays } from "../../Config/data";
import { CryptoState } from "../../CryptoContext";
import "./CoinInfo.css";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  useEffect(() => {
    const fetchHistoricData = async () => {
      try {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setHistoricData(data.prices);
      } catch (error) {
        console.error("Failed to fetch historical data", error);
      }
    };

    fetchHistoricData();
  }, [coin.id, days, currency]);

  if (!historicData) {
    return <div className="loader-large" />;
  }

  return (
    <div className="coin-info-container">
      <Line
        data={{
          labels: historicData.map((coin) => {
            const date = new Date(coin[0]);
            const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = date.getHours() >= 12 ? "PM" : "AM";
            const time = `${hours}:${minutes} ${ampm}`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: historicData.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
              fill: false,
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <div className="days-selector">
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => setDays(day.value)}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </div>
    </div>
  );
};

export default CoinInfo;
