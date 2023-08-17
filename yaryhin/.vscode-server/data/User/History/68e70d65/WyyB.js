const {deployments, ethers, getNamedAccounts} = require("hardhat");

describe("FundMe", async function () {
    let fundMe;
    let deployer;
    this.beforeEach(async function () {
        // Deploying our FundMe contract
        // using Hardhat-deploy
        // const accounts = await ethers.getSigners(); // Reffering to all using accounts
        // const accountZero = accounts[0];
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixtures(["all"]); // Deploying only contracts, that have tag "all"
        fundMe = await ethers.getContract("FundMe"); // This will get to us the last version of deployed contract
        
    })

    describe("constructor", function() {
        it("Sets the aggregator address correctly", async function() {
            const response = await fundMe.
        })
    })
})