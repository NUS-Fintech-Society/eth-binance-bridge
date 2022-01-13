import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract, JsonRpcProvider } from 'ethers';
import TokenEth from './contracts/TokenEth.json';
import TokenBsc from "./contracts/TokenBsc.json";
import BridgeEth from './contracts/BridgeEth.json';
import BridgeBsc from "./contracts/BridgeBsc.json";

export const getEthTokens = () =>
  new Promise( async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if(provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const tokenEth = new Contract(
        TokenEth.networks['4'].address,
        TokenEth.abi,
        signer
      );
      resolve([{tokenEth}, signerAddress]);
      return;
    }
    reject('Install Metamask');
  });

  export const getBridgeEth = (amount) =>
    new Promise(async (resolve, reject) => {
      let provider = await detectEthereumProvider();
      if (provider) {
        
        await provider.request({ method: "eth_requestAccounts" });
        const networkId = await provider.request({ method: "net_version" });
        
        provider = new ethers.providers.Web3Provider(provider);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();
        const bridgeEth = new Contract(
          BridgeEth.networks[networkId].address,
          BridgeEth.abi,
          signer
        );
        bridgeEth.burn(signerAddress, amount);
        return;
      }
      reject("Install Metamask");
    });

    // export const getBridgeBsc = (amount) =>
    //   new Promise(async (resolve, reject) => {
    //     let provider = await detectEthereumProvider();
    //     if (provider) {
    //       await provider.request({ method: "eth_requestAccounts" });
    //       const networkId = await provider.request({ method: "net_version" });

    //       provider = new ethers.providers.Web3Provider(provider);
    //       console.log(provider);
    //       const signer = provider.getSigner();
    //       const signerAddress = await signer.getAddress();
    //       console.log(signer);
    //       const bridgeBsc = new Contract(
    //         BridgeBsc.networks[networkId].address,
    //         BridgeBsc.abi,
    //         signer
    //       );
    //       console.log(bridgeEth);
    //       bridgeBsc.burn(signerAddress, amount);
    //       return;
    //     }
    //     reject("Install Metamask");
    //   });
