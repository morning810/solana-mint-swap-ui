import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";

export const SendTransaction: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const onClick = useCallback(async () => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            return;
        }

        let signature: TransactionSignature = '';
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: Keypair.generate().publicKey,
                    lamports: 1,
                })
            );

            signature = await sendTransaction(transaction, connection);

            await connection.confirmTransaction(signature, 'confirmed');
            notify({ type: 'success', message: 'Transaction successful!', txid: signature });
        } catch (error: any) {
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            return;
        }
    }, [publicKey, notify, connection, sendTransaction]);

    return (
        <div>
            <button
                className="group w-60 m-2 btn bg-purple-800 hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Send Transaction 
                </span>
            </button>
        </div>
    );
};
