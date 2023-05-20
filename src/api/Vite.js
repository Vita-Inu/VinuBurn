import {Client} from 'web3-vite/dist/client';
const mainNet = 'wss://node-vite.thomiz.dev/ws';
const d = 'wss://node-vite.thomiz.dev/ws';
export const ViteClient = new Client(d);

export async function getLatestBurns(x) {
  const data = await ViteClient.request(
      'ledger_getAccountBlocks',
      ['vite_000000000000000000000000000000000000000595292d996d',
        null,
        'tti_541b25bd5e5db35166864096',
        x,
      ]);
  return data;
}
