import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import Box from "@mui/material/Box";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Latest 1000 burns over time',
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return nFormatter(value, 2); // Use the formatNumber function to format the y-axis labels
        },
      },
    },
  },
};

export default function BurnsChart(props) {
    return (
        <Box sx={{mr: 'auto', ml: 'auto'}}>
          <Line options={options} data={props.data}/>
        </Box>
    )
}

// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
function nFormatter(num, digits) {
  const lookup = [
    {value: 1, symbol: ''},
    {value: 1e6, symbol: ' M'},
    {value: 1e9, symbol: ' G'},
    {value: 1e12, symbol: ' T'},
    {value: 1e15, symbol: ' P'},
    {value: 1e18, symbol: ' E'},
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value)
      .toFixed(digits)
      .replace(rx, '$1') + item.symbol : '0';
}
