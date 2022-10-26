import { io, Socket } from 'socket.io-client';
import { getWallet } from './utils/near';

export const socket = initSocket();

/**
 * 
 * @returns { Promise<Socket | undefined> }
 */
export async function initSocket () {
  const wallet = await getWallet();
  if (!wallet.isSignedIn()) return;

  const socket = io('ws://43.132.251.223:3033');
  socket.emit('ping', { accountId: wallet.getAccountId() });
  return socket;
}
