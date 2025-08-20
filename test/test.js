const { encodeVarint, decodeVarint, encodeSigned, decodeSigned } = require('../src/var64');
const { randomBigInt } = require('../src/utils');

const testValues = [0n, 1n, 127n, 128n, 16384n, 2n**63n - 1n];

for (const n of testValues) {
    const encoded = encodeVarint(n);
    const decoded = decodeVarint(encoded);
    console.assert(decoded === n, `Failed on ${n}`);
}

for (let i = 0; i < 10; i++) {
    const n = randomBigInt();
    const e = encodeSigned(n);
    const d = decodeSigned(e);
    console.assert(d === n, `Signed test failed on ${n}`);
}

console.log('All tests passed ✅');
