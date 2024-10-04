"use client"
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput";
import { Select } from "@repo/ui/select";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { checkValidWallet, getBalance, getFeePayerKeyPair, paySalary, transferSol } from "../../app/lib/actions/solanaOps";
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { getSalaryDetailsForClient, SalaryInfo } from '../../app/lib/actions/solana/salaryTransaction';

export const WalletConnector = () => {
    const { connection } = useConnection();
    const [senderWallet, setSenderWallet] = useState<string>("");
    const [senderBalance, setSenderBalance] = useState<string>('');
    const [receiverWallet, setReceiverWallet] = useState<string>("");
    const [receiverWalletIsValid, setReceiverWalletIsValid] = useState<boolean>(false);
    const [currency, setCurrency] = useState<string>("SOL");
    const [amount, setAmount] = useState<string>("0");
    const [isLoading, setIsLoading] = useState(false);
    const wallet = useWallet();
    const [totalToPay, setTotalToPay] = useState<string>('');
    const [salaryDetails, setSalaryDetails] = useState<SalaryInfo[]>([]);
    
    useEffect(() => {
        const senderPublicKey = wallet.publicKey ? wallet.publicKey.toString() : "";
        setSenderWallet(senderPublicKey);
        setSenderBalance('');
    }, [wallet.publicKey]);
    const currencies = [{key: '1', value: 'SOL'}];

    const handlePaySalary = async () => {
        // let transaction = await generateSolanaTransactionForSalaryPayment(connection, wallet);
        // console.log('transaction', transaction);
        await paySalary(connection, wallet, salaryDetails)
    }

    const getWalletBalance = async () => {
        const balance = await getBalance(connection,senderWallet);
        setSenderBalance(balance?.toString());
    }

    const getTotalSalaryToPay = async () => {
        let totalSalaryToPay = 0;
        const salaryDetails = await getSalaryDetailsForClient(2);
        setSalaryDetails(salaryDetails);
        salaryDetails.forEach((salaryInfo: any) => {
            totalSalaryToPay += salaryInfo.amount;
        });
        setTotalToPay(totalSalaryToPay?.toString());
    }

    return <Card title="Salary Payment">
        <div>
            {senderWallet && <label className="block mb-2 text-lg font-medium text-gray-900 pt-2">Sender Wallet Address</label>}
            {!senderWallet && <label className="block mb-2 text-lg font-medium text-gray-900 pt-2">Connect Your Wallet to Pay Salary</label>}            
            <div className="flex gap-4">
                <input 
                    onChange={(e) => {setSenderWallet(e.target.value)}} 
                    value={senderWallet} 
                    type="text" 
                    id="txtSendWallet" 
                    className="flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 w-4/5 h-12"
                    placeholder="Sender Wallet Address"
                />
            </div>
            <div className="flex pt-4">               
                <button 
                    className="w-1/3 px-4 py-2 bg-[#91629b] text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-colors duration-200"
                    disabled={isLoading} 
                    onClick={getWalletBalance}
                    >
                    Get Wallet Balance
                </button>
                {senderBalance && <span className="flex text-md font-semibold text-gray-700flex-auto p-2 w-1/5 items-center">{senderBalance.toString()} SOL</span>}
            </div>            
            <div className="flex pt-4">               
                <button 
                className="w-1/3 px-4 py-2 bg-[#91629b] text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-colors duration-200"
                disabled={isLoading} onClick={getTotalSalaryToPay}>Get Summary</button>
                {/* {totalToPay && <span className="flex text-md font-semibold text-gray-700flex-auto p-2 w-2/5 items-center">{totalToPay.toString()} SOL</span>} */}
            </div>
            <div>
                
            </div>
            {totalToPay && 
            <div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">Salary Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                      <p className="text-sm font-medium text-gray-500 mb-1">Total Employees</p>
                      <p className="text-3xl font-extrabold text-purple-700">{salaryDetails.length}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                      <p className="text-sm font-medium text-gray-500 mb-1">Total Amount to Pay</p>
                      <p className="text-3xl font-extrabold text-purple-700">{Number(totalToPay).toFixed(2)} <span className="text-lg">SOL</span></p>
                      <p className="text-md font-extrabold text-purple-700">{Number(totalToPay).toFixed(5)} <span className="text-lg">Lamports</span></p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                      <p className="text-sm font-medium text-gray-500 mb-1">Active Employees</p>
                      <p className="text-3xl font-extrabold text-purple-700">{salaryDetails.filter(employee => employee.isActive).length}</p>
                  </div>
              </div>
          </div>
              <div className="flex justify-end pt-4 mt-10">               
                  <button 
                    className="w-full px-4 py-2 bg-[#91629b] text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-75 transition-colors duration-200"
                    disabled={isLoading} 
                    onClick={handlePaySalary}
                  >
                    Pay Salary
                  </button>
            </div> 

              </div>
          }

</div>
  </Card>
}

export default function() {
    return <div className="w-full">
        <div className="grid p-4">
            <div className="w-full md:w-2/3 mx-auto">
                <ConnectionProvider endpoint={process.env.SOLANA_ENDPOINT || "https://api.devnet.solana.com"}>
                    <WalletProvider wallets={[]} autoConnect>
                        <WalletModalProvider>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: 20 }}>
                                <WalletMultiButton />
                                <WalletDisconnectButton />
                            </div>
                            <WalletConnector></WalletConnector>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </div>
        </div>
    </div>
}