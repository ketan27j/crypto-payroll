"use server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { SaveTransactions } from "./solana/salaryTransaction";

export async function transferFund(senderWallet: string,receiverWallet: string,currecy: string,amount: number,signature: string) {
    try{
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return null;
        }
        const userId = Number(session.user.id); 
        const user = await prisma.client.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return null;
        }
        //Transfer fund
        // const transaction = await prisma.transaction.create({
        // data: {
        //     senderWallet: senderWallet,
        //     receiverWallet: receiverWallet,
        //     currency: currecy,
        //     amount:amount,
        //     signature: signature,
        //     userId: userId
        // },
        // });
        // return transaction;
        // SaveTransactions()
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    