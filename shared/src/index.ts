const bs58 = require('bs58');


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

module.exports = {
    get_logger,
    get_veiled_secret_key,
};