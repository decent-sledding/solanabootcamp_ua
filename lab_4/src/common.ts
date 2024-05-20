import {
    Keypair,
    PublicKey,
} from '@solana/web3.js'
import { get_keys_from_env_or_cli } from 'sharedlibs'
import { Command } from 'commander'


export interface MintAccountsData {
    signer: Keypair,
    associatedAccount: PublicKey,
    mintAccount: PublicKey,
}

// Acquire Keys/Addresses from Environment or CLI
// Get:
// - Mint Account Address
// - Target Solana Account to create Token Account for
// - Secret & Public keys for authority
export function getMintAccounts(): [Command, () => MintAccountsData] {
    const cli = get_keys_from_env_or_cli();
    
    function getAccounts(): MintAccountsData {
        let associatedAccount: PublicKey;
        let mintAccount: PublicKey;
        let signer: Keypair | undefined;

        cli.option('-m, --mint-account <pubkey>', 'Public key for Mint Token Account');
        cli.requiredOption('-a, --target-account <pubkey>', 'PublicKey for target account');
        cli.parse();
        const ops = cli.opts();

        try {
            associatedAccount = new PublicKey(ops.targetAccount);
        } catch(e) {
            throw Error("You need to provide recepient account public key");
        }

        try {
            mintAccount = new PublicKey(ops.mintAccount || process.env['MINT_ACCOUNT']);
        } catch(e) {
            throw Error("Provide a Mint Account Address");
        }

        signer = cli.parseKeys().pair;
        if (!signer) {
            throw Error("You need to private key");
        }

        return { signer, associatedAccount, mintAccount }
    }

    return [cli, getAccounts];
}
