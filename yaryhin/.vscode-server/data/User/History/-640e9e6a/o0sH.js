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

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments; // Getting deploy and log parametrs from deployments
    const {deployer} = await getNamedAccounts(); // Getting deployer from getNamedAccounts function
    const chainId = network.config.chainId;

    // When going 
}