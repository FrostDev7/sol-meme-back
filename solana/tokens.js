const anchor = require('@coral-xyz/anchor');

const {PublicKey} = anchor.web3

const TokenMintAccounts = {
  WSOL: {
    mint: new PublicKey('So11111111111111111111111111111111111111112'),
    decimals: 9,
  }
}

module.exports = TokenMintAccounts;
