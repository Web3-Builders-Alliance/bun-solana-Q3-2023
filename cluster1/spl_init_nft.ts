import { Keypair, Connection, Commitment, Transaction, TransactionInstruction, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import wallet from "../wba-wallet.json";
import {
    createCreateMetadataAccountV2Instruction,
    createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);
(async () => {
    try {
        const createMintInstruction = new TransactionInstruction({
            keys: [
                { pubkey: keypair.publicKey, isSigner: false, isWritable: true },
                { pubkey: PublicKey.default, isSigner: false, isWritable: false }, // Sysvar Rent Account
            ],
            programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), // SPL Token program ID
            data: Buffer.from([0, ...Buffer.alloc(8)]),
        });

        // TODO
        const createAssocAccountInstruction = new TransactionInstruction({});

        // TODO
        const createCreateMetadataAccountV3Instruction = new TransactionInstruction({});

        // TODO
        const createMasterEditionInstruction = new TransactionInstruction({});

        const tx = new Transaction().add(
            createMintInstruction,
            createAssocAccountInstruction,
            createCreateMetadataAccountV3Instruction,
            createMasterEditionInstruction
        );
        const txHash = await sendAndConfirmTransaction(connection, tx, [keypair]);
        console.log(`Successfully created token at https://explorer.solana.com/tx/${txHash}?cluster=devnet`);
    } catch (e) {
        console.log(`Oops, something went wrong: ${JSON.stringify(e)}`);
    }
})();