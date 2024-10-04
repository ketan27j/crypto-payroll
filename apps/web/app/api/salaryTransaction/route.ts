import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export async function GET(req: any, res: any) {
    const session = await getServerSession(authOptions);
 
    console.log('req.query: clientId', req.nextUrl.searchParams.get('clientId'));
    
    if (session) {
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}