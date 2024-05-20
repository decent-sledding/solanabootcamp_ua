import {
    createMint,
} from '@solana/spl-token'
import {
    Connection,
    clusterApiUrl,
    Keypair,
} from '@solana/web3.js'
import {
    getExplorerLink,
} from '@solana-developers/helpers'

import {
    UserKeys,
    get_keys_from_env_or_cli,
    get_logger,
} from 'sharedlibs';



const log = get_logger();
const cli = get_keys_from_env_or_cli();
cli.parse();

const keys: UserKeys = cli.parseKeys();
const signer: undefined | Keypair = keys.pair;

if (!signer) {
    log("Could not obtain Keypair");
    process.exit(1)
}

const authorityPubkey = signer.publicKey;
const connection = new Connection(clusterApiUrl('devnet'), { commitment: "confirmed"});


log(`Using authority: ${authorityPubkey}`);


const newMint = await createMint(
    connection,
    signer,
    authorityPubkey,
    null,
    2,
);
const tokenLink = await getExplorerLink("address", newMint.toString(), "devnet");

log(`Created New Token Mint: ${tokenLink}`);
log(`Mint Address: ${newMint.toBase58()}`);