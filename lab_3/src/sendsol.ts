import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Keypair,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    TransactionSignature,
    TransactionInstruction,
} from '@solana/web3.js';
import { CustomCommand, UserKeys, get_keys_from_env_or_cli } from 'sharedlibs';


class ProvidedData {
    amount?: number
    addr?: PublicKey
    message: string
    keys: UserKeys

    constructor(addr?: PublicKey, amount?: number) {
        this.amount = amount;
        this.addr = addr;
        this.keys = new UserKeys();
        this.message = "";
    }
}

const [_cli, data] = parseCLI();
const connection = new Connection(clusterApiUrl('devnet'));
console.log(`Using Devnet blockchain`);
await sendSOLAndMessage(connection, data)



async function sendSOLAndMessage(
        conn: Connection,
        data: ProvidedData,
): Promise<TransactionSignature>
{
    if (!data.addr || !data.amount) {
        throw Error("Must specify address and amount of SOL");
    }

    if (!data.keys.pair) {
        throw Error("Could not obtain Sender Keypair");
    }

    const memappPubkey = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
    const sender = data.keys.pair;

    console.log(`Using Memo: ${memappPubkey}`);
    console.log("")
    console.log("Creating transaction:");
    console.log(`\tSender: ${sender.publicKey.toBase58()}`);
    console.log(`\tReceiver: ${data.addr.toBase58()}`);

    const tx = new Transaction()
        .add(SystemProgram.transfer({
            fromPubkey: sender.publicKey,
            toPubkey: data.addr,
            lamports: data.amount * LAMPORTS_PER_SOL,
        }))
        .add(new TransactionInstruction({
            keys: [{pubkey: sender.publicKey, isSigner: true, isWritable: true}],
            data: Buffer.from(data.message, 'utf8'),
            programId: memappPubkey,
        }));
    const txSignature = await sendAndConfirmTransaction(conn, tx, [sender]);

    console.log(`\tTransaction signature: ${txSignature}`)

    return txSignature;
}


function parseCLI(): [CustomCommand, ProvidedData] {
    const cli = get_keys_from_env_or_cli();

    cli.requiredOption('-m, --message <msg>', 'Enter message you want to send to the blockchain');
    cli.requiredOption('-r, --receiver <send_to_addr>', 'Address to send SOL to');
    cli.requiredOption('-c, --sol-amount <floating point number>', 'Specify amount of SOL to send');
    cli.parse();

    const opts = cli.opts();
    const data = new ProvidedData();

    if (!opts.message) {
        throw Error("Specify the message! It must not be empty");
    }

    if (!opts.receiver || !opts.solAmount) {
        throw Error("You have not specified destination (receiver) info. (where to send SOL?)");
    }

    if (!PublicKey.isOnCurve(opts.receiver)) {
        throw Error("Bad receiver address");
    }

    if (isNaN(opts.solAmount)) {
        throw Error("Bad amount of Solana specified. Provide a correct floating point number");
    }

    data.addr = new PublicKey(opts.receiver);
    data.amount = parseFloat(opts.solAmount);
    data.message = opts.message;
    data.keys = cli.parseKeys();

    return [cli, data];
}