import { Buffer } from 'buffer';
import { connect as nconnect, keyStores, Near, WalletConnection } from 'near-api-js';
import { connect } from 'rocket-near-api-js';
globalThis.Buffer = Buffer;

let near;
let wallet;
let pending = false;

export function loginPending () {
  if (pending) return true;
  const ls = localStorage;
  for (const key of Object.keys(ls)) {
    if (key.includes('keystore:pending_key')) {
      pending = true;
      return true;
    }
  }
  return false;
}

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

  if (loginPending()) {
      console.log('found pending key, will reload soon');
      setTimeout(() => location.reload(), 1000);
  }

  await nconnect(connectionConfig);
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
