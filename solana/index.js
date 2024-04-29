const createSwapTx = require('./jupyter');
const TokenMintAccounts = require('./tokens');
const {PublicKey, Connection} = require("@solana/web3.js");

/// @param provider - The solana web3 provider. In web environments this will be provided by the browser wallet
/// @param userAccount - the public key of the user wallet
/// @param outputMints - a list of public keys representing the mint accounts we are swapping SOL for
/// @param amount - total amount of SOL to be swapped
/// @param treasury - the wallet that receives the tax fee
/// @param slippageBps - slippage bps to be applied during the swap. default is 1%
const swap = async (
  connection, userAccount, outputMints, amount, treasury, slippageBps=100
) => {
  // Swap SOL for all outputMints. The sol amount will be split equally
  const swapTx = await createSwapTx(
    connection,
    userAccount,
    TokenMintAccounts.WSOL.mint.toBase58(),
    outputMints,
    amount,
    slippageBps,
    treasury,
    [],
  );
  
  return swapTx.serialize();
}

// // Set up Solana connection
// const solanaRpcUrl = 'https://api.mainnet-beta.solana.com' // Using devnet for testing
// const connection = new Connection(solanaRpcUrl, 'recent');
// const transaction = swap(connection, new PublicKey("2mNJumy74raf9ELLAtLF7W5NgsS9mfvSM4uTgtH6xF3w"), [new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263")], 100_000_000_000, new PublicKey("2mNJumy74raf9ELLAtLF7W5NgsS9mfvSM4uTgtH6xF3w"))
//
// console.log(transaction.then(t => console.log(t)))

module.exports = swap;