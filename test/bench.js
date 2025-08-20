const { encodeVarint, decodeVarint } = require('../src/var64');

console.time('Encode 1M numbers');
for (let i = 0n; i < 1000000n; i++) encodeVarint(i);
console.timeEnd('Encode 1M numbers');

console.time('Decode 1M numbers');
for (let i = 0n; i < 1000000n; i++) decodeVarint(encodeVarint(i));
console.timeEnd('Decode 1M numbers');
