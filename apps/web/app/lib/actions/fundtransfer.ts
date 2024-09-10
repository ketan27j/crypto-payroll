"use server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { type Transaction } from "@prisma/client";

export async function addTransaction(senderWallet: string,receiverWallet: string,currecy: string,amount: number) {
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
    const transaction = await prisma.transaction.create({
    data: {
        senderWallet: senderWallet,
        receiverWallet: receiverWallet,
        currency: currecy,
        amount:amount,
        clientId: userId
    },
    });
    return transaction;
} catch (error) {
    console.log(error);
    return null;
}
}