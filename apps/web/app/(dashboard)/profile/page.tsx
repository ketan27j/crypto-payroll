"use client"
import { Reclaim } from '@reclaimprotocol/js-sdk';
import { useState } from'react'
import QRCode from "react-qr-code";

export default function() {

    const [url, setUrl] = useState('')

    const APP_SECRET = "0x2705de8ba9fa5bbf43f28b8fc33fd4e73258e7d80322abad21689bed80bad1bd";
    const APP_ID = "0xe04c9046f780d95F062f6Fd14B56f9025Bd6FDAA";
    const reclaimClient = new Reclaim.ProofRequest(APP_ID)

    async function generateVerificationRequest() {
        const providerId = 'f9f383fd-32d9-4c54-942f-5e9fda349762' //TODO: replace with your provider ids you had selected while creating the application


        reclaimClient.addContext(
            (`user's address`),
            ('for acmecorp.com on 21st january')
        )

        await reclaimClient.buildProofRequest(providerId)


        reclaimClient.setSignature(
            await reclaimClient.generateSignature( // this is an MVP, you should not generate the signature on the frontend
                APP_SECRET //TODO : replace with your APP_SECRET
            )
        )

        const { requestUrl, statusUrl } = await reclaimClient.createVerificationRequest()
   
        setUrl(requestUrl)

        await reclaimClient.startSession({
            onSuccessCallback: proof => {
              console.log('Verification success', proof)
              //const data = proof.claimData.context.extractedParameters
              // Your business logic here
            },
            onFailureCallback: error => {
              console.error('Verification failed', error)
              // Your business logic here to handle the error
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
                        <button onClick={generateVerificationRequest}>
                        Create Claim QrCode
                        </button>
                    )}
                    {url && (
                        <>
                            <QRCode value={url} />
                            <hr />
                            <a href={url} >Take me to external website for verification</a>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
}