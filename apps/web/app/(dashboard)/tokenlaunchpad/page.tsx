"use client"
import { CreateToken } from "../../../components/token/CreateToken";
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
                        {/* <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 20 }}>
                            <WalletMultiButton />
                            <WalletDisconnectButton />
                        </div> */}
                        <CreateToken></CreateToken>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
            </div>
        </div>
    </div>
}