#!/usr/bin/env node
const { encodeVarint, decodeVarint } = require('./src/var64');
const { bytesToHex } = require('./src/utils');

const input = process.argv[2];
if (!input) {
    console.log('Usage: node cli.js <number>');
    process.exit(1);
}

const value = BigInt(input);
const encoded = encodeVarint(value);
console.log(`Number: ${value}`);
console.log(`Encoded (hex): ${bytesToHex(encoded)}`);
console.log(`Decoded: ${decodeVarint(encoded)}`);
