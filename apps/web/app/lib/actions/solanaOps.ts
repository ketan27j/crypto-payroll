"use client"
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export async function getBalance(connection:Connection, walletAddress: string) {
    const address = new PublicKey(walletAddress);
    const balance = await connection.getBalance(address);
    return balance/LAMPORTS_PER_SOL;
}

export async function transferSol(connection: Connection, wallet: WalletContextState, receiverWallet: string, amount: number) {
    if (!wallet.publicKey) {
        throw new Error("Wallet not connected");
    }

    const receiverWalletAddress = new PublicKey(receiverWallet);
    const transaction = new Transaction();
    transaction.add(
        SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: receiverWalletAddress,
            lamports: amount * LAMPORTS_PER_SOL
        })
    );
    //await connection.sendTransaction(transaction, [senderWallet]);
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    if (!wallet.signTransaction) {
        throw new Error("Wallet does not support signing transactions");
    }

    const signed = await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature);
    return signature;
}