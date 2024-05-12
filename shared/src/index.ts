import { config } from 'dotenv';
import { PublicKey, Keypair, Ed25519SecretKey, Ed25519Program } from '@solana/web3.js';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { Command } from 'commander';


const bs58 = require('bs58');


interface UserKeys {
    publicKey: undefined | PublicKey,
    secretKey: undefined | Ed25519SecretKey,
}

function get_keys_from_env_or_cli(): UserKeys {
    config();

    const initKeys = () => ({
        publicKey: undefined,
        secretKey: undefined,
    });
    const program = new Command()
        .name('soldrop')
        .description('Request Solana Airdrop for account')
        .version('0.0.1')

        .option('-k, --public-key <key>', 'Custom Public Key to request Airdrop for')
        .option('-s, --secret-key <key>', 'Secret key. Will take priority (pubkey will be derived from secret)')
        .parse(process.argv);
    const ops = program.opts();

    let ukeys: UserKeys = initKeys();

    try {
        const keypairFromEnv = getKeypairFromEnvironment('SECRET_KEY');

        ukeys.publicKey = keypairFromEnv.publicKey;
        ukeys.secretKey = keypairFromEnv.secretKey;
    } catch (e) {}

    if (!ops.publicKey && !ops.secretKey)
        return ukeys;

    // Reset keys: keys must be paired and not parsed from different places
    ukeys = initKeys();

    if (ops.publicKey !== undefined) {
        try {
            ukeys.publicKey = new PublicKey(ops.publicKey);
        } catch(e) {}
    }

    if (ops.secretKey !== undefined) {
        const kp = Keypair.fromSecretKey(bs58.decode(ops.secretKey));

        ukeys.publicKey = kp.publicKey;
        ukeys.secretKey = kp.secretKey;
    }

    return ukeys;
}


/// Veil a bit the secret key to avoid all the content being exposed completely
function get_veiled_secret_key(secret: Uint8Array) {
    const secretStr: string = bs58.encode(secret);

    let veiledSecret = new String();
    const showBeforeFirstPos = secret.length * .1;
    const showBeforeLastPos = secret.length - showBeforeFirstPos;

    for (let i = 0; i < secret.length; ++i) {
        veiledSecret += ( i > showBeforeFirstPos && i < showBeforeLastPos) ? '*' : secretStr[i];
    }

    return veiledSecret;
}


function get_logger(do_log: boolean = true) {
    function log(str: string) {
        console.log(str)
    }
    function sink() {}

    return do_log ? log : sink;
}

export {
    get_logger,
    get_veiled_secret_key,
    get_keys_from_env_or_cli,
};