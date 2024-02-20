/**
 *  Date    : 2017/8/3
 *  Author  : CastileMan
 *  Declare : 生成唯一id
 */

"use strict";
export default shortid;
export {encode};
export {shuffle};
export {padStartWithZERO};

let ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
let alphabet = '';
let timeStamp = '';
let timeStampBit = 0;
let bit = 16;

let ZERO = '';

let prevSecond = '';
let order = 1;

function shortid() {
  if(!alphabet || !timeStamp) {
    init();
  }

  const seconds = Math.floor((Date.now() - timeStamp) / 1000);

  if(prevSecond === seconds) {
    order++;
  } else {
    prevSecond = seconds;
    order = 1;
  }
  const offset = random(alphabet.length);

  return (
    padStartWithZERO(encode(seconds, offset))
    + encode(order, offset)
  );
}

function init() {
  const year = new Date().getFullYear();
  timeStamp = Date.UTC(year, 0, 1, -8, 0, 0);
  timeStampBit = encode(365 * 24 * 3600);

  shuffle();

  ZERO = alphabet[0];
}

function shuffle() {
  const alphabetSet = new Set();

  while (alphabetSet.size < bit) {
    const randomNum = random(ORIGINAL.length);
    alphabetSet.add(ORIGINAL[randomNum]);
  }

  alphabet = [...alphabetSet].join('');
  return alphabet;
}

function encode(number, offset = 0) {
  let loopCounter = 0;
  let done;

  let str = '';

  while (!done) {
    str = str + lookup(((number >> (4 * loopCounter)) & 0x0f), offset);
    done = number < (Math.pow(bit, loopCounter + 1));
    loopCounter++;
  }
  return str;
}

function lookup(index, offset = 0) {
  index = (index + offset) % alphabet.length;
  return alphabet[index];
}

function padStartWithZERO(num = 0, length = timeStampBit) {
  let result = String(num);

  let diff = length - String(num).length;
  if(diff > 0) {
    while(result.length < length) {
      result = ZERO + result;
    }
  }

  return result;
}

function random(max = 1) {
  const randomNum = Math.floor(Math.random() * max);
  if(randomNum === random._randomNum) {
    return random(max);
  } else {
    random._randomNum = randomNum;
    return randomNum;
  }
}
