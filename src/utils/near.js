import { keyStores, Near, WalletConnection, } from 'near-api-js';
import { connect } from 'rocket-near-api-js';
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

let near;
let wallet;

/**
 * 
 * @returns {Promise<Near>}
 */
export async function getNear () {
  if (near) return near;

  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  const connectionConfig = {
    networkId: "testnet",
    keyStore: keyStore, // first create a key store 
    nodeUrl: "http://43.132.251.223:3033",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

  near = await connect(connectionConfig);
  return near;
}

/**
 * 
 * @returns {Promise<WalletConnection>}
 */
export async function getWallet () {
  if (wallet) return wallet;
  const near = await getNear();
  wallet = new WalletConnection(near, 'near_app');
  return wallet;
}
