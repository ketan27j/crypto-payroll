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
    console.log('zkproof POST req.query');
    console.log('zkproof POST req.body', req.body);
    const session = await getServerSession(authOptions);
 
    // const sessionId = req.nextUrl.searchParams.get('obj');
    // //const sessionId = req.query.callbackId
    // const proof = JSON.parse(decodeURIComponent(req.body))
   
    // const isProofVerified = await ReclaimClient.verifySignedProof(proof)
    // if (!isProofVerified) {
    //   return res.status(400).send({ message: 'Proof verification failed' })
    // }
   
    // const context = proof.claimData.context
    // const extractedParameterValues = proof.extractedParameterValues
    // TODO: Verify with the context depending on your business logic
    // TODO: Save the proof to your backend
   
    return res.status(200).send({ message: 'Proof verified' })
 
 
    // if (session) {
    //     return NextResponse.json({
    //         user: session.user,
    //         proof: 'ZKProof'
    //     })
    // }
    // return NextResponse.json({
    //     message: "You are not logged in"
    // }, {
    //     status: 403
    // })
}