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

const {networkConfig} = require("..")

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments; // Getting deploy and log parametrs from deployments
    const {deployer} = await getNamedAccounts(); // Getting deployer from getNamedAccounts function
    const chainId = network.config.chainId;

    // When going for localhost or hardhat network we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [address], // Put price feed address
        log: true
    })
}