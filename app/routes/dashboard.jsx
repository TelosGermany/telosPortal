// Primary components
import CreateAccount from 'components/Features/CreateAccountForm';
import CreateProxy from 'components/Features/CreateProxyForm';
import ResignProxy from 'components/Features/ResignProxyForm';
import SetProxy from 'components/Features/SetProxyForm';
import RamForm from 'components/Features/RamForm';
import StakeForm from 'components/Features/StakeForm';
import Refund from 'components/Features/RefundForm';
import Transfer from 'components/Features/TransferForm';
import SimplePermissions from 'components/Features/SimplePermissionsForm';
import ComplexPermissions from 'components/Features/ComplexPermissionsForm';
import LinkAuth from 'components/Features/LinkAuthForm';
import ClaimRewards from 'components/Features/ClaimRewardsForm';
import Airgrab from 'components/Features/AirgrabForm';
import Monitor from 'components/Features/BlockchainMonitor';
import VotingTable from 'containers/NetworkProducers';
import TokenPrices from 'components/Features/TokenPrices';

// MULTISIG - OFFLINE SIGN
import MultisigCreate from 'components/Features/Multisig/Create';
import MultisigSign from 'components/Features/Multisig/Sign';
import MultisigPush from 'components/Features/Multisig/Push';

// containers
import Network from 'containers/Network';
import SearchAccount from 'containers/SearchAccount';

// Pages
import FeaturesPage from 'components/Pages/FeaturesPage';

// external Features
import ProxyTable from 'containers/ProxyInfo';

// @material-ui/icons
import {
  Dashboard,
  Search,
  PersonAdd,
  AssignmentInd,
  AssignmentTurnedIn,
  Payment,
  DeveloperBoard,
  CloudDownload,
  VpnKey,
  DesktopMac,
  AttachMoney,
} from '@material-ui/icons';

// TODO: Check whats needed for first release

const dashRoutes = [
  { hide: true, path: '/networks', name: 'Network', component: Network },
  {
    path: '/home',
    name: 'Features',
    icon: Dashboard,
    component: FeaturesPage,
  },
  /*
  {
    path: '/community/forum/vote',
    name: 'Referendum',
    icon: Feedback,
    component: Referendum,
  },
  {
    path: '/donate',
    name: 'Donate',
    icon: Favorite,
    component: Donate,
  },
  */
  {
    path: '/airgrab',
    name: 'Airgrab Tokens',
    icon: CloudDownload,
    component: Airgrab,
  },
  {
    path: '/monitor',
    name: 'Monitor',
    icon: DesktopMac,
    component: Monitor,
  },
  {
    path: '/tokenPrices',
    name: 'Token Prices',
    icon: AttachMoney,
    component: TokenPrices,
  },
  {
    path: '/search',
    name: 'Find Accounts',
    icon: Search,
    component: SearchAccount,
  },
  {
    path: '/account/create',
    name: 'Create Account',
    icon: PersonAdd,
    component: CreateAccount,
  },
  {
    path: '/transfer',
    name: 'Transfer Tokens',
    icon: Payment,
    component: Transfer,
  },
  {
    collapse: true,
    path: '/account',
    name: 'Manage Account',
    state: 'openAccount',
    icon: AssignmentInd,
    views: [
      {
        path: '/account/delegate',
        name: 'Manage Stake',
        mini: 'MS',
        component: StakeForm,
      },
      {
        path: '/account/ram',
        name: 'Manage RAM',
        mini: 'MR',
        component: RamForm,
      },
      {
        path: '/account/permissions',
        name: 'Manage Permissions',
        mini: 'P',
        component: SimplePermissions,
      },
      {
        path: '/account/advanced',
        name: 'Advanced Permissions',
        mini: 'AP',
        component: ComplexPermissions,
      },
      {
        path: '/account/linkauth',
        name: 'Link Auth',
        mini: 'LA',
        component: LinkAuth,
      },
      {
        path: '/account/refund',
        name: 'Refund Stake',
        mini: 'RS',
        component: Refund,
      },
    ],
  },
  {
    collapse: true,
    path: '/vote',
    name: 'Manage Voting',
    state: 'openVote',
    icon: AssignmentTurnedIn,
    views: [
      {
        path: '/vote/producers',
        name: 'Vote Producers',
        mini: 'VP',
        component: VotingTable,
      },
      {
        path: '/vote/proxies',
        name: 'Proxy Information',
        mini: 'PI',
        component: ProxyTable,
      },
      {
        path: '/vote/setproxy',
        name: 'Set Proxy',
        mini: 'SP',
        component: SetProxy,
      },
      {
        path: '/vote/createproxy',
        name: 'Create Proxy',
        mini: 'CP',
        component: CreateProxy,
      },
      {
        path: '/vote/resignproxy',
        name: 'Resign Proxy',
        mini: 'RP',
        component: ResignProxy,
      },
    ],
  },
  {
    collapse: true,
    path: '/multisig',
    name: 'Multisig Transactions',
    state: 'openMultisig',
    icon: VpnKey,
    views: [
      {
        path: '/multisig/create',
        name: 'Create Transaction',
        mini: 'CT',
        component: MultisigCreate,
      },
      {
        path: '/multisig/sign',
        name: 'Sign Transaction',
        mini: 'ST',
        component: MultisigSign,
      },
      {
        path: '/multisig/push',
        name: 'Push Transaction',
        mini: 'PT',
        component: MultisigPush,
      },
    ],
  },
  {
    collapse: true,
    path: '/block-producer',
    name: 'Block Producer',
    state: 'openBlockProducer',
    icon: DeveloperBoard,
    views: [
      {
        path: '/block-producer/claim-rewards',
        name: 'Claim Rewards',
        mini: 'CR',
        component: ClaimRewards,
      },
    ],
  },
  { redirect: true, path: '/', pathTo: '/home', name: 'Home' },
  { redirect: true, path: '/account/buyram', pathTo: '/account/ram', name: 'Buy RAM' },
  { redirect: true, path: '/account/sellram', pathTo: '/account/ram', name: 'Sell RAM' },
  { redirect: true, path: '/karma', pathTo: '/dapps/karma', name: 'Karma' },
  { redirect: true, path: '/horuspay', pathTo: '/dapps/horuspay', name: 'HorusPay' },
  { redirect: true, path: '/grandpacoins', pathTo: '/dapps/grandpacoins', name: 'Grandpa' },
];
export default dashRoutes;
