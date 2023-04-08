import { ContractEventPayload } from 'ethers';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import {utils } from 'web3';

const ConnectIPFS = () => {
    const ipfsClient = async() => {
        const projectId = '2NOlVoXpecazym067i0JgqK0UzU';
        const projectSecret = '208442d6bd98466af54320034f4d6087';
        const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
        const ipfs = create({
            host: 'infura-ipfs.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: auth,
            },
            
        })

        return ipfs;
    }

    const saveInput = async(MRC) => {
        let ipfs = await ipfsClient();
        let mrcToString = Buffer.from(JSON.stringify(MRC));
        let result = await ipfs.add(mrcToString);
        //console.log(address);
        console.log(result);

        return result.path;
    }

    const displayAllInfo = async() => {
        let IPFS = await ipfsClient();
        const allPinned = await IPFS.pin.ls({type: 'recursive'});
        // IPFS.c
        const allHashes = new Set();

        allPinned.forEach((item) => {
            allHashes.add(item.cid.toString());
        })

        console.log(Array.from(allHashes));

        return allHashes;
    }
}

export default ConnectIPFS;