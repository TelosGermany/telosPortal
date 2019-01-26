//
// Provide a list of EOS tokens that are available
//

// TODO: Remove unused airgrabs and add new airgrabs

const airgrabs = [
  {
    symbol: 'VIITA',
    account: 'viitasphere1',
    method: 'signup',
    description:
      'Viitasphere is the economy of the future, where everyday people, rather than a central power, control the economy. With Viitasphere every individual will have the ability to connect with one another on a peer-to-peer platform in order to request and provide services and goods for a cost determined by both parties, paid in any manner they see fit.',
    url: 'http://www.viitasphere.com/',
  },
  {
    symbol: 'VIICT',
    account: 'viitasphere1',
    method: 'signup',
    description:
      'Viitasphere is the economy of the future, where everyday people, rather than a central power, control the economy. With Viitasphere every individual will have the ability to connect with one another on a peer-to-peer platform in order to request and provide services and goods for a cost determined by both parties, paid in any manner they see fit.',
    url: 'http://www.viitasphere.com/',
  },
];

const claimsUrl = 'https://raw.githubusercontent.com/eostoolkit/eos-claims/master/claims.json-DISABLED';
const networksUrl = 'https://raw.githubusercontent.com/TelosGermany/network_list/master/networks.json';
const refUrl = 'https://s3.amazonaws.com/api.eosvotes.io/eosvotes/tallies/latest.json';

export { refUrl, networksUrl, claimsUrl, airgrabs };
