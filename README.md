# eth-binance-bridge
ERC20 token bridge with Oracle, a winter project 2021

## Developer Notes
- Add mnemonic in 'truffle-config.js' to connect to network/testnet. You will have to use the private key of your eth wallet, hence **never** push it to github!
- To check network connection:

```console
truffle migrate --reset --network <network-name>
```

## To Test
1. Check token balances using token balance scripts. For example,
```console
truffle exec scripts/token-balance-bsc.js --network bscTestnet  
```
2. Deploy bridge and transfer
```console
node scripts/eth-bsc-bridge.js 
truffle exec scripts/eth-bsc-transfer.js --network ethTestnet
```
3. Check balances again
