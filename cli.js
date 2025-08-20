const { encodeVarint, decodeVarint, encodeSigned, decodeSigned } = require('./src/var64');

function bytesToHex(bytes) {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

const arg = process.argv[2];
if (!arg) {
    console.error('Usage: node cli.js <number>');
    process.exit(1);
}

let n;
try {
    n = BigInt(arg);
} catch {
    console.error('Invalid number:', arg);
    process.exit(1);
}

let encoded, decoded;
if (n < 0n) {
    encoded = encodeSigned(n);
    decoded = decodeSigned(encoded);
} else {
    encoded = encodeVarint(n);
    decoded = decodeVarint(encoded);
}

console.log(`Number: ${n}`);
console.log(`Encoded (hex): ${bytesToHex(encoded)}`);
console.log(`Decoded: ${decoded}`);
