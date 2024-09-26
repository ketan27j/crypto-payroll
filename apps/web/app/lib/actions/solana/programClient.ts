"use server";

import * as anchor from "@coral-xyz/anchor";
import { Program, Idl } from "@coral-xyz/anchor";
// import { SolTransfer } from "../target/types/sol_transfer";
import { SolTransfer } from "./scOutput/sol_transfer";
import idl from './scOutput/sol_transfer.json';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

// import {
//   Program,
//   Provider,
//   BN,
//   web3,
// } from '@project-serum/anchor';
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

const opts = {
  preflightCommitment: "recent",
};

// const { SystemProgram } = web3
const programID = new PublicKey("ASJnMsrKFMabohWooSYUZMkrzyaG5CLMiDBAbjY43uVM")



export const IntitateTransactionOnChain = async () => {
    // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.solTransfer as Program<SolTransfer>;

  //const sender : PublicKey = new PublicKey("4L5XRZ1Qqn6mBMdBpG8abghXAP6Xva5aevoMnqnWKV2c");
  const sender: PublicKey = new PublicKey(
    "AGKjxBXB2YwPvcdqEZLzAbMCc5ytZ5CP2BpvuMxM8CGW"
  );
  const receiver: PublicKey = new PublicKey(
    "AKZzQ4yWNycMQVxPni8UtkPSkWqu6chj5DuTfdnNCY82"
  );

    // Check initial balances
    const initialSenderBalance = await provider.connection.getBalance(sender);
    const initialReceiverBalance = await provider.connection.getBalance(
      receiver
    );
    console.log("Initial sender balance:", initialSenderBalance);
    console.log("Initial receiver balance:", initialReceiverBalance);
    const amount = new anchor.BN(1e8);
    const scheduledTime = new anchor.BN(Date.now() / 1000 + 60);
    // Execute the transfer
    const tx = await program.methods
      .transferSol(amount, scheduledTime)
      .accounts({
        sender: sender,
        receiver: receiver,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    // Check final balances
    const finalSenderBalance = await provider.connection.getBalance(sender);
    const finalReceiverBalance = await provider.connection.getBalance(receiver);
    console.log("Final sender balance:", finalSenderBalance);
    console.log("Final receiver balance:", finalReceiverBalance);

    console.log("Your transaction signature", tx);

}

