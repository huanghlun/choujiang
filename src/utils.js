export function generateRandomNumber(end) {
  return Math.floor(Math.random() * end)
}

export function justifyNumber(companyNo) {
  return /^(GO|GZS)/.test(companyNo);
}