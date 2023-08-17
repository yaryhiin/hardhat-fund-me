require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number.js");
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia-example"; // 
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: { // Adding new network
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localHost: {
      url: "http://127.0.0.1:8545/",
      // Accounts are pushed by hardhat
      chainId: 31337
    }
  },
  solidity: "0.8.7",
  etherscan: { // Adding our Etherscan verify
    apiKey: ETHERSCAN_API_KEY 
  },
  gasReporter: { // Adding gas report
    enabled: true, // Enabling it
    outputFile: "gas-report.txt", // Storing gas report in file
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC"
  }
};
