import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BigNumber from 'bignumber.js';
import {getTokenPrice} from '../api/CoinGecko';
import {getLatestBurns} from '../api/Vite';

function createData(amount, value, date, txid) {
  return {amount, value, date, txid};
}
const numberFormatter = new Intl.NumberFormat('en-US', {});
export default function BurnTable() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    async function e() {
      const b = await getLatestBurns(10);
      const tempRows = [];
      const price = await getTokenPrice();
      for (const tx of b) {
        if (new BigNumber(tx.amount).shiftedBy(-18).toNumber() >= 200000000) {
          tempRows.push(createData(
              <b>
                {numberFormatter.format(
                    new BigNumber(tx.amount).shiftedBy(-18).toFixed())}
                &nbsp;VINU
              </b>,
              <b>$
                {new BigNumber(tx.amount)
                    .shiftedBy(-18)
                    .multipliedBy(price)
                    .toFixed(2)}
              </b>,
              <b>
                {formatDate(new Date(new BigNumber(tx.timestamp)
                    .multipliedBy(1000)
                    .toNumber()))}
              </b>,
              <b>
                <a href={`https://vitcscan.com/tx/${tx.hash}`} style={{textDecoration: 'none', color: '#006aff'}}>{tx.hash.substring(0, 15)}...</a>
              </b>,
          ));
        } else {
          // Get first 5 chars of tx hash
          tempRows.push(createData(
              `${numberFormatter.format(new BigNumber(tx.amount)
                  .shiftedBy(-18).toFixed())} VINU`,
              `$ ${new BigNumber(tx.amount)
                  .shiftedBy(-18)
                  .multipliedBy(price)
                  .toFixed(2)}`,
              formatDate(new Date(new BigNumber(tx.timestamp)
                  .multipliedBy(1000)
                  .toNumber())),
              <a href={`https://vitcscan.com/tx/${tx.hash}`} style={{textDecoration: 'none', color: '#006aff'}}>{tx.hash.substring(0, 15)}...</a>,
          ));
        }
      }
      setRows(tempRows);
    }
    e();
  }, []);
  return (
      <TableContainer component={Paper} sx={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Transaction Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.amount}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.txid}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

  );
}
function formatDate(date) {
  const year = date.getUTCFullYear();
  const month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date);
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds} UTC`;
}
