import ERC721 from './erc721ABI.json';
import Web3 from "web3";

export const contractAddress = "0xC88A62772a89Ff40e8F9F9e06EaC910c28B7a966";

const fs = require("fs")
const path = require("path")

const getTheAbi = () => {
  try {
    const dir = path.resolve(
      __dirname,
      "./artifacts/contracts/MusicRightsToken.sol/MusicRightsToken.json"
    )
    const file = fs.readFileSync(dir, "utf8")
    const json = JSON.parse(file)
    const abi = json.abi
    console.log(`abi`, abi)

    return abi
  } catch (e) {
    console.log(`e`, e)
  }
}

export const contractABI = getTheAbi();
const web3 = new Web3(new Web3.providers.HttpProvider('https://eth-goerli.g.alchemy.com/v2/7xQu8LjQYqTTF-gWhwKGbHfEdxF5-WCN'));
export const contract = new web3.eth.Contract(contractABI, contractAddress);