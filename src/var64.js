const { zigzagEncode, zigzagDecode } = require('./zigzag');

function encodeVarint(value) {
    if (typeof value !== 'bigint') value = BigInt(value);
    const bytes = [];
    while (true) {
        let byte = Number(value & 0x7Fn);
        value >>= 7n;
        if (value === 0n) {
            bytes.push(byte);
            break;
        } else {
            bytes.push(byte | 0x80);
        }
    }
    return Buffer.from(bytes);
}

function decodeVarint(buffer) {
    let result = 0n;
    let shift = 0n;
    for (let i = 0; i < buffer.length; i++) {
        const byte = BigInt(buffer[i]);
        result |= (byte & 0x7Fn) << shift;
        if ((byte & 0x80n) === 0n) return result;
        shift += 7n;
        if (shift > 70n) throw new Error('Varint too long');
    }
    throw new Error('Buffer ended unexpectedly');
}

// ZigZag helpers for signed ints
function encodeSigned(value) {
    return encodeVarint(zigzagEncode(value));
}

function decodeSigned(buffer) {
    return zigzagDecode(decodeVarint(buffer));
}

module.exports = { encodeVarint, decodeVarint, encodeSigned, decodeSigned };
