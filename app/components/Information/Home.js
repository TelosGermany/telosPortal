import React from 'react';
import { NavLink } from 'react-router-dom';

// TODO: Check if changes needed
const Home = () => {
  return (
    <div>
      <h3>Getting started</h3>
      <h4>You must have <a href="https://get-scatter.com/" target="new">Scatter</a> installed to safely and securely send transactions to the Telos or EOS Network.</h4>
      {/*<h4>Checkout our <a href="https://eoshelpdesk.zendesk.com" target="new">EOS Helpdesk</a> to find useful information and tutorials for EOSToolkit and the EOS Network.</h4>*/}
      <h4>If you would like to ask us questions, participate in the TelosGermany Community, check out our <a href="https://t.me/TelosGermany" target="new">Telegram</a> group.</h4>
      <h4>Make sure you have read and understand the <NavLink to="/governance">Telos Governance</NavLink> prior to using the Telos Network.</h4>
    </div>
  );
};

export default Home;
