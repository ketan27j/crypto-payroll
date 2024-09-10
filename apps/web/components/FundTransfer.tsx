"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput";
import { Select } from "@repo/ui/select";
import toast from "react-hot-toast";
import { addTransaction } from "../app/lib/actions/fundtransfer";
import { useState } from "react";

export const FundTranser = () => {
    const [senderWallet, setSenderWallet] = useState<string>("");
    const [receiverWallet, setReceiverWallet] = useState<string>("");
    const [currency, setCurrency] = useState<string>("SOL");
    const [amount, setAmount] = useState<number>(0);
    const currencies = [{key: '1', value: 'SOL'},{key: '2', value: 'USDT'}];
    return <Card title="Fund Transfer">
        <div>
            <TextInput label="Sender Wallet Address" placeholder="Sender Wallet Address" value={senderWallet} onChange={(value) => {setSenderWallet(value)}} />
            <TextInput label="Receiver Wallet Address" placeholder="Receiver Wallet Address" value={receiverWallet} onChange={(value) => {setReceiverWallet(value)}} />
            <Select label="Currency" options={currencies} onSelect={(value) => setCurrency(value)}></Select>
            <TextInput label="Amount" placeholder="Amount" value={amount.toString()} onChange={(value) => {setAmount(Number(value))}} />
            <div className="flex justify-center pt-4">               
                <Button onClick={async () => {
                    const res = await addTransaction(senderWallet, receiverWallet, currencies.find(currencies => currencies.key === currency)?.value || 'SOL', amount as number)
                    console.log(res);
                    if(res) {
                        toast.success("Fund transfered successfully");
                        setSenderWallet("");
                        setReceiverWallet("");
                        setAmount(0);
                    } else {
                        toast.error("Something went wrong");
                    }
                }}>Transfer Fund</Button>
            </div> 
        </div>
    </Card>
}