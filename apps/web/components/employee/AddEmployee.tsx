"use client"
import React, { useEffect, useState } from 'react'
import { TextInput } from "@repo/ui/textInput"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card";
import { toast } from "react-hot-toast"

import * as anchor from "@coral-xyz/anchor";
import { Program, Idl } from "@coral-xyz/anchor";
// import { SolTransfer } from "../target/types/sol_transfer";
import { SolTransfer } from '../../app/lib/actions/solana/scOutput/sol_transfer';
import { FirstSc } from '../../app/lib/actions/solana/scOutput/first_sc';
import idl from '../../app/lib/actions/solana/scOutput/sol_transfer.json';
import fs_idl from '../../app/lib/actions/solana/scOutput/first_sc.json';
import { useWallet, useAnchorWallet, useConnection, ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';

import {
  Provider,
  BN,
  web3,
} from '@project-serum/anchor';
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

export const AddEmployee = () => {
    const [step, setStep] = useState(1)
    let defaultEmp: EmployeeInfo = {
        id: 0,
        name: '',
        email: '',
        designation: '',
        functionalTitle: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        taxJurisdiction: '',
        salary: 1,
        allowances: 0,
        wallet: '',
        isActive: false,
        clientId: 0,
    };
    const [employeeData, setEmployeeData] = useState(defaultEmp);
    const [employeeState, setEmployeeState] = useRecoilState(employeeAddState);

    const handleChange = (field: string, value: string) => {
        setEmployeeData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-4">Basic Info</h2>
                        <TextInput label="Name" placeholder="Full Name" value={employeeData.name || ''} onChange={(value) => handleChange('name', value)} />
                        <TextInput label="Email" placeholder="Email Address" value={employeeData.email || ''} onChange={(value) => handleChange('email', value)} />
                        <TextInput label="Designation" placeholder="Software Engineer" value={employeeData.designation || ''} onChange={(value) => handleChange('designation', value)} />
                        <TextInput label="Functional Title" placeholder="AVP" value={employeeData.functionalTitle || ''} onChange={(value) => handleChange('functionalTitle', value)} />
                    </>
                )
            case 2:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-4">Employee Details</h2>
                        <TextInput label="Address Line 1" placeholder="Address Line 1" value={employeeData.addressLine1 || ''} onChange={(value) => handleChange('addressLine1', value)} />
                        <TextInput label="Address Line 2" placeholder="Address Line 2" value={employeeData.addressLine2 || ''} onChange={(value) => handleChange('addressLine2', value)} />
                        <TextInput label="City" placeholder="City" value={employeeData.city || ''} onChange={(value) => handleChange('city', value)} />
                        <TextInput label="State" placeholder="State" value={employeeData.state || ''} onChange={(value) => handleChange('state', value)} />
                        <TextInput label="Country" placeholder="Country" value={employeeData.country || ''} onChange={(value) => handleChange('country', value)} />
                        <TextInput label="Tax Jurisdiction" placeholder="Tax Jurisdiction" value={employeeData.taxJurisdiction || ''} onChange={(value) => handleChange('taxJurisdiction', value)} />
                    </>
                )
            case 3:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-4">Compensation Info</h2>
                        <TextInput type='number' label="Salary" placeholder="Salary" value={employeeData.salary || 1} onChange={(value) => handleChange('salary', value)} />
                        <TextInput type='number' label="Allowances" placeholder="Allowances" value={employeeData.allowances || 0} onChange={(value) => handleChange('allowances', value)} />
                    </>
                )
        }
    }

      const validateForm = (): boolean => {
          const result = employeeSchema.safeParse(employeeData);
        
          if (!result.success) {
            const errors = result.error.issues.map(issue => issue.message);
            toast.error(errors.join("\n"));
            return false;
          }
        
          return true;
        };

        const TransactSol = () => {
            const [isAvail, setIsAvail] = useState(false);
            // const wallet = useWallet();
            // const senderPublicKey = wallet.publicKey ? wallet.publicKey.toString() : "";
            // if(senderPublicKey === "") {
            //     return;
            // }
            // console.log('wallet.pubkey', wallet.publicKey);
            if(isAvail){

                    //const { connection } = useConnection();
                    //const wallet = useAnchorWallet();
                    const wallet = useWallet();
                    const programID = new PublicKey("ASJnMsrKFMabohWooSYUZMkrzyaG5CLMiDBAbjY43uVM")
                    // const wallet = window.solana;
                    const network = clusterApiUrl("devnet")
                    const connection = new Connection(network, {});
                    // const provider = new Provider(connection, wallet, opts.preflightCommitment);
                    const provider = new anchor.AnchorProvider(connection, wallet, {});
                    anchor.setProvider(provider);
                    // const program = new Program(idl, programID, provider) as Program<SolTransfer>;
                    const program = new Program(idl, provider) as Program<SolTransfer>;

                    
                    // const provider = new anchor.AnchorProvider(connection, wallet, {});
                    // anchor.setProvider(provider);
                    // const program = new Program(idl as Idl, provider) as Program<SolTransfer>; 
                
                    const sender: PublicKey = new PublicKey(
                    "AKZzQ4yWNycMQVxPni8UtkPSkWqu6chj5DuTfdnNCY82"
                    );
                    const receiver: PublicKey = new PublicKey(
                    "2R3u2kQYyhTjaXCRuXnHvbQ2um2JmTCEr6TfHsu7BZ5R"
                    );
                    // const initialSenderBalance = await provider.connection.getBalance(sender);
                    // const initialReceiverBalance = await provider.connection.getBalance(
                    // receiver
                    // );
                    // console.log("Initial sender balance:", initialSenderBalance);
                    // console.log("Initial receiver balance:", initialReceiverBalance);
                    const amount = new anchor.BN(1e8);
                    const scheduledTime = new anchor.BN(Date.now() / 1000 + 60);
                
                    const localAccount = new web3.Keypair();
                    // const tx = await program.methods
                    //         .transferSol(amount, scheduledTime)
                    //         .accounts({
                    //             sender: wallet.publicKey,
                    //             receiver: receiver,
                    //             systemProgram: web3.SystemProgram.programId,
                    //         })
                    //         .signers([localAccount])
                    //     .rpc();

                    // const tx = await program.rpc.transferSol(amount, scheduledTime, {
                    //     accounts: {
                    //         sender: sender,
                    //         receiver: receiver,
                    //         systemProgram: SystemProgram.programId,
                    //     },
                    //     signers: [localAccount],
                    // });
                
                    // const tx = await program.methods.initialize()
                    // .accounts({
                    //     newAccount: localAccount.publicKey,
                    //     signer: wallet.publicKey,
                    //     systemProgram: web3.SystemProgram.programId,
                    //   })
                    //   .signers([localAccount])
                    //   .rpc();
                    // const finalSenderBalance = await provider.connection.getBalance(sender);
                    // const finalReceiverBalance = await provider.connection.getBalance(receiver);
                    // console.log("Final sender balance:", finalSenderBalance);
                    // console.log("Final receiver balance:", finalReceiverBalance);
                
                    // console.log("Your transaction signature", tx);
                
                    return (
                        <>
                            Transaction hash: 
                            {/* <button
                                onClick={async () => {
                                    const tx = await program.methods
                                        .transferSol(amount, scheduledTime)
                                        .accounts({
                                            sender: sender,
                                            receiver: receiver,
                                            systemProgram: web3.SystemProgram.programId,
                                        })
                                        .signers([localAccount])
                                    .rpc();

                                }}
                                className="text-white bg-gray-800 px-4 py-2 rounded-md flex-auto p-2 w-1/5">
                                click wallet send
                            </button> */}
                        </>
                    )
            }
            else {
                return (
                    
                <>
                    <Button onClick={() => setIsAvail(true)}> Initiate On Chain Transaction</Button>
                    
                </>
                )

            }
          }
          


    const CheckOnChainTransaction = () => {
        return (
            <>
                {/* <Button onClick={() => setIsAva()}> Initiate On Chain Transaction</Button> */}
                <div>
                <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
                    <WalletProvider wallets={[]} autoConnect>
                        <WalletModalProvider>
                            {/* <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: 20 }}>
                                <WalletMultiButton />
                                <WalletDisconnectButton />
                            </div> */}
                            {TransactSol()}
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
                </div>
            </>
        )
    }

    return (
        <Card title="Add Employee">
            <div className="max-w-4xl mx-auto p-4 w-full">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-6 py-8">
                        {CheckOnChainTransaction()}
                        {renderStep()}
                        <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
                            {step > 1 && (
                                <Button onClick={prevStep} 
                                // className="w-full sm:w-auto"
                                >
                                    Previous
                                </Button>
                            )}
                            {step < 3 ? (
                                <Button onClick={nextStep} 
                                // className="w-full sm:w-auto"
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    onClick={async () => {
                                        if (!validateForm()) return;
                                        const res = await addEmployee(employeeData);
                                        if (res) {
                                            toast.success("Employee added successfully");
                                            setEmployeeData(defaultEmp);
                                            setStep(1);
                                            setEmployeeState(employeeState + 1);
                                        } else {
                                            toast.error("Something went wrong");
                                        }
                                    }}
                                    // className="w-full sm:w-auto"
                                >
                                    Add Employee
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  designation: z.string().min(1, "Designation is required"),
  functionalTitle: z.string().min(1, "Functional title is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  taxJurisdiction: z.string().min(1, "Tax jurisdiction is required"),
  salary: z.string().min(1, "Salary is required").refine(val => !isNaN(Number(val)), "Salary must be a number"),
  allowances: z.string().min(1, "Allowances is required").refine(val => !isNaN(Number(val)), "Allowances must be a number"),
});

import { z } from "zod";import { addEmployee, EmployeeInfo } from '../../app/lib/actions/employee'
import { useRecoilState } from 'recoil'
import { employeeAddState } from '../../app/store/clientAddState'
import { IntitateTransactionOnChain, TransactSol } from '../../app/lib/actions/solana/programClient';

