//
// Provide a list of EOS tokens that are available
//

// TODO: Remove unused airgrabs and add new airgrabs

const airgrabs = [];

const claimsUrl = 'https://raw.githubusercontent.com/eostoolkit/eos-claims/master/claims.json-DISABLED';
const networksUrl = 'https://raw.githubusercontent.com/TelosGermany/network_list/master/networks.json';
const refUrl = 'https://s3.amazonaws.com/api.eosvotes.io/eosvotes/tallies/latest.json';
const tokensUrl = 'https://raw.githubusercontent.com/TelosGermany/token_list/master/tokens.json';

const customTokens = [
  {
    name: 'Cnt',
    logo: '',
    logo_lg: '',
    symbol: 'CNT',
    account: 'vapaeetokens',
  },
  {
    name: 'Acorn',
    logo: '',
    logo_lg: '',
    symbol: 'ACORN',
    account: 'acornaccount',
  },
  {
    name: 'Robo',
    logo: '',
    logo_lg: '',
    symbol: 'ROBO',
    account: 'proxibotstkn',
  },
];

export { refUrl, networksUrl, claimsUrl, airgrabs, tokensUrl };
