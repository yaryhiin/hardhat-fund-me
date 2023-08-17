require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL

module.exports = {
  defaultNetwork: "hardhat",
  network: {
    rinkeby: {
      url: SEPOILA_RPC_URL,

    },
  },
  solidity: "0.8.7",
};
