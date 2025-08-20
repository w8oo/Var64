# Var64

Compact **variable-length 64-bit integer encoding** for Node.js.  
Max 10 bytes, supports signed integers via ZigZag.

---

## Features
- Encode/decode **unsigned 64-bit integers** in 1–10 bytes.
- Encode/decode **signed 64-bit integers** with **ZigZag encoding**.
- Tiny memory footprint and fast serialization.
- CLI for instant testing and nerdy demos.
- Benchmark included for pure bragging rights.

---

## Specifications

| Property                       | Value / Formula |
|--------------------------------|----------------|
| Max integer supported           | `2^64 - 1` (unsigned), `-(2^63)` to `2^63-1` (signed) |
| Encoding unit                   | 7 bits per byte + 1 continuation bit |
| Max encoded length              | 10 bytes (for 64-bit numbers) |
| Minimum encoded length          | 1 byte (numbers < 128) |
| ZigZag mapping (signed)         | `n >= 0 → 2n`, `n < 0 → 2|n|-1` |
| Algorithm type                  | LEB128 / protobuf-inspired varint |
| Complexity                      | O(log N) for both encode and decode |
| Buffer type                     | Node.js `Buffer` |
| BigInt support                  | ✅ Full 64-bit precision |

---

## Encoding Algorithm (Unsigned)

1. Take 7 **least significant bits** of the number.
2. If there are remaining bits, set the **most significant bit (MSB)** to 1 (continuation).
3. Shift the number 7 bits right and repeat.
4. Stop when no bits remain. Max 10 iterations for 64-bit numbers.

Example:

```text
Number: 300 (0x012C)
Binary: 0000 0001 0010 1100
Varint bytes: [0b10101100, 0b00000010]  // 0xAC 0x02
```

---

## ZigZag Encoding (Signed)

ZigZag maps signed integers to unsigned integers to make small negative numbers take fewer bytes:

```text
zigzagEncode(n) = (n << 1) ^ (n >> 63)
zigzagDecode(n) = (n >> 1) ^ -(n & 1)
```

Example:

```text
n = -2
zigzagEncode(-2) = 3
Encoded varint: 0x03
```

---

## Installation

```bash
git clone https://github.com/w8oo/var64.git
cd var64
npm install
```

---

## Usage

```javascript
const { encodeVarint, decodeVarint, encodeSigned, decodeSigned } = require('./src/var64');

const buf = encodeVarint(123456789n);
console.log(decodeVarint(buf)); // 123456789n

const signedBuf = encodeSigned(-42n);
console.log(decodeSigned(signedBuf)); // -42n
```

---

## CLI Usage

```bash
node cli.js 12345
node cli.js -42
```

---

## Testing & Benchmarking

```bash
node test/test.js      # All unit tests
node test/bench.js     # Performance benchmark
```

---


