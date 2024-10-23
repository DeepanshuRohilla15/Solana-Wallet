import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { useState } from "react";

function App() {
  const [mnemonic, setMnemonic] = useState("")

  return (
    <div className="App">
      <h1>Solana Wallet</h1>
      <button onClick={async function() {
        const mn = await generateMnemonic();
        setMnemonic(mn)
      }}>Create Seed Phrase</button>
      <input className="input-box" type="text" value={mnemonic}></input>
      <SolanaWallet mnemonic={mnemonic} />
    </div>
  )
}

export default App;