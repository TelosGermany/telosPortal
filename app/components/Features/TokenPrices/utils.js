/*
* Author: Andre Litty
* Project: Falcon Charts
* Date: 18.10.19
* Version: 1.0
*/

export function getEOSPrice(tokenPrices) {
  const eosPrice = tokenPrices.find(token => {
    return token.symbol === 'EOS';
  });
  if (eosPrice !== undefined && eosPrice !== null) return eosPrice.current_price;
  return null;
}

export function calculateUSDPrice(tokenPrice, eosPrice) {
  if (eosPrice !== undefined && eosPrice !== null) return eosPrice * tokenPrice;
  return tokenPrice;
}
