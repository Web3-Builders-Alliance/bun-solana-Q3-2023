import {
    Transaction,
    SystemProgram,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction
} from "@solana/web3.js";
import wallet from "./wba-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("ECPn7GDibga2hGzhQ5ew3cSQbSdk8gxEp42WR7F5DWVh");
const connection = new Connection("https://api.devnet.solana.com");

// Transfer 0.1 SOL to my WBA address
// (async () => {
//     try {
//         const transcation = new Transaction().add(
//             SystemProgram.transfer({
//                 fromPubkey: from.publicKey,
//                 toPubkey: to,
//                 lamports: LAMPORTS_PER_SOL / 100
//             })
//         );
//         transcation.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
//         transcation.feePayer = from.publicKey;

//         const signature = await sendAndConfirmTransaction(
//             connection,
//             transcation,
//             [from]
//         );
//         console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
//     } catch (e) {
//         console.error(`Oops, something went wrong: ${JSON.stringify(e)}`);
//     }
// })();

// Transfer the rest of the token to my WBA address
(async () => {
    try {
        const balance = await connection.getBalance(from.publicKey);
        const transcation = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance
            })
        );
        transcation.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transcation.feePayer = from.publicKey;

        const fee = (await connection.getFeeForMessage(transcation.compileMessage(), 'confirmed')).value || 0;
        transcation.instructions.pop();
        transcation.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance - fee
            })
        );

        const signature = await sendAndConfirmTransaction(
            connection,
            transcation,
            [from]
        );
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${JSON.stringify(e)}`);
    }
})();