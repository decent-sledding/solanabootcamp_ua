import "dotenv/config";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js";
import { get_keys_from_env_or_cli, get_logger } from 'sharedlibs';


const keypair = get_keys_from_env_or_cli();
const log = get_logger();

const connection = new Connection(clusterApiUrl('devnet'));
const publicKey = keypair.publicKey;

const lamports = await connection.getBalance(publicKey);
const solports = lamports / LAMPORTS_PER_SOL;


log('Connected to the DevNet');
log(`Account's public key:\n\t${publicKey}`);
log("Balance:")
log(`\tLamports: ${lamports}`);
log(`\tSOL: ${solports}`);
