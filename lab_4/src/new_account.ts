import { getExplorerLink } from '@solana-developers/helpers';
import { Mint, getMint, getOrCreateAssociatedTokenAccount } from '@solana/spl-token'
import {
    Connection,
    clusterApiUrl,
} from '@solana/web3.js'
import { get_logger } from 'sharedlibs';
import { MintAccountsData, getMintAccounts } from './common';



const log = get_logger();
const data: MintAccountsData = getMintAccounts()[1]();
const connection = new Connection(clusterApiUrl('devnet'), { commitment: "confirmed" });


log(`Using Mint Account: ${data.mintAccount}`);
log(`Crating Associated Account for: ${data.associatedAccount}`);
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    data.signer,
    data.mintAccount,
    data.associatedAccount,
);
const tokAddress = tokenAccount.address.toBase58();
const explorerLink = await getExplorerLink("address", tokAddress, 'devnet');

log(`Created Account: ${tokAddress}`);
log(`Solana Explorer: ${explorerLink}`);


