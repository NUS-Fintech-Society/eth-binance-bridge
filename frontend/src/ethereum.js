import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import TokenEth from './contracts/TokenEth.json';
import TokenBsc from "./contracts/TokenBsc.json";
import BridgeEth from './contracts/BridgeEth.json';
import BridgeBsc from "./contracts/BridgeBsc.json";

export const getNetwork = () => {
  new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      await provider.request({ method: "eth_requestAccounts" });
      const networkId = await provider.request({ method: "net_version" });
      resolve([networkId]);
      return;
    }
    reject("Install Metamask");
  });
}

export const getEthTokens = () => {
  new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      const networkId = await provider.request({ method: "net_version" });
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const tokenEth = new Contract(
        TokenEth.networks[networkId].address,
        TokenEth.abi,
        signer
      );
      resolve([{ tokenEth }, signerAddress]);
      return;
    }
    reject('Install Metamask');
  });
}

export const getBscTokens = () => {
  new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      await provider.request({ method: "eth_requestAccounts" });
      const networkId = await provider.request({ method: "net_version" });
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const tokenBsc = new Contract(
        TokenBsc.networks[networkId].address,
        TokenBsc.abi,
        signer
      );
      resolve([{ tokenBsc }, signerAddress]);
      return;
    }
    reject("Install Metamask");
  });
}

export const getBridgeEth = (amount) => {
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
      console.log(bridgeEth);
      bridgeEth.burn(signerAddress, amount);
      return;
    }
    reject("Install Metamask");
  });
}

    // export const getBridgeBsc = (amount) => {
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
    //       console.log(bridgeBsc);
    //       bridgeBsc.burn(signerAddress, amount);
    //       return;
    //     }
    //     reject("Install Metamask");
    //   });
    // }
