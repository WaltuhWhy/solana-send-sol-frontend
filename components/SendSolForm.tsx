import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js'
import { FC } from 'react'
import styles from '../styles/Home.module.css'


export const SendSolForm: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const sendSol = event => {
        event.preventDefault()
        
        if (!connection || !publicKey) {
            return;
        }

        const toPubkey = new web3.PublicKey(event.target.recipient.value);
        const transaction = new web3.Transaction();

        const sendSolInstruction = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey,
            lamports: event.target.amount.value * web3.LAMPORTS_PER_SOL,
        });

        transaction.add(sendSolInstruction);
        sendTransaction(transaction, connection).then((sig) => {
            console.log(`Sent ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
            console.log(`Transaction signature is ${sig}`);
        });
    };

    return (
        <div>
            <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                <button type="submit" className={styles.formButton}>Send</button>
            </form>
        </div>
    );
}