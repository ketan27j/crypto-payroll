"use server";
import { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ClientInfo, getClientDetails } from '../client';

import { PrismaClient } from '@prisma/client';

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";

const prisma = new PrismaClient();
const connection = new Connection(process.env.SOLANA_ENDPOINT as string || "https://api.devnet.solana.com");

export interface TransactionInfo {
  SenderUserId: number;
  ReceiverUserId: number;
  SenderWallet: string;
  ReceiverWallet: string;
  Amount: number;
  Currency: string;
  Signature: string;
  CreatedBy: number;
}

export interface TransactionInfoDto {
    SenderUserId: number;
    ReceiverUserId: number;
    SenderWallet: string;
    ReceiverWallet: string;
    Amount: number;
    Currency: string;
    Signature: string;
    CreatedBy: number;
    Date: Date;
    Sender: {
        id: number;
        name: string;
        email: string;
        role: string;
    },
    Receiver: {
        id: number;
        name: string;
        email: string;
        role: string;
    }
  }

export interface SalaryInfo {
    clientId: number;
    employeeId: number;
    employeeWallet: string;
    amount: number;
    date: string;
    isActive: Boolean;
    paymentStatus: string;
    senderUserId: number;
    receiverUserId: number;
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
                amount: employee.salary,
                date: new Date().toString(),
                paymentStatus: 'Pending',
                isActive: employee.isActive,
                clientId: employee.clientId,
                employeeId: employee.id,
                senderUserId: clientInfo.userId,
                receiverUserId: employee.userId
            })
    });
    console.log('salaryTransactions', salaryTransactions);
    return salaryTransactions;
}

export async function SaveSalaryTransaction(clientInfo: any, salaryPayments: SalaryInfo[],
    transactionSignature: string,
    currentUserId: number) {
        let salaryTransactions = generateSalryTransactionDetailsForClient(clientInfo, 
            salaryPayments, 
            transactionSignature,
        currentUserId);
        SaveTransactions(salaryTransactions);
}

function generateSalryTransactionDetailsForClient(clientInfo: ClientInfo, salaryPayments: SalaryInfo[],
    transactionSignature: string, createdBy: number
): TransactionInfo[]  {
    console.log('clientInfo.wallet', clientInfo.wallet);
    let salaryTransactions: TransactionInfo[] = [];
    salaryPayments.forEach(async (payment) => {
        if(!clientInfo.wallet
        ) {
            return;
        }
        salaryTransactions.push({
                SenderUserId: payment.senderUserId,
                ReceiverUserId: payment.receiverUserId,
                SenderWallet: clientInfo.wallet,
                ReceiverWallet: payment.employeeWallet,
                Amount: payment.amount,
                Currency: 'SOL',
                Signature: transactionSignature,
                CreatedBy: createdBy
            });
    });
    console.log('salaryTransactions', salaryTransactions);
    return salaryTransactions;
}

export async function SaveTransactions(transactions: TransactionInfo[]) {
  try {
    
    await prisma.transaction.createMany({
      data: transactions.map(transactionInfo => ({
        senderUserId: transactionInfo.SenderUserId,
        receiverUserId: transactionInfo.ReceiverUserId,
        senderWallet: transactionInfo.SenderWallet,
        receiverWallet: transactionInfo.ReceiverWallet,
        amount: transactionInfo.Amount,
        currency: transactionInfo.Currency,
        signature: transactionInfo.Signature,
        createdBy: transactionInfo.CreatedBy,
        userId: transactionInfo.CreatedBy
      })),
    });
    console.log('Transaction saved successfully');
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}



export async function getTransactionsBySenderId(userId: number): Promise<TransactionInfoDto[]> {
  try {
    console.log('getTransactionsBySenderId:userId', userId);
    const transactions = await prisma.transaction.findMany({
      where: {
        senderUserId: userId
      }
    });
    console.log('transactions', transactions.length);
        const funcDefinition = async (transaction: any): Promise<TransactionInfoDto> => {
                let receiver = await prisma.user.findUnique({
                    where: {
                        id: transaction.receiverUserId
                    }
                });
                let sender = await prisma.user.findUnique({
                    where: {
                        id: transaction.senderUserId
                    }
                });
                let newObj: TransactionInfoDto = {
                    SenderUserId: transaction.senderUserId,
                    ReceiverUserId: transaction.receiverUserId,
                    SenderWallet: transaction.senderWallet || '',
                    ReceiverWallet: transaction.receiverWallet || '',
                    Amount: Number(transaction.amount),
                    Currency: transaction.currency,
                    Signature: transaction.signature,
                    CreatedBy: transaction.createdBy,
                    Date: transaction.createdAt,
                    Receiver: {
                        id: receiver?.id || 0,
                        name: receiver?.name || '',
                        email: receiver?.email || '',
                        role: receiver?.role || ''
                    },
                    Sender: {
                        id: sender?.id || 0,
                        name: sender?.name || '',
                        email: sender?.email || '',
                        role: sender?.role || ''
                    }
                };
                return newObj;
                //finalTransaction.push();
        }
        let fs: TransactionInfoDto[] = [];
        for(let item of transactions) {
            fs.push(await funcDefinition(item));
        }
        return fs;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
