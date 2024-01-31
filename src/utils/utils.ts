const formatNumber = (number: number | string, digits = 4) => {
  let strNumber = typeof number === 'string' ? number : number.toString();
  return `#${strNumber.padStart(digits, '0')}`
};

export default formatNumber;
