import { mintTo } from '@solana/spl-token'
import { getExplorerLink } from '@solana-developers/helpers'
import {
    Connection, PublicKey, clusterApiUrl,
} from '@solana/web3.js'
import { MintAccountsData, getMintAccounts } from './common';
import { get_logger } from '../../shared/src';


const DECIMALS_PER_TOKEN = Math.pow(10, 2);
const log = get_logger();
const connection = new Connection(clusterApiUrl('devnet'), { commitment: "confirmed" });

const [cli, getData] = getMintAccounts();
cli.requiredOption('-c, --mint-amount <amount>', 'Amount of Tokens to mint');
const data = getData();
const tokenMintAmount = parseFloat(cli.opts().mintAmount);

if (isNaN(tokenMintAmount)) {
    throw Error("Provide a valid amount of tokens to mint");
}

const mintDecimalsAmount = tokenMintAmount * DECIMALS_PER_TOKEN;
log("Minting:");
log(`\tRecepient: ${data.associatedAccount}`);
log(`\tAmount Tokens: ${tokenMintAmount}`);
log(`\tAmount Decimals: ${mintDecimalsAmount}`);


const txSig = await mintTo(
    connection,
    data.signer,
    data.mintAccount,
    data.associatedAccount,
    data.signer,
    mintDecimalsAmount,
);
const explorerLink = getExplorerLink("transaction", txSig, "devnet");


log(`\tTransaction Signature: ${txSig}`);
log(`\tExplore: ${explorerLink}`);