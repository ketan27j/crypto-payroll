"use server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { type Transaction } from "@prisma/client";

export async function addTransaction(
  senderWallet: string,
  receiverWallet: string,
  amount: number
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });
  if (!user) {
    return null;
  }
  const transaction = await prisma.transaction.create({
    data: {
      senderWallet: senderWallet,
      receiverWallet: receiverWallet,
      amount:amount,
      clientId: user.id,
    },
  });
  return transaction;
}