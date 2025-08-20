// ZigZag encoding maps signed integers to unsigned
function zigzagEncode(n) {
    if (typeof n !== 'bigint') n = BigInt(n);
    return (n << 1n) ^ (n >> 63n);
}

function zigzagDecode(n) {
    if (typeof n !== 'bigint') n = BigInt(n);
    return (n >> 1n) ^ -(n & 1n);
}

module.exports = { zigzagEncode, zigzagDecode };
