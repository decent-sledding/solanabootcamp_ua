import { Keypair } from '@solana/web3.js'
import { addKeypairToEnvFile } from '@solana-developers/helpers'
import { get_logger, get_veiled_secret_key } from 'sharedlibs';


console.log("\n----------------------------------\n\n")

const keys = generate_keypair();
console.log("----");
add_secret_to_env(keys);

console.log("\n----------------------------------\n\n")



function generate_keypair(do_log: boolean = true) {
    const log = get_logger(do_log);
    const keys = Keypair.generate();

    log("Created new keypair!: ");
    log(`\tPublic key: ${keys.publicKey.toBase58()}`)
    log(`\tPrivate key: ${get_veiled_secret_key(keys.secretKey)}`);

    return keys;
}


async function add_secret_to_env(keys: Keypair, do_log: boolean = true) {
    const log = get_logger(do_log);

    log("Adding secret key to .env file");

    await addKeypairToEnvFile(keys, 'SECRET_KEY', '.env');

    log("Successfully added key to .env file");
}


