import * as bigInt from "big-integer";
import { BigInteger, IKeys } from "./rsatypes";

const getPrime = (bits: number): BigInteger => {
  const min = bigInt.one.shiftLeft(bits - 1);
  const max = bigInt.one.shiftLeft(bits).prev();

  while (true) {
    let p = bigInt.randBetween(min, max);
    if (p.isProbablePrime(256)) return p;
  }
}

export const getKeys = (keysize: number): IKeys => {
  const e: BigInteger = bigInt(65537);
  let p: BigInteger;
  let q: BigInteger;
  let phi: BigInteger;

  do {
    p = getPrime(keysize / 2);
    q = getPrime(keysize / 2);

    phi = bigInt.lcm(
      p.prev(),
      q.prev()
    )
  } while (invalidNumbers(p, q, e, phi, keysize));

  return {
    e,
    n: p.multiply(q),
    d: e.modInv(phi)
  }
}

const invalidNumbers = (p: BigInteger, q: BigInteger, e: BigInteger, phi: BigInteger, keysize: number) => {
  const isCoprime = bigInt.gcd(e, phi).notEquals(1)
  const isCorrectBinary = p.minus(q).abs().shiftRight(keysize / 2 - 100).isZero();
  return isCoprime || isCorrectBinary;
}

export const encode = (str: string): BigInteger => {
  const charCodes = str
  .split('')
  .map(i => i.charCodeAt(0))
  .join('');

  return bigInt(charCodes);
}

export const encrypt = (encodedMessage: BigInteger, e: BigInteger, n: BigInteger): BigInteger => {
  return bigInt(encodedMessage).modPow(e, n);
}

export const decrypt = (encryptedMessage: BigInteger, d: BigInteger, n: BigInteger) => {
  return bigInt(encryptedMessage).modPow(d, n);
}



export const decode = (encryptedStr: BigInteger): string => {
  const str: string = encryptedStr.toString();
  let string = '';

  for (let i = 0; i < str.length; i++) {
    let num = Number(str.substr(i, 2));

    if (num <= 31) {
      string += String.fromCharCode(Number(str.substr(i, 3)));
      i += 2;
    } else {
      string += String.fromCharCode(num);
      i++;
    }
  }
  return string;
}