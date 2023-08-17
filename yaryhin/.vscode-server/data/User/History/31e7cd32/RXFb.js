const {task} = require("hardhat/config");

task("block-number", "Prints the current block number").setAction() {
    async (taskArgs, hre) => { // Initializing anonymous function
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number: ${blockNumber}`);
    }
} // Creating task for HardHat
