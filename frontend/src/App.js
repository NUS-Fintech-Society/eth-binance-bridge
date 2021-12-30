import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [bscBalance, setBscBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

   useEffect(() => {
     //get balances and update bscBalance/ethBalance
   }, []);
  
  //checking functions which should trigger warning msg on invalid input

  //trigger bridge functions, update balances on success

  return (
    <div className="App">
      <header className="App-header">ERC20 Token Bridge</header>
      <body>
        <form
          onSubmit={
            (e) => e /* checking functions/error msg + trigger bridge functions */
          }
        >
          <div className="eth-to-bsc">
            Transfer tokens from eth to bsc:
            <br />
            Amount of tokens: <input type="number"></input>
            <br />
            <button type="submit">Go!</button>
          </div>
        </form>

        <form
          onSubmit={
            (e) => e /* checking functions/error msg + trigger bridge functions */
          }
        >
          <div className="bsc-to-eth">
            Transfer tokens from bsc to eth:
            <br />
            Amount of tokens: <input type="number"></input>
            <br />
            <button type="submit">Go!</button>
          </div>
        </form>

        <div>Balance on Binance Smart Chain: {bscBalance} ETH</div>
        <div>Balance on ETH: {ethBalance} ETH</div>
      </body>
    </div>
  );
}

export default App;
