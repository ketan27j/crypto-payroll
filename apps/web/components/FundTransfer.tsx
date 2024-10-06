"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput";
import { Select } from "@repo/ui/select";
import toast from "react-hot-toast";
import { transferFund } from "../app/lib/actions/fundTransfer";
import { checkValidWallet, getBalance, getFeePayerKeyPair, transferSol } from "../app/lib/actions/solanaOps";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { z } from "zod";
import * as anchor from "@coral-xyz/anchor";
import { Program, Idl } from "@coral-xyz/anchor";
import idl from '../app/lib/actions/solana/scOutput/sol_transfer.json';
import { SolTransfer } from '../app/lib/actions/solana/scOutput/sol_transfer';
import { PublicKey } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    Provider,
    BN,
    web3,
  } from '@project-serum/anchor';
  import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

const fundTransferSchema = z.object({
    senderWallet: z.string().min(1, "Sender wallet is required"),
    receiverWallet: z.string().min(1, "Receiver wallet is required"),
    amount: z.string().min(1, "Amount is required")
                    .refine(val => !isNaN(Number(val)), "Amount must be a number")
                    .refine(val => Number(val) > 0, "Amount must be greater than 0"),
    currency: z.string().min(1, "Currency is required"),
  });
  
export const FundTranser = () => {
    const { connection } = useConnection();
    const [senderWallet, setSenderWallet] = useState<string>("");
    const [senderBalance, setSenderBalance] = useState<number>(0);
    const [receiverWallet, setReceiverWallet] = useState<string>("");
    const [receiverWalletIsValid, setReceiverWalletIsValid] = useState<boolean>(false);
    const [currency, setCurrency] = useState<string>("SOL");
    const [amount, setAmount] = useState<string>("0");
    const [isLoading, setIsLoading] = useState(false);
    const wallet = useWallet();
    useEffect(() => {
        const senderPublicKey = wallet.publicKey ? wallet.publicKey.toString() : "";
        setSenderWallet(senderPublicKey);
        setSenderBalance(0);
    }, [wallet.publicKey]);
    const currencies = [{key: '1', value: 'SOL'}];
    const validateForm = () => {
        const result = fundTransferSchema.safeParse({
          senderWallet,
          receiverWallet,
          amount,
          currency,
        });
      
        if (!result.success) {
          const errors = result.error.issues.map(issue => issue.message);
          toast.error(errors.join("\n"));
          return false;
        }
      
        if (!receiverWalletIsValid) {
          toast.error("Receiver wallet is not valid");
          return false;
        }
      
        return true;
      };

      const TransferForm = () => {
        
        return <Card title="Quick Send">
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    }}>
                    <WalletMultiButton style={{
                        borderRadius: '5px',
                        backgroundColor: '#91629b',
                        color: '#fff',
                        }}>
                    </WalletMultiButton>
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 pt-2">Sender Wallet Address</label>
                <div className="flex gap-4">
                    <input onChange={(e) => {setSenderWallet(e.target.value)}} value={senderWallet} type="text" id="txtSendWallet" 
                        className="flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-3/5" 
                        placeholder="Sender Wallet Address"/>
                    <button
                        onClick={async () => {
                            const balance = await getBalance(connection,senderWallet);
                            setSenderBalance(balance);
                        }}
                        className="text-white btn-secondary px-4 py-2 rounded-md flex-auto p-2 w-1/5">
                        Check Balance
                    </button>
                    <span className="flex text-sm font-semibold text-gray-700flex-auto p-2 w-1/5 items-center">{senderBalance.toString()} SOL</span>
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 pt-2">Receiver Wallet Address</label>
                <div className="flex gap-4">
                    <input onChange={
                        async (e) => {
                            setReceiverWallet(e.target.value)
                            const isValid = await checkValidWallet(connection,e.target.value);
                            setReceiverWalletIsValid(isValid);
                        }}
                        value={receiverWallet} type="text" id="txtRecWallet" 
                        className="flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-3/5" 
                        placeholder="Receiver Wallet Address" />
                    <button
                        onClick={async () => {
                            setReceiverWalletIsValid(await checkValidWallet(connection,receiverWallet));
                        }}
                        className="text-white btn-secondary px-4 py-2 rounded-md flex-auto p-2 w-1/5">
                        Validate&nbsp;Wallet
                    </button>
                <span className={`flex text-sm font-semibold flex-auto p-2 w-1/5 items-center ${receiverWalletIsValid ? 'text-green-600' : 'text-red-600'}`}>
                        {receiverWalletIsValid ? "VALID" : ""}
                    </span>
                </div>
                <Select label="Currency" options={currencies} onSelect={(value) => setCurrency(value)}></Select>
                <TextInput label="Amount" placeholder="Amount" value={amount} onChange={(value) => {setAmount(value);}} />
                <div className="flex justify-center pt-4">               
                    <button disabled={isLoading}
                        className='text-white btn-primary px-4 py-2 rounded-md flex-auto p-2 w-1/5'
                        onClick={async () => {
                        if (!validateForm()) return;
                        setIsLoading(true);
                        try {
                            //const signature = await transferSol(connection, wallet, receiverWallet, parseFloat(amount))
                            const scheduledTime = new anchor.BN(Date.now() / 1000 + 60);
                            const transAmount = new anchor.BN(1e8);
                            const provider = new anchor
                                                    .AnchorProvider(
                                                        connection, 
                                                        wallet as unknown as anchor.Wallet, 
                                                        {}
                                                    );
                            const program = new Program(idl as Idl, provider) as unknown as Program<SolTransfer>;
                            //const signerAccount = await getFeePayerKeyPair();
                            const tx = await program.methods
                                            .transferSol(transAmount, scheduledTime)
                                            .accountsPartial({
                                                sender: new PublicKey(senderWallet),
                                                receiver: new PublicKey(receiverWallet),
                                                systemProgram: web3.SystemProgram.programId,
                                            })
                                            //.signers([signerAccount])
                                        .rpc();

                            
                            // const res = await transferFund(senderWallet, receiverWallet, currencies.find(currencies => currencies.key === currency)?.value || 'SOL', Number(amount),signature)
                            // if(res) {
                            //     toast.success("Fund transfered successfully");
                            //     setReceiverWallet("");
                            //     setSenderBalance(0);
                            //     setAmount("0");
                            // } else {
                            //     toast.error("An error occurred during transfer");
                            // }
                        } catch (e) {
                            toast.error("An error occurred during transfer");
                            console.log('error', e);
                        } finally {
                            setIsLoading(false);
                        }
                    }}>SEND
                    </button>
                </div> 
            </div>
        </Card>
      }

      return (
      <ConnectionProvider endpoint={process.env.SOLANA_ENDPOINT || "https://api.devnet.solana.com"}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                    <TransferForm></TransferForm>                        
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
      )
}