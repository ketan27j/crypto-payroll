"use server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { type Client } from "@prisma/client";

export interface ClientInfo {
    id: number,
    email: string | null,
    name: string | null,
    wallet: string | null,
    isActive: Boolean | null,
    kycok: Boolean | null
}

export async function getClientDetails(): Promise<ClientInfo[]> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    try {
        const clients = await prisma.client.findMany({
            include: {
                user: true,
            }
        });
        console.log('clients', clients.length);
        const transformedClients: ClientInfo[] = clients.map(client => ({
            id: client.id,
            email: client.user.email,
            name: client.user.name,
            wallet: client.wallet,
            isActive: client.isActive,
            kycok: client.kycok
        }));      
        return transformedClients;
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

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: password,
                name: name,
                role: 'ClientAdmin',
                createdBy: userId
            }
          });
  
          console.log('New Client User: User Id: ' + newUser.id);
        const newClient = await prisma.client.create({
            data: {
                userId: newUser.id,
                wallet: wallet,
                kycok: true,
            }
        })

        console.log('Client created', newClient);

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