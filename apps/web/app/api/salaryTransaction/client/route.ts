import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import { getEmployeesForClient } from "../../../lib/actions/solana/salaryTransaction";

export async function GET(req: any, res: any) {
    console.log('req.query: clientId', req.nextUrl.searchParams.get('clientId'));
    let clientId = req.nextUrl.searchParams.get('clientId');
    let transactions = await getEmployeesForClient(clientId);
    return NextResponse.json({
        transactions: transactions
    });
}