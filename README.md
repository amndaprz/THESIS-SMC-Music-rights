
# **RITMO**

**_RITMO_**(Revolutionizing Income distribution by Tokenizing Music Operations)  is a decentralized application that uses Ethereum smart contracts to manage and  ensure fair distribution of fees involved in the monetary transactions done by the Philippine music industry.

### **Warning**



This code is made in partial fulfillment of the requirements for the Thesis of 4th year Computer Studies students from De La Salle University – Manila. Keep in mind that this code may have potential security risks if deployed on the Ethereum network mainnet. The students and the institution will not be held liable for any losses or damages done in the event of a misuse. This code is strictly for research purposes. 

## **Setup**


### **Ganache**



1. Install [Ganache](https://trufflesuite.com/ganache/).
2. Click New Server Ethereum
3. Set the following attributes to:
    1. Hostname: 127.0.0.1 - Loopback Pseudo - Interface 1
    2. Port Number: 7545
    3. Network Id: 5777
    4. Gas Limit: 20000000000

### **Metamask**



1. Install [Metamask](https://metamask.io/).
2. Add Network manually with Ganache by setting the following attributes to:
    1. Network name: Any
    2. New RPC URL: [HTTP://127.0.0.1:7545]
    3. Chain ID: 1337
    4. Currency Symbol: Eth
3. Import an account from Ganache by copying the private key and pasting it on Metamask. (Checkpoint: The Eth in Ganache should reflect on the Metamask wallet)

### **Remix**



1. Copy paste all the .sol files in [remix.ide](https://remix.ethereum.org/)
2. Compile all the .sol files and copy their ABIs
3. Paste the ABI to their corresponding files:
    1. MusicRightsToken.sol – abiMRT.json
    2. RoleAccess.sol – abiRA.json
    3. Stream.sol – abiStream.json
4. Deploy the smart contract using the Dev - Ganache Environment and copy the smart contract address
5. Paste the smart contracts address to the ContractProperties.js

### **Node.js**



1. Navigate to the ‘dApp’ folder
2. `npm install`
3. `npm start`


---

### **Additional Documentation (PDF downloadable):**



1. User Manual
2. Technical Manual
3. Code Documentation


---

![Alt](https://repobeats.axiom.co/api/embed/2683680f1d6215bfeb1c0a51ca76f57dc00b5031.svg "Repobeats analytics image")
