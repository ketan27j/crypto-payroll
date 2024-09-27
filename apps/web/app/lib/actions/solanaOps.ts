"use client"
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from 'bs58';

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

export async function checkValidWallet(connection: Connection, walletAddress: string) {
    try {
        const address = new PublicKey(walletAddress);
        return PublicKey.isOnCurve(address);
    } catch (error) {
        return false;
    }
}

export async function getFeePayerKeyPair() {
    try
    {
        let base58PrivateKey = process.env.WALLET_PRIVATE_KEY || '';
        base58PrivateKey = "2iTouTNin3MtKQtQLkT7dPH2FdSjgwWJ3k3qjPftBtLp2fqddXnB6erqyt9kvMC7odjnE51QinJZ1Ji77hDKV8U2"
        console.log('base58PrivateKey', base58PrivateKey);
        const privateKeyBuffer = bs58.decode(base58PrivateKey);
        return Keypair.fromSecretKey(privateKeyBuffer);
    }
    catch(error) {
        console.log('error in getFeeyPayerKeyPair', error);
        throw new Error("Invalid base58 private key");
    }
}