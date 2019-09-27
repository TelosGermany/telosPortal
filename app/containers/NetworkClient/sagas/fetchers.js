import { orderBy } from 'lodash';
import { put, all, join, fork, select, call } from 'redux-saga/effects';
import { networksUrl, tokensUrl } from 'remoteConfig';

import {
  loadedNetworks, updateNetworks, loadedAccount, updatedProducerMonitor, updatedChainMonitor,
  updateTokenPrices
} from '../actions';
import { makeSelectIdentity, makeSelectReader, makeSelectNetworks, makeSelectActiveNetwork } from '../selectors';

/*
*
* NETWORKS
* Get available networks
*
*/

// fetch networks and select defaultNetwork
export function* fetchNetworks() {
  try {
    // fetch the remote network list
    const data = yield fetch(networksUrl);
    const rawNetworks = yield data.json();

    const networks = rawNetworks.map(network => {
      const { endpoints, ...networkDetails } = network;
      const endpointDetails = endpoints.map(endpoint => {
        return {
          ...endpoint,
          failures: 0,
          ping: -1,
        };
      });
      return {
        ...networkDetails,
        endpoints: endpointDetails,
      };
    });

    // get default
    const network = networks.find(n => n.owner === 'TELOS' && n.type === 'mainnet');
    const endpoint = network.endpoints.find(e => e.name === 'Telos Germany');

    // build activeNetwork
    const activeNetwork = {
      network,
      endpoint,
    };

    yield put(loadedNetworks(networks, activeNetwork));
  } catch (err) {
    console.error('An TelosPortal error occured - see details below:');
    console.error(err);
  }
}

/*
*
* TOKENS
* Get tokens and stats
*
*/

function* fetchTokenInfo(reader, account, symbol) {
  try {
    if (symbol === 'OCT') throw { message: 'OCT has no STATS table - please fix!' };
    const stats = yield reader.getCurrencyStats(account, symbol);
    const split = stats[symbol].max_supply.split(' ')[0].split('.');
    const precision = split.length > 1 ? split[1].length : 0;
    return {
      account,
      symbol,
      precision,
    };
  } catch (c) {
    return {
      account,
      symbol,
      precision: 4,
    };
  }
}
// TODO: Create customTokenList in git (see eostoolkit) -> replace logic in getAccountDetail with fetchTokens and following logic

export function* fetchTokens(reader) {
  try {
    const data = yield fetch(tokensUrl);
    const list = yield data.json();

    const tokenList = [
      {
        symbol: 'TLOS',
        account: 'eosio.token',
      },
      ...list,
    ];
    const info = yield all(
      tokenList.map(token => {
        return fork(fetchTokenInfo, reader, token.account, token.symbol);
      })
    );
    const tokens = yield join(...info);
    return tokens;
  } catch (err) {
    console.error('An TelosPortal error occured - see details below:');
    console.error(err);
    return null;
  }
}

function* fetchTokenFromGreymass(account) {
  let body = { account: account.account_name };

  try {
    const flare = yield fetch('https://api-pub.eosflare.io/v1/eosflare/get_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    const flareData = yield flare.json();

    if (flareData.account) {
      const tokens = flareData.account.tokens.map(token => {
        return `${token.contract}:${token.symbol}`;
      });
      tokens.unshift('eosio.token:EOS');
      body = {
        ...body,
        tokens,
      };
    }
  } catch (err) {
    console.error('An TelosPortal error occured - see details below:');
    console.error(err);
  }

  const data = yield fetch('https://eos.greymass.com/v1/chain/get_currency_balances', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });
  const list = yield data.json();

  return list;
}

export function* fetchClaims() {
  try {
    // const data = yield fetch(claimsUrl);
    const claims = []; // yield data.json();
    return claims;
  } catch (err) {
    console.error('An TelosPortal error occured - see details below:');
    console.error(err);
    return [];
  }
}

/*
*
* IDENTITY
* Get signer identity
*
*/

export function* fetchIdentity(signer, activeNetwork) {
  try {
    const currentIdentity = yield select(makeSelectIdentity());
    // build a network to suggest
    const networkConfig = {
      protocol: activeNetwork.endpoint.protocol,
      blockchain: activeNetwork.network.network,
      host: activeNetwork.endpoint.url,
      port: activeNetwork.endpoint.port,
      chainId: activeNetwork.network.chainId,
    };
    // suggest the network to the user
    if (signer.hasOwnProperty('suggestNetwork')) yield signer.suggestNetwork(networkConfig);

    // get identities specific to the activeNetwork
    const id = yield signer.getIdentity({
      accounts: [
        {
          chainId: activeNetwork.network.chainId,
          blockchain: activeNetwork.network.network,
        },
      ],
    });

    // TODO: Find better solution than hard coded string...
    const match =
      id &&
      (id.accounts.find(x => x.blockchain === activeNetwork.network.network) ||
        id.accounts.find(x => x.blockchain === 'tlos'));

    if (match) {
      return match;
    }
    return null;
  } catch (err) {
    console.error('An TelosPortal error occured - see details below:');
    console.error(err);
    return null;
  }
}

/*
*
* ACCOUNT
* Load account(s) that has been selected as identity
*
*/

function* getCurrency(reader, token, name) {
  try {
    const currency = yield reader.getCurrencyBalance(token, name);
    const currencies = currency.map(c => {
      return {
        account: token,
        balance: c,
      };
    });
    return currencies;
  } catch (c) {
    const networks = yield select(makeSelectNetworks());
    const active = yield select(makeSelectActiveNetwork());

    const activeIndex = networks.findIndex(network => {
      return network.chainId === active.network.chainId;
    });

    const endpointIndex = networks[activeIndex].endpoints.findIndex(endpoint => {
      return endpoint.name === active.endpoint.name;
    });

    networks[activeIndex].endpoints[endpointIndex].failures += 1;

    yield put(updateNetworks(networks));
    return [];
  }
}

function* getAccountDetail(reader, name, activeNetwork) {
  try {
    const account = yield reader.getAccount(name);

    let customTokens = [];
    let customTokensData = [];

    if (activeNetwork.network.prefix === 'EOS') {
      customTokens = yield fetchTokenFromGreymass(account);
      customTokensData = customTokens.map(token => `${token.amount} ${token.symbol}`);
    } else {
      customTokens = yield fetchTokens(reader);
      const extendedDataPromise = yield all(
        customTokens.map(customToken => {
          return fork(getCurrency, reader, customToken.account, name);
        })
      );
      customTokensData = yield join(...extendedDataPromise);
      customTokensData = customTokensData.reduce((a, b) => a.concat(b), []);
      customTokensData = [...new Set(customTokensData.map(item => item.balance))];
    }

    return {
      ...account,
      balances: customTokensData,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function* fetchAccount() {
  const reader = yield select(makeSelectReader());
  const identity = yield select(makeSelectIdentity());
  const activeNetwork = yield select(makeSelectActiveNetwork());
  try {
    if (identity && identity.name) {
      const account = yield call(getAccountDetail, reader, identity.name, activeNetwork);
      yield put(loadedAccount(account));
    } else {
      yield put(loadedAccount(null));
    }
  } catch (err) {
    console.error('An TelosPortal error occured - see details below:');
    console.error(err);
  }
}

export function* fetchProducerMonitoringData() {
  try {
    const reader = yield select(makeSelectReader());
    const jsonFlag = true;
    const limit = 1000;
    const data = yield reader.getProducers(jsonFlag, '', limit);

    if (data) {
      yield put(updatedProducerMonitor(data));
    }
  } catch (err) {
    console.error('An TelosPortal error occured - see details below:');
    console.error(err);
  }
}

export function* fetchChainMonitoringData() {
  try {
    const reader = yield select(makeSelectReader());
    const data = yield reader.getInfo({});

    if (data) {
      yield put(updatedChainMonitor(data));
    }
  } catch (err) {
    console.error('An TelosPortal error occured - see details below:');
    console.error(err);
  }
}

export function* fetchTokenPrices() {
  try {
    const tokenPrices = yield fetch('https://marketcap.one/api/1.0/tokens', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'MCO-Auth': process.env.API_KEY,
      },
    });
    const tokenPriceData = yield tokenPrices.json();
    yield put(updateTokenPrices(tokenPriceData));
  } catch (err) {
    console.error('An TelosPortal error occured - see details below:');
    console.error(err);
  }
}
