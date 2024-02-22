import { FC, useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, PublicKey, sendAndConfirmTransaction, Keypair, TransactionSignature } from '@solana/web3.js';
import {
  DataV2,
  createUpdateMetadataAccountV2Instruction,
  PROGRAM_ID
} from "@metaplex-foundation/mpl-token-metadata";

import { notify, makeSecretKey } from "../utils/notifications";

export const UpdateMetadata: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [tokenMint, setTokenMint] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [metadata, setMetadata] = useState('')


  const onClick = useCallback(async (form) => {
    if (!publicKey) {
        notify({ type: 'error', message: `Wallet not connected!` });
        return;
    }
    let signature: TransactionSignature = '';
    try{
        const mint = new PublicKey(form.tokenMint)
        const metadataPDA = PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
          ],
          PROGRAM_ID,
        )[0]
      
        const tokenMetadata = {
          name: form.tokenName, 
          symbol: form.symbol,
          uri: form.metadata,
          sellerFeeBasisPoints: 0,
          creators: null,
          collection: null,
          uses: null
        } as DataV2;

        const updateMetadataTransaction = new Transaction().add(
          createUpdateMetadataAccountV2Instruction(
            {
              metadata: metadataPDA,
              updateAuthority: publicKey,
            },
            {
              updateMetadataAccountArgsV2: {
                data: tokenMetadata,
                updateAuthority: publicKey,
                primarySaleHappened: true,
                isMutable: true,
              },
            }
          )
        );
        signature = await sendTransaction(updateMetadataTransaction, connection)
        notify({ type: 'success', message: 'Transaction successful!', txid: signature });
    }
    catch(error: any) {
        notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
        return;
    }
      // await sendTransaction(updateMetadataTransaction, connection);
  }, [publicKey, connection, sendTransaction]);

  return (
    <div className="my-6">
      <input
        type="text"
        className="form-control block mb-2 w-full px-4 py-2 text-xl min-w-[400px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Token Mint Address"
        onChange={(e) => setTokenMint(e.target.value)}
      />
      <input
        type="text"
        className="form-control block mb-2 w-full px-4 py-2 text-xl min-w-[400px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Token Name"
        onChange={(e) => setTokenName(e.target.value)}
      />
      <input
        type="text"
        className="form-control block mb-2 w-full px-4 py-2 text-xl min-w-[400px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Symbol"
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="text"
        className="form-control block mb-2 w-full px-4 py-2 text-xl min-w-[400px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Metadata Url"
        onChange={(e) => setMetadata(e.target.value)}
      />
      <button
        className="px-8 m-2 btn bg-purple-800 hover:from-pink-500 hover:to-yellow-500 ..."
        onClick={() =>
          onClick({
            metadata: metadata,
            symbol: symbol,
            tokenName: tokenName,
            tokenMint: tokenMint
          })
        }
      >
        <span>Update Metadata</span>
      </button>
    </div>
  );
}
