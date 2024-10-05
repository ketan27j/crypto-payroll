"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { addClient } from "../../app/lib/actions/client";
import { toast } from "react-hot-toast"
import { clientAddState } from "../../app/store/clientAddState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { z } from "zod";

const addClientSchema = z.object({
    name: z.string().min(1, "Client name is required"),
    email: z.string().min(1, "Client email is required").email("Invalid email format"),
    number: z.string().min(1, "Mobile number is required")
                    .regex(/^[0-9]+$/, "Mobile number must contain only digits")
                    .min(10, "Mobile number must be at least 10 digits")
                    .max(15, "Mobile number must not exceed 15 digits"),
    password: z.string().min(1, "Currency is required"),
    wallet: z.string().min(1, "Wallet is required"),
  });

export const AddClient: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [wallet, setWallet] = useState<string>("");
    const [clientState, setClientState] = useRecoilState(clientAddState);
    const validateForm = () => {
        const result = addClientSchema.safeParse({
          name,
          email,
          number,
          password,
          wallet
        });
      
        if (!result.success) {
          const errors = result.error.issues.map(issue => issue.message);
          toast.error(errors.join("\n"));
          return false;
        }
           
        return true;
      };  
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        const res = await addClient(name, email, number, password, wallet);
        if(res) {
            toast.success("Client added successfully");
            setName("");
            setNumber("");
            setPassword("");
            setEmail("");
            setWallet("");
            setClientState(clientState+1);
            if (onClose) {
                onClose();
            }
        } else {
            toast.error("Something went wrong");
        }
    };

    return <Card title="Client Information">
        <div>
            <TextInput label="Name" placeholder="Name" value={name} onChange={(value) => {setName(value)}} />
            <TextInput label="Email" placeholder="Email" value={email || ""} onChange={(value) => {setEmail(value)}} />
            <TextInput label="Mobile" placeholder="Number" value={number || ""} onChange={(value) => {setNumber(value)}} />
            <TextInput label="Password" placeholder="Password" value={password || ""} onChange={(value) => {setPassword(value)}} />
            <TextInput label="Wallet" placeholder="Wallet" value={wallet || ""} onChange={(value) => {setWallet(value)}} />
            <div className="flex justify-center pt-4">               
                {/* <Button onClick={handleSubmit}>Add Client</Button> */}
                <button
                  onClick={handleSubmit} 
                  className={`px-4 py-2 rounded-md text-white bg-gray-800 hover:bg-gray-700`}>
                  Add Client
                </button>
            </div> 
        </div>
        </Card>
}