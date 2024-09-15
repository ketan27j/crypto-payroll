"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput";
import { Select } from "@repo/ui/select";
import toast from "react-hot-toast";
import { transferFund } from "../app/lib/actions/fundTransfer";
import { getBalance, transferSol } from "../app/lib/actions/solanaOps";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export const FundTranser = () => {
    const { connection } = useConnection();
    const [senderWallet, setSenderWallet] = useState<string>("");
    const [senderBalance, setSenderBalance] = useState<number>(0);
    const [receiverWallet, setReceiverWallet] = useState<string>("");
    const [receiverBalance, setReceiverBalance] = useState<number>(0);
    const [currency, setCurrency] = useState<string>("SOL");
    const [amount, setAmount] = useState<string>("0");
    const wallet = useWallet();
    useEffect(() => {
        const senderPublicKey = wallet.publicKey ? wallet.publicKey.toString() : "";
        setSenderWallet(senderPublicKey);
        setSenderBalance(0);
    }, [wallet.publicKey]);
    const currencies = [{key: '1', value: 'SOL'}];
    return <Card title="Fund Transfer">
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 pt-2">Sender Wallet Address</label>
            <div className="flex gap-4">
                <input onChange={(e) => {setSenderWallet(e.target.value)}} value={senderWallet} type="text" id="text1" 
                    className="flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-3/5" 
                    placeholder="Sender Wallet Address" readOnly/>
                <button
                    onClick={async () => {
                        const balance = await getBalance(connection,senderWallet);
                        setSenderBalance(balance);
                    }}
                    className="text-white bg-gray-800 px-4 py-2 rounded-md flex-auto p-2 w-1/5">
                    Get&nbsp;Balance
                </button>
                <span className="flex text-sm font-semibold text-gray-700flex-auto p-2 w-1/5 items-center">{senderBalance.toString()} SOL</span>
            </div>
            <label className="block mb-2 text-sm font-medium text-gray-900 pt-2">Receiver Wallet Address</label>
            <div className="flex gap-4">
                <input onChange={(e) => {setReceiverWallet(e.target.value)}} value={receiverWallet} type="text" id="text1" 
                    className="flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-3/5" 
                    placeholder="Receiver Wallet Address" />
                <button
                    onClick={async () => {
                        const balance = await getBalance(connection,receiverWallet);
                        setReceiverBalance(balance);
                    }}
                    className="text-white bg-gray-800 px-4 py-2 rounded-md flex-auto p-2 w-1/5">
                    Get&nbsp;Balance
                </button>
                <span className="flex text-sm font-semibold text-gray-700flex-auto p-2 w-1/5 items-center">{receiverBalance.toString()} SOL</span>
            </div>
            <Select label="Currency" options={currencies} onSelect={(value) => setCurrency(value)}></Select>
            <TextInput label="Amount" placeholder="Amount" value={amount} onChange={(value) => {setAmount(value);}} />
            <div className="flex justify-center pt-4">               
                <Button onClick={async () => {
                    const signature = await transferSol(connection, wallet, receiverWallet, parseFloat(amount))
                    const res = await transferFund(senderWallet, receiverWallet, currencies.find(currencies => currencies.key === currency)?.value || 'SOL', Number(amount),signature)
                    if(res) {
                        toast.success("Fund transfered successfully");
                        setReceiverWallet("");
                        setAmount("0");
                    } else {
                        toast.error("Something went wrong");
                    }
                }}>Transfer Fund</Button>
            </div> 
        </div>
    </Card>
}