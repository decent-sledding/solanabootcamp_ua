import 'dotenv/config'
import { getKeypairFromEnvironment } from '@solana-developers/helpers'
import {get_veiled_secret_key, get_logger } from 'sharedlibs'



const keys = getKeypairFromEnvironment('SECRET_KEY');
const log = get_logger();

log(`Public key: ${keys.publicKey} `);
log(`Private key: ${get_veiled_secret_key(keys.secretKey)} `);