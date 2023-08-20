import pkg from 'bs58';
const { decode } = pkg;

// Replace with the WBA private key from Phantom wallet
const key = "xxx";
const decoded = decode(key);
console.log(JSON.stringify(Array.from(decoded)));