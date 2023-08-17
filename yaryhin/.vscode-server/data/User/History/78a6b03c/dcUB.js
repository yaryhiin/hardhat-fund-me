require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOILA_RPC_URL = process.env.SEPOILA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork: "hardhat",
  network: {
    rinkeby: {
      url: SEPOILA_RPC_URL,
      accounts: [],
    },
  },
  solidity: "0.8.7",
};
