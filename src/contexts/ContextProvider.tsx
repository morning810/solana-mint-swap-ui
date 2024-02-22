import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
    // LedgerWalletAdapter,
    // SlopeWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import { notify } from "../utils/notifications";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { autoConnect } = useAutoConnect();
    const [networkDrop, setNetworkDrop] = useState('devnet');

    const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);
    const setURL = (network) => {
        if( network === 'mainnet-beta' ) return 'https://solana-mainnet.g.alchemy.com/v2/zzndiqX2C-GnTM3-PSYFf9eA0DVnX7u_';
        return clusterApiUrl(network);
    }
    const endpoint =  useMemo(() => setURL(network), [network]);
    // const [endpoint, setEndpoint] = useState('https://rpc.ankr.com/solana');

    
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
            new TorusWalletAdapter(),
            // new LedgerWalletAdapter(),
            // new SlopeWalletAdapter(),
        ],
        [network]
    );

    const onError = useCallback(
        (error: WalletError) => {
            notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
        },
        []
    );
    
    useEffect(()=>{
        if( networkDrop == 'devnet' ){
            setNetwork( WalletAdapterNetwork.Devnet );
        }
        if( networkDrop == 'testnet' ){
            setNetwork( WalletAdapterNetwork.Testnet );
        }
        if( networkDrop == 'mainnet-beta' ){
            setNetwork( WalletAdapterNetwork.Mainnet );
        }

    }, [networkDrop])

    useEffect(() => {
        console.log(network)
    }, [network])
    return (
        // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
                <ReactUIWalletModalProvider>
                    <div className='absolute top-[70px] right-[0px] z-[10] justify-center flex items-center'>
                        <select value={networkDrop} className='bg-purple-800 font-[Inter] border-0 font-bold p-2 text-xl rounded' onChange={(e)=>setNetworkDrop(e.target.value)}>
                            <option value="devnet" className='py-4 block text-md font-normal bg-purple-600'>Devnet</option>
                            <option value="testnet" className='py-4 block text-md font-normal bg-purple-600'>Testnet</option>
                            <option value="mainnet-beta" className='py-4 block text-md font-normal bg-purple-600'>Mainnet-beta</option>
                        </select>
                    </div>
                    {children}
                </ReactUIWalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AutoConnectProvider>
            <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
    );
};
