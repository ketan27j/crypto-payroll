"use client"
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from 'bs58';
import { SalaryInfo, SaveSalaryTransaction } from "./solana/salaryTransaction";

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

export async function paySalary(clientId: number, connection: Connection, 
    wallet: WalletContextState, salaryDetails: SalaryInfo[],
    currentUserId: number ) {
    if (!wallet.publicKey) {
        throw new Error("Wallet not connected");
    }
    console.log('wallet', wallet.publicKey.toString());
    console.log('salaryDetails', salaryDetails);
    try {
        // const salaryTransactions = await getEmployeesForClient(1);
        const { blockhash } = await connection.getLatestBlockhash();
        const transaction = new Transaction({
            recentBlockhash: blockhash,
            feePayer: wallet.publicKey,
        });
        
        salaryDetails?.forEach(async (salaryTransaction) => {
            if (!wallet.publicKey) {
                throw new Error("Wallet not connected");
            }
        
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(salaryTransaction.employeeWallet),
                    lamports: salaryTransaction.amount / LAMPORTS_PER_SOL
                })
            );
        });

        if (!wallet.signTransaction) {
            throw new Error("Wallet does not support signing transactions");
        }


        const signed = await wallet.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);

        let clientInfo = {
            id: clientId,
            wallet: wallet.publicKey?.toString() || ''
        };
        await SaveSalaryTransaction(clientInfo, salaryDetails, signature, currentUserId);

        console.log('signature', signature);
        return signature;
    }
    catch (error) {
        console.log('Error in executing send transaction', error);
        return null;
    }

    // const signed = await wallet.signTransaction(transaction);
    // console.log('signed', signed);
    // return signed;
    // const serializedTransaction = transaction.serialize({requireAllSignatures: false});
    // const base64 = serializedTransaction.toString("base64");
    // let url = "solana:https://" + base64;
    // let qrcode = QRCode.toDataURL(url, {
    //     errorCorrectionLevel: 'H',
    //     margin: 2,
    //     color: {
    //         dark: '#000000',
    //         light: '#ffffff'
    //     }
    // });

    //return qrcode;
    // const signature = await connection.sendRawTransaction(signed.serialize());
    // await connection.confirmTransaction(signature);
    // return signature;
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