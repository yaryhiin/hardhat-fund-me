require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  network: {
    rinkeby: {
      url: ""
    },
  }
  solidity: "0.8.7",
};
