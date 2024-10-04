
"use client"
import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import '@solana/wallet-adapter-react-ui/styles.css';
import { useSession } from 'next-auth/react';
import { Reclaim } from '@reclaimprotocol/js-sdk';
import QRCode from "react-qr-code";
import { getEmployeeByUserId, getReclaimAppCallbackUrl, getReclaimAppSecret, updateEmployeeWallet } from '../../app/lib/actions/employee';
import { getSession } from 'next-auth/react';
import toast from "react-hot-toast";

export const WalletInfo = () => {
    const { publicKey, connect, connected } = useWallet();
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [showWalletConnect, setShowWalletConnect] = useState(false);
    const session = useSession();
    const wallet = useWallet();
    const { connection } = useConnection();
    const [url, setUrl] = useState('')
    const [successfullySaved, setSuccessfullySaved] = useState(false)

    const APP_ID = "0xe04c9046f780d95F062f6Fd14B56f9025Bd6FDAA";
    const reclaimClient = new Reclaim.ProofRequest(APP_ID)

    useEffect(() => {

        getEmployeeByUserId(session.data?.user?.email || '').then((res) => {
            if (res) {
                console.log('walletInfo length', res.wallet?.length);
                if(res.wallet && res.wallet.length > 31 && res.wallet.length < 45) {
                    setWalletAddress(res.wallet);
                }
                else {
                    setWalletAddress(null);
                    setShowWalletConnect(true);
                }
            }
        });
    }, []);

    const handleLinkWallet = () => {
        setShowWalletConnect(true);
    };

        
    async function generateVerificationRequest() {
        const session = await getSession();
        
        const providerId = 'f9f383fd-32d9-4c54-942f-5e9fda349762'

        reclaimClient.addContext(
            (`${walletAddress}`),
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
              toast.success("The new wallet address is successfully saved");
              setSuccessfullySaved(true);
              setUrl('');
            },
            onFailureCallback: error => {
              console.error('Verification failed', error)
            }
          })
    }

    return (
        <Card title="Set Wallet Address">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                <p className="font-bold">Important:</p>
                <p>The wallet address entered here will be used for your salary payments.</p>
            </div>
                <div>
                    <TextInput
                        label="Wallet Address"
                        value={walletAddress || ''}
                        readonly={false} 
                        placeholder={''} 
                        onChange={function (value: string): void {
                            setWalletAddress(value);
                        } }                
                    />
                    <br/>
                    {!url && walletAddress &&        
                    <Button onClick={generateVerificationRequest}>
                        Change (Requires Authentication)
                    </Button>
                    }
                    <br/>
                    {url && !successfullySaved && (
                        <>
                        <h3 className='mt-3 mb-3 font-bold'>Scan the QR code to verify your identity</h3>
                            <QRCode value={url} />
                        </>
                    )}
                    <br/>
                    {successfullySaved &&
                    <div className="bg-green-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                        <p>The new wallet address is successfully saved.</p>
                    </div>
                }
                </div>
        </Card>
    );
};