import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {getLatestBurns} from '../api/Vite';
import {getTokenPrice} from '../api/CoinGecko';
import BigNumber from 'bignumber.js';
import BurnsChart from "./BurnsChart.jsx";
const numberFormatter = new Intl.NumberFormat('en-US', {});
const columns = [
  {
    field: 'amount',
    headerName: 'Amount',
    headerAlign: 'left',
    width: 200,
    type: 'number',
    sortable: true,
    align: 'left', // Align the column content to the left
    valueFormatter: (params) => {
      const amountValue = parseFloat(params.value.split(' ')[0]);
      const formattedAmount = numberFormatter.format(amountValue); // Format the amount with numberFormatter
      return `${formattedAmount} VINU`;
    },
  },
  {
    field: 'value',
    headerName: 'Value',
    headerAlign: 'left',
    width: 100,
    type: 'number',
    sortable: true,
    align: 'left', // Align the column content to the left
    valueFormatter: (params) => {
      const valueText = params.value.replace('$', ''); // Remove the '$' symbol
      const value = parseFloat(valueText); // Parse the numeric value
      return `$ ${value.toFixed(2)}`; // Format the value and append "$" symbol
    },
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 300,
  },
  {
    field: 'txHash',
    headerName: 'Transaction Hash',
    width: 150,
    sortable: false, // Disable sorting for the txHash column
    renderCell: (params) => (
      <a href={`https://vitcscan.com/tx/${params.id}`} style={{textDecoration: 'none', color: '#006aff'}}>
        {`${params.value.substring(0, 15)}...`}
      </a>
    ),
  },
];
export default function BurnsDataGrid() {
  const [rows, setRows] = React.useState([]);
  const [graphData, setGraphData] = React.useState({});
  React.useEffect(() => {
    async function e() {
      const burns = await getLatestBurns(1000);
      const price = await getTokenPrice();
      console.log('done');
      const tempRows = [];
      for (const tx of burns) {
        console.log(tx);
        tempRows.push({
          id: tx.hash,
          amount: `${new BigNumber(tx.amount).shiftedBy(-18).toFixed(0)}`,
          value: `${new BigNumber(tx.amount).shiftedBy(-18).multipliedBy(price).toFixed(2)}`,
          date: new Date(new BigNumber(tx.timestamp).multipliedBy(1000).toNumber()).toLocaleString(),
          txHash: `${tx.hash.substring(0, 15)}...`,
        });
      }
      setRows(tempRows);
      // Do the graph magic
      // First, create a list called labels
      let labels = [];
      // Then, make a json with date as the key, unix timestamp right here and amount as the value
      let burnsGraph = {};
      for (const tx of burns) {
        // Get the unix timestamp from the date
        const date = new Date(new BigNumber(tx.timestamp).multipliedBy(1000).toNumber());
        // Round the date to the nearest day and save as unix timestamp
        date.setHours(0, 0, 0, 0);
        const unixTimestamp = new BigNumber(date.getTime()).shiftedBy(-3).toFixed(0);
        // Check if the date already is existent in the burns object
        if (burnsGraph[unixTimestamp] === undefined) {
            // If it is not existent, create a new array with the amount
          burnsGraph[unixTimestamp] = new BigNumber(tx.amount).shiftedBy(-18).toFixed(0);
        } else {
          // If it is existent, use bignumbers to add the amount to the existing amount
          burnsGraph[unixTimestamp] = new BigNumber(burnsGraph[unixTimestamp]).plus(new BigNumber(tx.amount).shiftedBy(-18).toFixed(0)).toFixed(0)
        }
        // Check if existent in the labels
        if (!labels.includes(unixTimestamp)) {
            // If not existent, add it
            labels.push(unixTimestamp)
        }

      }
      // All good, sort the labels from low to high then change them all to just yyyy-mm-dd, put these in a new array
      const sortedLabels = labels.sort((a, b) => a - b).map((label) => new Date(new BigNumber(label).multipliedBy(1000).toNumber()).toISOString().split('T')[0]);
      const data = {
        labels: sortedLabels,
        datasets: [
          {
            label: 'Burns',
            data: labels.map((label) => burnsGraph[label]),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          }
        ],
      }
      console.log(data);
      setGraphData(data);
    }
    e();
  }, []);
  return (
    <Box sx={{height: 400, maxWidth: 900, ml: 'auto', mr: 'auto'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
      {graphData.labels !== undefined ? <BurnsChart data={graphData}/> : <></>}
    </Box>
  );
}
