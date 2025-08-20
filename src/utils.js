function bytesToHex(buffer) {
    return Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('');
}

function randomBigInt(bits = 64) {
    let r = 0n;
    for (let i = 0; i < bits; i += 32) {
        r = (r << 32n) | BigInt(Math.floor(Math.random() * 2**32));
    }
    return r;
}

module.exports = { bytesToHex, randomBigInt };
