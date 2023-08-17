// We dont need this for global networks like Sepolia, Goerli etc
// Only for local networks

const {network} = require("hardhat");
const {developmentChains, DECIMALS, INITIAL_ANSWER} = require("../helper-hardhat-config");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();

    if (?*) { // Checking if it contains name
        log("Local network detected! Deploying mocks...");
        await deploy("MockV3Aggregator", { // Deploying smart contract, that will give us priceFeed
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        });
        log("Mocks deployed!");
        log("--------------------------------------------------");
    }
}

module.exports.tags = ["all", "mocks"]; // Adding tags to our file, that we can interacte with only specified files in command line