// We dont need this for global networks like Sepolia, Goerli etc
// Only for local networks

const {network} = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId;
}