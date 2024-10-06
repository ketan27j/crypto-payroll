"use client"
import { FundTranser } from "../../../components/FundTransfer";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function() {
    return <div className="w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div className="w-full">
            <ConnectionProvider endpoint={process.env.SOLANA_ENDPOINT || "https://api.devnet.solana.com"}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        
                        <FundTranser></FundTranser>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
            </div>
        </div>
    </div>
}