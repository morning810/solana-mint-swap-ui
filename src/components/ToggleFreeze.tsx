'use client'
import { FC, useState, useCallback, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createInitializeMintInstruction, createTransferInstruction, createFreezeAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID, createTransferCheckedInstruction } from '@solana/spl-token';
import { Signer, Keypair, PublicKey, SystemProgram, sendAndConfirmTransaction, Transaction, TransactionSignature } from '@solana/web3.js';
import bs58 from 'bs58';
import { Metadata, PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { notify, makeSecretKey } from "../utils/notifications";

export const ToggleFreeze: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [ walletAddress, setWalletAddress] = useState('');
  const [ tokenAddress, setTokenAddress ] = useState('');
  const toggleFreeze = useCallback(async (form) => {
      if (!publicKey) {
          notify({ type: 'error', message: `Wallet not connected!` });
          return;
      }

      let signature: TransactionSignature = '';
      try {
          console.log(form.tokenAddress)
            const tmpString = String("[" + form.tokenAddress + "]");
            console.log(tmpString);
          const feePayer = Keypair.fromSecretKey( makeSecretKey('3qDC2YqLHgEAFjSFkpmHikiSAuqgku62Xbz1adyWNAdHXtvWrE5q95W9qsyBLdm7gQNrqwkhW8JXqrmsJ69CEEMG') );
          const mintKeypair = Keypair.fromSecretKey( makeSecretKey(tmpString) );
          console.log(mintKeypair.publicKey.toString())
        //   const mintPubkey = new PublicKey(form.tokenAddress);
          const createNewTokenTransaction = new Transaction().add(
            createInitializeMintInstruction(
              mintKeypair.publicKey, 
              8, 
              publicKey, 
              publicKey, 
              TOKEN_PROGRAM_ID)
          );
          signature = await sendTransaction(createNewTokenTransaction, connection, {signers:[feePayer], skipPreflight:true});
          notify({ type: 'success', message: 'Transaction successful!', txid: signature });
      } catch (error: any) {
          notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
          return;
      }
  }, [publicKey, notify, connection, sendTransaction]);

  useEffect(() => {
    console.log(tokenAddress);
  }, [tokenAddress])
  return (
    <>
      <div className='my-6'>
        <input
          type='text'
          value={tokenAddress}
          className='form-control block mb-2 ml-auto mr-auto min-w-[600px] max-w-[800px] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          placeholder='Token Address'
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <button
          className='px-8 m-2 btn bg-purple-800 hover:from-pink-500 hover:to-yellow-500 ...'
          onClick={() => toggleFreeze({ tokenAddress })}>
          <span>Toggle Freeze Authority</span>
        </button>
      </div>
      <div className='my-6'>
        
      </div>
    </>
  );
};
