"use client";
import { Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { ExtensionType, LENGTH_SIZE, MINT_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE, createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMint2Instruction, createInitializeMintInstruction, createMint, createMintToInstruction, getAssociatedTokenAddressSync, getMinimumBalanceForRentExemptMint, getMintLen } from "@solana/spl-token"
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';

export async function createToken(connection: Connection, wallet: WalletContextState,name: string, symbol: string, description: string, metadataUri: string, initSupply: string): Promise<string> {
    if (!wallet.publicKey) {
        throw new Error("Wallet not connected");
    }
    
    const mintKeypair = Keypair.generate();
    const metadata = {
        mint: mintKeypair.publicKey,
        name: name,
        symbol: symbol,
        uri: metadataUri,
        additionalMetadata: [],
    };
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: mintLen,
            lamports,
            programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
        createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
        createInitializeInstruction({
            programId: TOKEN_2022_PROGRAM_ID,
            mint: mintKeypair.publicKey,
            metadata: mintKeypair.publicKey,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mintAuthority: wallet.publicKey,
            updateAuthority: wallet.publicKey,
        }),
    );
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.partialSign(mintKeypair);
    try {
        await wallet.sendTransaction(transaction, connection);
        console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()} with signature ${transaction.signature}`);
    } catch (error) {
        console.error("Error sending transaction:", error);
        throw error;
    }
    
    const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID,
    );

    const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            associatedToken,
            wallet.publicKey,
            mintKeypair.publicKey,
            TOKEN_2022_PROGRAM_ID,
        ),
    );

    try {
        await wallet.sendTransaction(transaction2, connection);
        console.log(`Associated Token Account created at ${associatedToken.toBase58()} with signature ${transaction2.signature}`);
    } catch (error) {
        console.error("Error sending transaction2:", error);
        throw error;
    }

    const transaction3 = new Transaction().add(
        createMintToInstruction(mintKeypair.publicKey, associatedToken, wallet.publicKey, 1000000000, [], TOKEN_2022_PROGRAM_ID)
    );
    
    try {
        await wallet.sendTransaction(transaction3, connection);
        console.log(`Minted in Associated Token Account ${associatedToken.toBase58()} with signature ${transaction3.signature}`);
    } catch (error) {
        console.error("Error sending transaction3:", error);
        throw error;
    }

    return mintKeypair.publicKey.toBase58();
}