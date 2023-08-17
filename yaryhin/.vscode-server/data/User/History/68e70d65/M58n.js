const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert } = require("chai");

describe("FundMe", async function () {
    let fundMe;
    let deployer;
    let mockV3Aggreagtor;
    this.beforeEach(async function () {
        // Deploying our FundMe contract
        // using Hardhat-deploy
        // const accounts = await ethers.getSigners(); // Reffering to all using accounts
        // const accountZero = accounts[0];
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"]); // Deploying only contracts, that have tag "all"
        fundMe = await ethers.getContract("FundMe", deployer); // This will get to us the last version of deployed contract
        mockV3Aggreagtor = await ethers.getContract("MockV3Aggregator", deployer); 
    })

    describe("constructor", function () {
        it("Sets the aggregator address correctly", async function () {
            const response = await fundMe.priceFeed();
            assert.equal(response, mockV3Aggreagtor.address);
        })
    })

    
})