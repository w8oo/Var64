function randomBigInt(bits = 64) {
    let r = 0n;
    for (let i = 0; i < bits; i += 32) {
        r = (r << 32n) | BigInt(Math.floor(Math.random() * 2**32));
    }
    return r;
}

function randomSignedBigInt() {
    const max = 2n**63n - 1n;
    const min = -(2n**63n);
    const range = max - min + 1n;
    return min + (randomBigInt(63) % range);
}

module.exports = { randomBigInt, randomSignedBigInt };
