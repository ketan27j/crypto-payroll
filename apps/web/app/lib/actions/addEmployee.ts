"use server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export interface EmployeeInfo {
    id: number,
    email: string | null,
    name: string | null,
    designation: string | null,
    functionalTitle: string | null,
    wallet: string | null,
    salary: number,
    allowances: number,
    isActive: Boolean | null,
    clientId: number
}

export async function addEmployee(employeeInfo: EmployeeInfo) {
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
        const transaction = await prisma.employee.create({
        data: {
            email: employeeInfo.email,
            name: employeeInfo.name,
            designation: employeeInfo.designation,
            functionalTitle: employeeInfo.functionalTitle,
            salary: employeeInfo.salary,
            allowances: employeeInfo.allowances,
            clientId: user.id,
            createdBy: user.id
        },
        });
        return transaction;
        } catch (error) {
            console.log(error);
            return null;
        }
    }    

export async function getAllEmployees(): Promise<EmployeeInfo[] | null> {
  try {
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

    const employees = await prisma.employee.findMany({
      where: {
        clientId: user.id,
      },
    });

    const transformedEmployees: EmployeeInfo[] = employees.map(employee => ({
      id: employee.id,
      email: employee.email,
      name: employee.name,
      designation: employee.designation,
      functionalTitle: employee.functionalTitle,
      wallet: '', // Assuming wallet is not in the Prisma model, we'll set it as an empty string
      salary: employee.salary,
      allowances: employee.allowances,
      isActive: employee.isActive,
      clientId: employee.clientId
    }));

    return transformedEmployees;
  } catch (error) {
    console.log(error);
    return null;
  }
}