"use server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { sendNotification } from "./notification";

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
  clientId: number,
  addressLine1: string | null,
  addressLine2: string | null,
  city: string | null,
  state: string | null,
  country: string | null,
  taxJurisdiction: string | null,
}

export async function addEmployee(employeeInfo: EmployeeInfo) {
  console.log('Adding new employee in lib function')
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return null;
    }
    const userId = Number(session.user.id);
    console.log('userId', userId);
    const client = await prisma.client.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      }
    });
    console.log('client', client);
    if (!client) {
      return null;
    }
    const newUser = await prisma.user.create({
      data: {
        email: employeeInfo.email,
        password: 'test',
        name: employeeInfo.name,
        role: 'Employee',
        createdBy: client.userId
      }
    });
    const employee = await prisma.employee.create({
      data: {
        designation: employeeInfo.designation,
        functionalTitle: employeeInfo.functionalTitle,
        salary: Number(employeeInfo.salary),
        allowances: Number(employeeInfo.allowances),
        clientId: client.id,
        createdBy: client.userId,
        userId: newUser.id,
      }
    });
    console.log('employeed created', employee);
    let to = employeeInfo.email || 'decentralizedappengineering@gmail.com';
    let receiverName = employeeInfo.name || 'There';
    let subject = `Welcome to ${client.user.name} - Please Complete Onboarding`;
    let body = `<h1> Congratulations!! You are just one step away from onboarding to ${client.user.name}! </h1>`;
    let redirect_url = `${(process.env.NEXTAUTH_URL || 'http://localhost:3000')}/api/auth/signin`;

    let htmlContent = `
        <html>
          <body>
            ${body}
            <br><br>
            Click on link below and follow the steps to complete your onboarding:
            <br>
            1. Enter your email and password as "test" to login
            <br>
            2. Navigate to Profile
            <br>
            3. Change your password under Settings tab
            <br>
            4. Verify your info under Basic Info tab
            <br>
            5. Set your wallet address where you want to receive your salary unders Wallet Info tab
            <br><br>
            <a href="${redirect_url}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Complete Onboarding</a>
          </body>
        </html>
      `;
    sendNotification(to, receiverName, subject, htmlContent, redirect_url);
    console.log('Email sent to', to);
    return employee;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllEmployees(): Promise<EmployeeInfo[]> {
  try {
    const session = await getServerSession(authOptions);
    console.log('session', session);
    if (!session?.user) {
      return [];
    }

    const userId = Number(session.user.id);
    console.log('userId', userId);
    let userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    let whereClause = {};
    if (userInfo && userInfo.role !== 'Admin') {
      whereClause = {
        client: {
          userId: userId,
        },
      };
    }
    const employees = await prisma.employee.findMany({
      where: whereClause,
      include: {
        client: {
          include: {
            user: true,
          },
        },
        user: true
      },
    });
    console.log('employees', employees);
    const transformedEmployees: EmployeeInfo[] = employees.map(employee => ({
      id: employee.id,
      email: employee.user.email,
      name: employee.user.name,
      designation: employee.designation,
      functionalTitle: employee.functionalTitle,
      wallet: employee.wallet,
      salary: employee.salary,
      allowances: employee.allowances || 0,
      isActive: employee.isActive,
      clientId: employee.clientId,
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      taxJurisdiction: '',
    }));

    return transformedEmployees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}

export async function getReclaimAppCallbackUrl(): Promise<string> {
  console.log('getReclaimAppCallbackUrl', process.env.RECLAIM_CALLBACK_URL);
  return process.env.RECLAIM_CALLBACK_URL || '';
}




export async function updateEmployeeWallet(wallet: string): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return false;
    }

    const userId = Number(session.user.id);
    const emps = await prisma.employee.findMany({
      where: {
        userId: userId
      },
    });

    console.log('updating wallet of employeeId: ', emps[0]?.id);
    const updatedEmployee = await prisma.employee.update({
      where: {
        id: emps[0]?.id,
      },
      data: {
        wallet: wallet,
        updatedAt: new Date()
      },
    });

    return !!updatedEmployee;
  } catch (error) {
    console.error('Error updating employee wallet:', error);
    return false;
  }
}

export async function getEmployeeByUserId(email: string): Promise<EmployeeInfo | null> {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userInfo) {
      return null;
    }

    const employees = await prisma.employee.findMany({
      where: {
        userId: userInfo.id,
      },
      include: {
        user: true,
        client: true,
      },
    });
    if (!employees || employees.length === 0) {
      return null;
    }
    const employee = employees[0];
    if (!employee) {
      return null;
    }

    const employeeInfo: EmployeeInfo = {
      id: employee.id,
      email: employee.user.email,
      name: employee.user.name,
      designation: employee.designation,
      functionalTitle: employee.functionalTitle,
      wallet: employee.wallet,
      salary: employee.salary,
      allowances: employee.allowances || 0,
      isActive: employee.isActive,
      clientId: employee.clientId,
      addressLine1: null,
      addressLine2: null,
      city: null,
      state: null,
      country: null,
      taxJurisdiction: null,
    };

    return employeeInfo;
  } catch (error) {
    console.error('Error fetching employee:', error);
    return null;
  }
}

export async function getReclaimAppSecret(): Promise<string> {
  console.log('getReclaimAppSecret', process.env.RECLAIM_APP_SECRET);
  return process.env.RECLAIM_APP_SECRET || '';
}