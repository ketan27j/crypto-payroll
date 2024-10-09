"use server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { SaveTransactions } from "./solana/salaryTransaction";

export async function transferFund(senderWallet: string,receiverWallet: string,
    currency: string,amount: number,signature: string): Promise<any> {
    try{
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return null;
        }
        const userId = Number(session.user.id); 
        const user = await prisma.client.findUnique({
            where: {
                userId: userId,
            },
        });
        if (!user) {
            return null;
        }
        // Transfer fund
        const transaction = await prisma.transaction.create({
        data: {
            senderUserId: userId,
            receiverUserId: userId, 
            senderWallet: senderWallet,
            receiverWallet: receiverWallet,
            currency: currency,
            amount:amount,
            signature: signature,
            createdBy: userId,
            userId: userId
        },
        });
        return transaction;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    