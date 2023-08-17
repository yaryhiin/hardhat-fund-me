require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL

module.exports = {
  defaultNetwork: "hardhat",
  network: {
    rinkeby: {
      url: 
    },
  }
  solidity: "0.8.7",
};
