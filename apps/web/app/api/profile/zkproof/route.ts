import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";

export async function GET(req: NextRequest, res: any) {
    const session = await getServerSession(authOptions);
    console.log('req.query', req.nextUrl.searchParams.get('obj'));
    
    console.log(`APP_URL: ${process.env.APP_URL}`);
    let to = 'decentralizedappengineering@gmail.com';
    let app_url = process.env.APP_URL || 'http://localhost:3000';
    // sendEmail(to, "Dapp Admin", "Welcome to Dapp - Complete Onboarding", "<h1> Congratulations!! You are just one step away from onboarding to DApp!! </h1>", 
    //   app_url);
    
    // sendViaBrevo();

    if (session) {
        return NextResponse.json({
            user: session.user,
            proof: 'ZKProof'
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}

export async function POST(req: NextRequest, res: any) {
    const session = await getServerSession(authOptions);
    console.log('zkproof POST req.query', req.nextUrl.searchParams.get('obj'));
    console.log('zkproof POST req.body', req.body);
    if (session) {
        return NextResponse.json({
            user: session.user,
            proof: 'ZKProof'
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}