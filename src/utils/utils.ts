export function formatNumber(number: number | string, digits = 4) {
  let strNumber = typeof number === 'string' ? number : number.toString();
  return `#${strNumber.padStart(digits, '0')}`;
};

export function getIdFromUrl(url: string): number {
  const matches = url.match(/\/(\d+)\/?$/);
  return Number(matches ? matches[matches.length - 1] : 0);
};
