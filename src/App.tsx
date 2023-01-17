import React, {useEffect, useState} from 'react';
import './App.css';
import {useMetamask} from "./hooks/useMetamask";
import {ethers, Wallet} from "ethers";

// BDOD
const PRIVATE_KEY = 'd08b5a0794ea26c523a96c3c9a9a5a9eaad43056a5ef593a24eb14c58fc8c049'

function App() {
  const {connect, accounts, provider } = useMetamask()
    const [addressToSend, setAddressToSend] = useState<string>('')
    const [signer, setSigner] = useState<Wallet>()

    useEffect(()=>{
        (async ()=> await connect())()
    }, [])

    useEffect(()=>{
        setSigner(new ethers.Wallet(PRIVATE_KEY, provider!));
    }, [provider])

    const onSend = async () =>{
        const resp = await signer!.sendTransaction({
            to: addressToSend,
            value: ethers.utils.parseEther("0.0001")
        })

        console.log('resp', resp)

        console.log('Done')
    }

  return (
      <div className="App">
        <header className="App-header">
            Choose BDOD wallet, Goerli chain!

            <pre>
                {JSON.stringify(accounts)}
            </pre>

            Address to send:
            <input value={addressToSend} onChange={(e)=>setAddressToSend(e.target.value)}/>
            0.0001 ETH

            <button onClick={onSend}>Send</button>

            Check here after:
            <a href={'https://goerli.etherscan.io/address/0xB7C1044A6dBd372105fb7B12738e0Dd1971eBD0D'} target={'_blank'}>https://goerli.etherscan.io/address/0xB7C1044A6dBd372105fb7B12738e0Dd1971eBD0D</a>
      </header>
    </div>
  );
}

export default App;
