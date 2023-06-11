import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {getHeroTableData} from '../api/CoinGecko';
import '../css/RainbowText.css';
const styles = {
  tableContainer: {
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  table: {
    width: '100%',
  },
};
function createData(title, value) {
  return {title, value};
}
const numberFormatter = new Intl.NumberFormat('en-US');
export default function HeroTable() {
  const [data, setData] = React.useState({});
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    async function e() {
      const d = await getHeroTableData();
      setData(d);
      setRows([
        createData('Total Supply', numberFormatter.format(d.totalSupply)),
        createData('Circulating Supply', numberFormatter.format(d.circulatingSupply)),
        createData('Burned', numberFormatter.format(d.burned)),
        createData('Market Cap', `$ ${numberFormatter.format(d.marketCap)}`),
        createData('Fully Diluted Market Cap', `$ ${numberFormatter.format(d.fullyDilutedMarketCap)}`),
        createData('Price', `$ ${d.price.toFixed(11)}`),
      ]);
    }
    e();
  }, []);
  return (
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table sx={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right" className="tableText">
                    <b>{row.value}</b>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
