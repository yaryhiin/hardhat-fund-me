const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config");

!developmentChains.includes(network.name) ? describe.skip :
    describe("FundMe", async function () {
        let fundMe;
        let deployer;
        let mockV3Aggregator;
        // const sendValue = "1000000000000000000"; // 1 ETH
        const sendValue = ethers.utils.parseEther("1");
        this.beforeEach(async function () {
            // Deploying our FundMe contract
            // using Hardhat-deploy
            // const accounts = await ethers.getSigners(); // Reffering to all using accounts
            // const accountZero = accounts[0];
            deployer = (await getNamedAccounts()).deployer;
            await deployments.fixture(["all"]); // Deploying only contracts, that have tag "all"
            fundMe = await ethers.getContractAt("FundMe", deployer); // This will get to us the last version of deployed contract
            mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", deployer);
        })

        describe("constructor", function () {
            it("Sets the aggregator address correctly", async function () {
                const response = await fundMe.getPriceFeed();
                assert.equal(response, mockV3Aggregator.address);
            })
        })

        describe("fund", async function () {
            it("Fails if you dont send enough ETH", async function () {
                await expect(fundMe.fund()).to.be.reverted;
            })
            it("Update the amount funded data structure", async function () {
                await fundMe.fund({ value: sendValue });
                const response = await fundMe.getAddressToAmountFunded(deployer);
                assert.equal(response.toString(), sendValue.toString());
            })
            it("Adds funder to array of getFunder", async function () {
                await fundMe.fund({ value: sendValue });
                const funder = await fundMe.getFunder(0);
                assert.equal(funder, deployer);

            })
        })

        describe("Withdraw", async function () {
            this.beforeEach(async function () {
                await fundMe.fund({ value: sendValue });
            })

            it("Withdraw ETH from a single founder", async function () {
                // Arrange
                const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
                const startingDeployerBalance = await fundMe.provider.getBalance(deployer);
                // Act
                const transactionResponse = await fundMe.withdraw();
                const transactionReceipt = await transactionResponse.wait(1);

                const { gasUsed, effectiveGasPrice } = transactionReceipt;
                gasCost = gasUsed.mul(effectiveGasPrice);

                const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
                const endingDeployerBalance = await fundMe.provider.getBalance(deployer);

                // Assert
                assert.equal(endingFundMeBalance.toString(), 0);
                assert.equal((startingFundMeBalance.add(startingDeployerBalance)).toString(), (endingDeployerBalance.add(gasCost)).toString());
            })
            it("Allows us to withdraw with multiple getFunder", async function () {
                // Arrange
                const accounts = await ethers.getSigners();
                for (let i = 1; i < 6; i++) {
                    const fundMeConnectedContract = await fundMe.connect(accounts[i]); // Connecting other accounts to the contract
                    await fundMeConnectedContract.fund({ value: sendValue });
                }
                const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
                const startingDeployerBalance = await fundMe.provider.getBalance(deployer);

                // Act
                const transactionResponse = await fundMe.withdraw();
                const transactionReceipt = await transactionResponse.wait(1);
                const { gasUsed, effectiveGasPrice } = transactionReceipt;
                gasCost = gasUsed.mul(effectiveGasPrice);

                // Assert
                await expect(fundMe.getFunder(0)).to.be.reverted;

                for (let i = 1; i < 6; i++) {
                    assert.equal(await fundMe.getAddressToAmountFunded(accounts[i].address), 0)
                }
            })

            it("Only allows the owner to withdraw", async function () {
                const accounts = await ethers.getSigners();
                const attacker = accounts[1];
                const attackerConnectedContract = await fundMe.connect(attacker);
                await expect(attackerConnectedContract.withdraw()).to.be.revertedWith("FundMe__notOwner");
            })

            it("cheaperWithdraw testing...", async function () {
                // Arrange
                const accounts = await ethers.getSigners();
                for (let i = 1; i < 6; i++) {
                    const fundMeConnectedContract = await fundMe.connect(accounts[i]); // Connecting other accounts to the contract
                    await fundMeConnectedContract.fund({ value: sendValue });
                }
                const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
                const startingDeployerBalance = await fundMe.provider.getBalance(deployer);

                // Act
                const transactionResponse = await fundMe.cheaperWithdraw();
                const transactionReceipt = await transactionResponse.wait(1);
                const { gasUsed, effectiveGasPrice } = transactionReceipt;
                gasCost = gasUsed.mul(effectiveGasPrice);

                // Assert
                await expect(fundMe.getFunder(0)).to.be.reverted;

                for (let i = 1; i < 6; i++) {
                    assert.equal(await fundMe.getAddressToAmountFunded(accounts[i].address), 0)
                }
            })
        })
    })