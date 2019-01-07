import React from 'react';
import { NavLink } from 'react-router-dom';

// TODO: Check if changes needed
const Home = () => {
  return (
    <div>
      <h3>Getting started</h3>
      <h4>
        You must have{' '}
        <a href="https://get-scatter.com/" target="new">
          Scatter
        </a>{' '}
        installed to safely and securely send transactions to the Telos or EOS Network.
      </h4>
      <h4>
        If you would like to ask us questions, participate in the TelosGermany Community, check out our{' '}
        <a href="https://t.me/TelosGermany" target="new">
          Telegram
        </a>{' '}
        group.
      </h4>
      <h4>
        Make sure you have read and understand the{' '}
        <a href="https://medium.com/@teloslogical/telos-governance-overview-28a34dbb24e7" target="new">
          Telos Governance
        </a>{' '}
        prior to using the Telos Network.
      </h4>
    </div>
  );
};

export default Home;
