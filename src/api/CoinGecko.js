export async function getHeroTableData() {
  const data = await fetch(`https://api.coingecko.com/api/v3/coins/vita-inu?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
      .then((res) => res.json());
  return {
    price: data.market_data.current_price.usd,
    marketCap: data.market_data.market_cap.usd,
    fullyDilutedMarketCap: data.market_data.fully_diluted_valuation.usd,
    circulatingSupply: data.market_data.circulating_supply,
    totalSupply: data.market_data.total_supply,
  };
}

export async function getTokenPrice() {
  const data = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=vita-inu&vs_currencies=usd`)
      .then((res) => res.json());
  return data['vita-inu'].usd;
}
