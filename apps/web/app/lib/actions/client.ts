"use server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { type Client } from "@prisma/client";

export async function getClientDetails(): Promise<Client[]> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    try {
        const res = await prisma.client.findMany({
            where: {
                userId: userId
            }
        })
        return res;
    } catch(error) {
        console.log(error);
        return [];
    }
}

export async function addClient(name: string, email: string, number: string, password: string, wallet: string): Promise<boolean> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    console.log(userId);
    try {
        const res = await prisma.client.create({
            data: {
                userId: userId,
                name: name,
                email: email,
                number: number,
                password: password,
                wallet: wallet,
            }
        })
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
};

export async function deleteClient(id: number): Promise<boolean> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    try {
        if(userId == null) {
            return false;
        }
        await prisma.client.delete({
            where: {
                id: id
            }
        })
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}