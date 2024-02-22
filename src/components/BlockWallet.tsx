'use client'
import { FC, useState, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createTransferInstruction, createFreezeAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID, createTransferCheckedInstruction } from '@solana/spl-token';
import { Signer, Keypair, PublicKey, SystemProgram, sendAndConfirmTransaction, Transaction, TransactionSignature } from '@solana/web3.js';
import bs58 from 'bs58';
import { Metadata, PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { notify, makeSecretKey } from "../utils/notifications";

export const BlockWallet: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [ walletAddress, setWalletAddress] = useState('');
  const [ tokenAddress, setTokenAddress ] = useState('');
  const blockWallet = useCallback(async (form) => {
      if (!publicKey) {
          notify({ type: 'error', message: `Wallet not connected!` });
          return;
      }

      let signature: TransactionSignature = '';
      try {
          const preOwner = new PublicKey(form.walletAddress);

          const owner = new PublicKey(form.walletAddress);  
          
          const mintPubkey = new PublicKey(form.tokenAddress);
          const authority = publicKey;
          const account = await getAssociatedTokenAddress(
            mintPubkey, // mint
            owner // owner
          );
          const tx = new Transaction().add(
            await createFreezeAccountInstruction(
              account,
              mintPubkey,
              authority,
            )
          );  
          signature = await sendTransaction(tx, connection)
          notify({ type: 'success', message: 'Transaction successful!', txid: signature });
      } catch (error: any) {
          notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
          return;
      }
  }, [publicKey, notify, connection, sendTransaction]);

  return (
    <>
      <div className='my-6'>
        <input
          type='text'
          value={walletAddress}
          className='form-control block mb-2 ml-auto mr-auto min-w-[600px] max-w-[800px] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          placeholder='Wallet Address'
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          type='text'
          value={tokenAddress}
          className='form-control block mb-2 ml-auto mr-auto min-w-[600px] max-w-[800px] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          placeholder='Token Address'
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <button
          className='px-8 m-2 btn bg-purple-800 hover:from-pink-500 hover:to-yellow-500 ...'
          onClick={() => blockWallet({ walletAddress, tokenAddress })}>
          <span>ADD to BLOCKLIST</span>
        </button>
      </div>
      <div className='my-6'>
        
      </div>
    </>
  );
};
