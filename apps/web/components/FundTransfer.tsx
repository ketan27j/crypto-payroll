"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput";
import toast from "react-hot-toast";
import { addTransaction } from "../app/lib/actions/fundtransfer";
import { useState } from "react";

export const FundTranser = () => {
    const [senderWallet, setSenderWallet] = useState<string>("");
    const [receiverWallet, setReceiverWallet] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    return <Card title="Fund Transfer">
        <div>
            <TextInput label="Wallet Address" placeholder="Sender Wallet Address" value={senderWallet} onChange={(value) => {setSenderWallet(value)}} />
            <TextInput label="Wallet Threshold" placeholder="Receiver Wallet Address" value={receiverWallet} onChange={(value) => {setReceiverWallet(value)}} />
            <TextInput label="Amount" placeholder="Amount" value={amount.toString()} onChange={(value) => {setAmount(Number(value))}} />
            <div className="flex justify-center pt-4">               
                <Button onClick={async () => {
                    const res = await addTransaction(senderWallet, receiverWallet, amount as number)
                    if(res) {
                        toast.success("Fund transfered successfully");
                    //     setWalletAddr("");
                    //     setWalletThreshold(undefined);
                    //     setWalletAddState(true);
                    } else {
                        toast.error("Something went wrong");
                    }
                }}>Transfer Fund</Button>
            </div> 
        </div>
    </Card>
}