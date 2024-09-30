"use client"
import { Reclaim } from '@reclaimprotocol/js-sdk';
import QRCode from "react-qr-code";
import { getEmployeeByUserId, getReclaimAppCallbackUrl, getReclaimAppSecret, updateEmployeeWallet } from '../../lib/actions/employee';

import { useEffect, useState } from "react";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useWallet } from "@solana/wallet-adapter-react";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getSession } from 'next-auth/react';

export default function() {

    const [url, setUrl] = useState('')
    
    const [userWallet, setUserWallet] = useState<string>("");
    const wallet = useWallet();

    const APP_ID = "0xe04c9046f780d95F062f6Fd14B56f9025Bd6FDAA";
    const reclaimClient = new Reclaim.ProofRequest(APP_ID)

 
    const FundTranser = () => {
        useEffect(() => {
            const publicKey = wallet.publicKey ? wallet.publicKey.toString() : "";
            console.log('useEffect', publicKey);
            setUserWallet(publicKey);
        }, [wallet.publicKey]);
        return (
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 pt-2">Sender Wallet Address</label>
            <div className="flex gap-4">
                <input onChange={(e) => {setUserWallet(e.target.value)}} value={userWallet} type="text" id="txtSendWallet" 
                    className="flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-3/5" 
                    placeholder="Sender Wallet Address"/>
                </div>
            </div>
        )
    
    }    
    
    async function generateVerificationRequest() {
        console.log('userWallet', userWallet);
        const session = await getSession();
        
        const providerId = 'f9f383fd-32d9-4c54-942f-5e9fda349762'

        reclaimClient.addContext(
            (`${userWallet}`),
            (`${session?.user?.email}`),
        )

        await reclaimClient.buildProofRequest(providerId)

        const reclaimSecret = await getReclaimAppSecret();
        reclaimClient.setSignature(
            await reclaimClient.generateSignature( 
                reclaimSecret
            )
        )

        let callbackUrl = await getReclaimAppCallbackUrl();
        console.log('callbackUrl', callbackUrl);
        // reclaimClient.setAppCallbackUrl('https://crypto-payroll-web.vercel.app/api/profile/zkproof?obj=3tm34k590u8t')
        // reclaimClient.setAppCallbackUrl(callbackUrl);
 
        const { requestUrl, statusUrl } = await reclaimClient.createVerificationRequest();
   
        setUrl(requestUrl)

        await reclaimClient.startSession({
            onSuccessCallback: async (proofs: any[]) => {
              console.log('Verification success', proofs)
              /*
                {
                    "identifier": "0x8f4e366862d734a042563e3fd42139bad25de74ace56cc8752bc49bea6f243b9",
                    "claimData": {
                        "provider": "http",
                        "parameters": "{\"body\":\"\",\"geoLocation\":\"\",\"method\":\"POST\",\"paramValues\":{\"email\":\"\\\"alokjha.sg@gmail.com\\\"\"},\"responseMatches\":[{\"type\":\"contains\",\"value\":\"{{email}}\"}],\"responseRedactions\":[{\"jsonPath\":\"$.2\",\"regex\":\"(.*)\",\"xPath\":\"\"}],\"url\":\"https://developers.google.com/_d/profile/user\"}",
                        "owner": "0x0c2dcf3550d3677a1a8dd605ebb18226270252dd",
                        "timestampS": 1727667196,
                        "context": "{\"contextAddress\":\"walletPublicKey: AKZzQ4yWNycMQVxPni8UtkPSkWqu6chj5DuTfdnNCY82\",\"contextMessage\":\"userEmail: employee1@test.com\",\"extractedParameters\":{\"email\":\"\\\"alokjha.sg@gmail.com\\\"\"},\"providerHash\":\"0x548471f3fd8c3112173579c983ea9350434dd406da8b494a196bdc577e1f319c\"}",
                        "identifier": "0x8f4e366862d734a042563e3fd42139bad25de74ace56cc8752bc49bea6f243b9",
                        "epoch": 1
                    },
                    "witnesses": [
                        {
                            "id": "0x244897572368eadf65bfbc5aec98d8e5443a9072",
                            "url": "wss://witness.reclaimprotocol.org/ws"
                        }
                    ],
                    "signatures": [
                        "0x441ccf4577f5e0574ae8cab4df23bbece41916c94302846128715147e78057fe005d8f6307a86e190f72abdd4d3da859d5e91cd205c826287bbb3385d9638c611c"
                    ]
                }
              */
              const context: string = proofs[0].claimData.context;
              let contextObj = JSON.parse(context);
              const walletKey = contextObj.contextAddress;
              const userEmail = contextObj.contextMessage;
              console.log('proofs[0].claimData.context', proofs[0].claimData.context)
              console.log('walletKey', walletKey)
              console.log('userEmail', userEmail)
              await updateEmployeeWallet(walletKey);
            },
            onFailureCallback: error => {
              console.error('Verification failed', error)
            }
          })
    }
    
    return <div className="w-full">
        <div className="text-3xl text-black pt-8 mb-8 font-bold">
            My Profile
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div className="w-full">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>
                    {!url && (
                        <button onClick={generateVerificationRequest}
                        className={`px-4 py-2 rounded-md text-white bg-gray-800 hover:bg-gray-700`}
                        >
                        Create Claim QrCode
                        </button>
                    )}
                    {!userWallet && <FundTranser></FundTranser>
                    }
                    {url && (
                        <>
                            <QRCode value={url} />
                            <hr />
                            <a href={url} >Take me to external website for verification</a>
                        </>
                    )}
                </div>
                <div>
                    <ConnectionProvider endpoint={process.env.SOLANA_ENDPOINT || "https://api.devnet.solana.com"}>
                        <WalletProvider wallets={[]} autoConnect>
                            <WalletModalProvider>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: 20 }}>
                                    <WalletMultiButton />
                                    <WalletDisconnectButton />
                                </div>
                            </WalletModalProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                </div>
            </div>
        </div>
    </div>
}