export function generateRandomNumber(end) {
  return Math.floor(Math.random() * end);
}

export function justifyNumber(companyNo, isWb) {
  if (isWb !== undefined) {
    return isWb;
  }
  // return /^(GO|GZS)/.test(companyNo);
  // return false;
  return /^wb/.test(companyNo);
}
