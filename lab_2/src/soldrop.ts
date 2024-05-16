import 'dotenv/config';
import {
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
} from '@solana/web3.js';

import { airdropIfRequired } from "@solana-developers/helpers";
import { get_keys_from_env_or_cli, get_logger } from 'sharedlibs';


const keypair = get_keys_from_env_or_cli().parse().parseKeys();
const log = get_logger();
const connection = new Connection(clusterApiUrl('devnet'), "confirmed");
const publicKey = keypair.publicKey;

const requiredAmountSOL = 0.5;
const requiredAmountLamports = requiredAmountSOL * LAMPORTS_PER_SOL;

const desiredAmountSOL = 1;
const desiredAmountLamports = desiredAmountSOL * LAMPORTS_PER_SOL;


await airdropIfRequired(
    connection,
    publicKey,
    requiredAmountLamports,
    desiredAmountLamports,
)


const newAmountLamports = await connection.getBalance(publicKey);
const newAmountSOL = newAmountLamports / LAMPORTS_PER_SOL;


log(`Account key: ${publicKey}`);
log("New Balance:");
log(`\tLamports: ${newAmountLamports}`);
log(`\tSOL: ${newAmountSOL}`);
