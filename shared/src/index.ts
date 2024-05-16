import { config } from 'dotenv';
import { PublicKey, Keypair, Ed25519SecretKey, Ed25519Program } from '@solana/web3.js';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { Command } from 'commander';


const bs58 = require('bs58');


interface UserKeys {
    publicKey: undefined | PublicKey,
    secretKey: undefined | Ed25519SecretKey,
}

class CustomCommand extends Command {
    override parse(args=undefined): CustomCommand {
        super.parse(args || process.argv);
        return this;
    }

    parseKeys() {
        let ops = this.opts();
        const initKeys = () => ({
            publicKey: undefined,
            secretKey: undefined,
        });
        const ukeys: UserKeys = initKeys();

        ukeys.publicKey;

        try {
            const keypairFromEnv = getKeypairFromEnvironment('SECRET_KEY');

            ukeys.publicKey = keypairFromEnv.publicKey;
            ukeys.secretKey = keypairFromEnv.secretKey;
        } catch (e) {}

        if (!ops.secretKey)
            return ukeys;

        // Reset keys: keys must be paired and not parsed from different places
        // ukeys = initKeys();

        if (ops.publicKey !== undefined) {
            try {
                ukeys.publicKey = new PublicKey(ops.publicKey);
            } catch(e) {}
        }

        if (ops.secretKey !== undefined) {
            try {
                const kp = Keypair.fromSecretKey(bs58.decode(ops.secretKey));

                ukeys.publicKey = kp.publicKey;
                ukeys.secretKey = kp.secretKey;
            } catch(e) {}
        }

        return ukeys;
    }
}





/** Acquire keys from CLI arguments or from Environment
 * Argument parsing priority (if a secret key is parsed then public key is derived from it)
 * - 1. Secret && Public keys from CLI argument --secret-key
 * - 2. Secret key from ENV `SECRET_KEY` variable
 * - 3. If no secret keys provided, then:
 *   - 3.1. Publc key from CLI argument takes priority over other keys (currently )
 * 
 * @returns {CustomCommand}
 */
function get_keys_from_env_or_cli(): CustomCommand {
    config();
    const program = new CustomCommand()
        .name('soldrop')
        .description('Request Solana Airdrop for account')
        .version('0.0.1')

        .option('-k, --public-key <key>', 'Custom Public Key to request Airdrop for')
        .option('-s, --secret-key <key>', 'Secret key. Will take priority (pubkey will be derived from secret)');
    program.action(program.parseKeys);

    return program; 
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