import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import TokenEth from './contracts/TokenEth.json';

const getBlockchain = () =>
  new Promise( async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if(provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      const networkId = await provider.request({ method: 'net_version' })
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const tokeneth = new Contract(
        TokenEth.networks[networkId].address,
        TokenEth.abi,
        signer
      );
      resolve([{tokeneth}, signerAddress]);
      return;
    }
    reject('Install Metamask');
  });

export default getBlockchain;