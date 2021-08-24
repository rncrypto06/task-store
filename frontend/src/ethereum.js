import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import TaskStore from './contracts/TaskStore.json';

const getBlockchain = () =>
    new Promise(async (resolve, reject) => {
        let provider = await detectEthereumProvider();
        if (provider) {
            await provider.request({ method: 'eth_requestAccounts' });
            const networkId = await provider.request({ method: 'net_version' });
            provider = new ethers.providers.Web3Provider(provider);
            const signer = provider.getSigner();
            const stringStore = new Contract(
                TaskStore.networks[networkId].address,
                TaskStore.abi,
                signer
            );
            resolve({ stringStore });
            return;
        }
        reject('Install Metamask.');
    });

export default getBlockchain;