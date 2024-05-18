import "dotenv/config";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js";
import { get_keys_from_env_or_cli, get_balance, Balance, get_logger } from 'sharedlibs';


const keypair = get_keys_from_env_or_cli().parse().parseKeys();
const log = get_logger();
const connection = new Connection(clusterApiUrl('devnet'));
const publicKey = keypair.publicKey;


if (!publicKey) {
    throw Error("Could not read the public key");
}

const balance: Balance = await getBalance(connection, publicKey);


log(`Using public key: ${publicKey}`);
log('Connected to the DevNet');
log(`Account's public key:\n\t${publicKey}`);
log("Balance:")
log(`\tLamports: ${balance.getLamps()}`);
log(`\tSOL: ${balance.getSOL()}`);


