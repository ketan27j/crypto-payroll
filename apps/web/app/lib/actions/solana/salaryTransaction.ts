import { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ClientInfo, getClientDetails } from '../client';

const connection = new Connection(process.env.SOLANA_ENDPOINT as string || "https://api.devnet.solana.com");

export interface SalaryInfo {
    clientId: number;
    employeeId: number;
    employeeWallet: string;
    amount: number;
    date: string;
    isActive: Boolean;
    paymentStatus: string;
}

export async function getSalaryDetailsForClient (clientId: number): Promise<SalaryInfo[]> {
    let clients = await getClientDetails({id: Number(clientId)});
    if (!clients || clients.length === 0) {
        return [];
    }
    const clientInfo = clients[0];
    if(!clientInfo || !clientInfo.employees || clientInfo.employees.length === 0 || !clientInfo.wallet) {
        return [];
    }
    clientInfo.wallet = clientInfo.wallet ? clientInfo.wallet.toString() : '';
    let salaryDetails = getSalaryDetailsForEmployee(clientInfo);
    return salaryDetails;
};

function getSalaryDetailsForEmployee(clientInfo: ClientInfo): SalaryInfo[]  {
    console.log('clientInfo.wallet', clientInfo.wallet);
    let salaryTransactions: SalaryInfo[] = [];
    clientInfo.employees?.forEach(async (employee) => {
        if(!employee.wallet ||
            !employee.isActive
        ) {
            return;
        }
        salaryTransactions.push({
                employeeWallet: employee.wallet,
                amount: 0.0001,
                date: new Date().toString(),
                paymentStatus: 'Pending',
                isActive: employee.isActive,
                clientId: employee.clientId,
                employeeId: employee.id
            })
    });
    console.log('salaryTransactions', salaryTransactions);
    return salaryTransactions;
}

