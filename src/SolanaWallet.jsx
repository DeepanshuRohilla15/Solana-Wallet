/* eslint-disable react/prop-types */
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import './App.css';

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    const addWallet = async () => {
        try {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            
            // Update state
            setPublicKeys(prevKeys => [...prevKeys, keypair.publicKey]);
            setCurrentIndex(prevIndex => prevIndex + 1);

            // Log for debugging
            console.log("Generated Public Key:", keypair.publicKey.toBase58());
        } catch (error) {
            console.error("Error generating wallet:", error);
        }
    };

    return (
        <div>
            <button onClick={addWallet}>Add wallet</button>
            <h2>Public Keys</h2>
            <div>
                {publicKeys.length === 0 ? (
                    <p>No wallets created yet.</p>
                ) : (
                    publicKeys.map((p, index) => (
                        <div key={index}>{p.toBase58()}</div>
                    ))
                )}
            </div>
        </div>
    );
}
