// function deployFunc() {
//     hre.getNamedAccounts();
//     hre.deployments
// }

// module.exports.default = deployFunc

//                     ||
//                     \/

// module.exports = async (hre) => {
//     const {getNamedAccounts, deployments} = hre;
// }

//                     ||
//                     \/

const {networkConfig, developmentChains} = require("../helper-hardhat-config");
const {network} = require("hardhat");
const {verify} = require("../utils/verify");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments; // Getting deploy and log parametrs from deployments
    const {deployer} = await getNamedAccounts(); // Getting deployer from getNamedAccounts function
    const chainId = network.config.chainId;

    // If chainId is X use address Y
    // If chainId is Z use address A
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    
    let ethUsdPriceFeedAddress;
    if(developmentChains.includes(network.name)) { // Checking what network we are using: local or global
        const ethUsdAggregator = await deployments.get("MockV3Aggregator"); 
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }
    // Setting this const as a address of eth/usd pair on right network

    // If the contract doesnt exist, we deploy a minimal version of
    // our local testing

    // When going for localhost or hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // Put price feed address
        log: true,
        waitConfirmations: network.config.blockGasLimit
    })

    if(!developmentChains.includer(network.name) && process.env.ETHERSCAN_API_KEY) {
        // Verify
        await verify(fundMe.address, args);
    }
    log("--------------------------------------");
}
module.exports.tags = ["all", "fundme"];