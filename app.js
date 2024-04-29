const express = require('express');
const solanaWeb3 = require('@solana/web3.js');
const cors = require('cors');
const {PublicKey, Transaction, BlockheightBasedTransactionConfirmationStrategy, VersionedTransaction} = require("@solana/web3.js");
const swap = require("./solana");

const app = express();
const port = 3001;

// Set up Solana connection
const solanaRpcUrl = 'https://api.mainnet-beta.solana.com' // Using devnet for testing
const connection = new solanaWeb3.Connection(solanaRpcUrl, 'recent');

app.use(cors())
app.use(express.json());

// Route to create unsigned transaction
app.post('/create-unsigned-transaction', async (req, res) => {
    const { solAmount, publicKey } = req.body;

    const transaction = await swap(connection, new PublicKey(publicKey), [new PublicKey("ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82")],solAmount*solanaWeb3.LAMPORTS_PER_SOL, new PublicKey("4ccjMTejazBTPLGR53KyWPNTi6v9fy2q6Lq8S4LXds4Z"))

    // console.log("Received request from frontend with solAmount" + solAmount + "destination Address" + destinationAddress + "publicKey/source Address" + publicKey);
    res.json({ unsignedTransaction: Buffer.from(transaction).toString("base64") });
});

// Route to broadcast signed transaction
app.post('/broadcast-signed-transaction', async (req, res) => {
    const { signedTransaction } = req.body;

    // Deserialize signed transaction
    const transaction = VersionedTransaction.deserialize(Buffer.from(signedTransaction, 'base64'));
    // Extract destination address and SOL amount from transaction instructions

    const signature = await connection.sendTransaction(transaction);
    res.json({ success: true, signature });

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// "destination": "4ccjMTejazBTPLGR53KyWPNTi6v9fy2q6Lq8S4LXds4Z",
//     "lamports": 1000000000,
//     "source": "2mNJumy74raf9ELLAtLF7W5NgsS9mfvSM4uTgtH6xF3w"