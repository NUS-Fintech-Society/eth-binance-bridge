import './App.css';
import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import { getBridgeEth, getBscTokens, getEthTokens, getNetwork } from './ethereum';

function App() {
  const [bscBalance, setBscBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [ethAmt, setEthAmt] = useState(0);
  const [bscAmt, setBscAmt] = useState(0);
  const totalSupply = 2100;

   useEffect(() => {
     getBalances();
   }, []);
  
  const getBalances = async () => {
    console.log("get balances");
    const [networkId] = await getNetwork();
    if (networkId === '4') {
      const [{ tokenEth }, signerAddress] = await getEthTokens();
      const ethBalance = await tokenEth.balanceOf(signerAddress);
      setEthBalance(parseInt(ethBalance.toString()));
      setBscBalance(totalSupply - ethBalance);
    } else if (networkId === '97') {
       const [{ tokenBsc }, signerAddress] = await getBscTokens();
       const bscBalance = await tokenBsc.balanceOf(signerAddress);
       setBscBalance(parseInt(bscBalance.toString()));
       setEthBalance(totalSupply - bscBalance);
    }
  };
  
  async function transferEth(e) {
    e.preventDefault();
    if (ethAmt > ethBalance) {
      return;
    }
    await getBridgeEth(ethAmt);
    await getBalances();
  }

  async function transferBsc(e) {
    e.preventDefault();
    if (bscAmt > bscBalance) {
      return;
    }
    // await getBridgeBsc(bscAmt);
    await getBalances();
  }

  return (
    <div className="App">
      <header className="App-header">ERC20 Token Bridge</header>
      <body>
        <form onSubmit={transferEth}>
          <div className="eth-to-bsc">
            Transfer tokens from eth to bsc:
            <br />
            Amount of tokens:{" "}
            <input type="number" onChange={(e) => setEthAmt(e.target.value)} />
            <br />
            <button type="submit">Go!</button>
          </div>
        </form>

        <form onSubmit={transferBsc}>
          <div className="bsc-to-eth">
            Transfer tokens from bsc to eth:
            <br />
            Amount of tokens:{" "}
            <input type="number" onChange={(e) => setBscAmt(e.target.value)} />
            <br />
            <button type="submit">Go!</button>
          </div>
        </form>

        <div>Balance on Binance Smart Chain: {bscBalance} Tokens</div>
        <div>Balance on Ethereum: {ethBalance.toString()} Tokens</div>
      </body>
    </div>
  );
}

export default App;
