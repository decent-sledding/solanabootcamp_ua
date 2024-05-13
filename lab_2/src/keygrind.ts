import { Keypair } from "@solana/web3.js";
import { Command } from 'commander';
import * as fs from 'fs';
import { get_veiled_secret_key } from "sharedlibs";
import bs58 = require('bs58');




// Setup CLI options to get user preferences for a desired key
const cliOptions = setupCLI().opts();
// Setup user requirements for public key
const checkKeyCallback = getGrinderConditionChecker(
    cliOptions.prefix,
    cliOptions.suffix,
    cliOptions.contains,
    cliOptions.ignoreCase);
// Start try to get a match for keys using 
const grindResult = grindKeys(checkKeyCallback);
const pubk = grindResult.keys.publicKey.toBase58();
const seck = get_veiled_secret_key(grindResult.keys.secretKey);


console.log(`Found Match! :`);
console.log(`\tPublic Key: ${pubk}`);
console.log(`\tSecret Key: ${seck}`);
console.log(`Took ${grindResult.time_ms} milliseconds in ${grindResult.attemptCount} attempts`)


writeKeys(grindResult);



/**| Return a checker for matching conditions
 * | ---------------------------------------
 * | A function/lambda/closure that is returned
 * | will check for preset conditions in a given string
 * | (string is passed as parameter every time a check is performed)
 * * 
 * @param {string}  prefix     - add check for string prefix
 * @param {string}  suffix     - add check for string suffix
 * @param {string}  contains   - add check for substring
 * @param {boolean} ignoreCase - do match ignoring the case
 * 
 * @returns Function: boolean
 */
function getGrinderConditionChecker(
    prefix = "",
    suffix = "",
    contains = "",
    ignoreCase = false,
): Function
{
    if (ignoreCase) {
        prefix = prefix.toLowerCase();
        suffix = suffix.toLowerCase();
        contains = contains.toLowerCase();
    }

    let check = (_) => (true); 
    let wrap = (cur, next) => (s: string) => {
        if (ignoreCase) {
            s = s.toLowerCase();
        }

        return cur(s) && next(s);
    };


    if (prefix) {
        check = wrap(check, (s) => s.startsWith(prefix));
    }
    
    if (suffix) {
        check = wrap(check, (s) => s.endsWith(suffix));
    }

    if (contains) {
        check = wrap(check, (s) => s.includes(contains));
    }

    return check;
}

interface GrindResult {
    keys: Keypair,
    time_ms: number,
    attemptCount: number,
}

/** Save key grind result to the file in a JSON format
 * * 
 * @param {GrindResult} result - a result from grinding keys
 */
function writeKeys(result: GrindResult) {
    const [pub, sec] = [result.keys.publicKey.toBase58(), bs58.encode(result.keys.secretKey)];
    const [attempts, time_ms] = [result.attemptCount, result.time_ms];
    const filePathPrefix = 'keys';
    let count = 0;
    let filePath: fs.PathLike = `${filePathPrefix}.json`;

    while (fs.existsSync(filePath)) {
        filePath = filePathPrefix + '_' + count++ + '.json';
    }

    console.log(`Saving the keys to the file: ${filePath}`)
    fs.writeFileSync(
        filePath,
        JSON.stringify({pub, sec, attempts, time_ms}),
        {encoding: 'utf8', flag: 'w'}
    );
}



/** Try to find a match for public key with a provided condition check
 * | Condition check is provided in a form of a callback.
 * | Callback function is called each time a check is performed.
 * | When callback returns truth
 * | - then the a match is considered to be found.
 * *
 * @param pubkey_condition_check_cb 
 * @returns 
 */
function grindKeys(pubkey_condition_check_cb: Function): GrindResult {
    let keys = Keypair.generate();
    let attemptCount = 1;

    const startTime = performance.now();
    while (!pubkey_condition_check_cb(keys.publicKey.toBase58())) {
        keys = Keypair.generate();
        ++attemptCount;
    }
    const time_ms = performance.now() - startTime;

    return {
        keys,
        time_ms,
        attemptCount,
    };
}

/** Prepare current script to accept CLI arguments
 * | User of this script will thus
 * | will be able to provide some options considering public key.
 */
function setupCLI(): Command {
    const program = new Command()
        .name("Key Grinder")
        .description("Try grind some keys given restrictions")
        .version('0.0.1')

        .option('--prefix <starts_with>', 'Specify desired public key prefix')
        .option('--suffix <ends_with>', 'Specify desired public key suffix')
        .option('--contains <has_phrase>', 'Specify sequence key must contain')
        .option('-l, --ignore-case', 'Ignore case when grinding key with above options')
        .parse(process.argv);

    return program;
}