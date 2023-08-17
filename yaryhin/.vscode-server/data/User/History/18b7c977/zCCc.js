const {ethers} = require("hardhat");
const {expect, assert} = require("chai");

// describe("SimpleStorage", () => {});
describe("SimpleStorage", function() {
  let simpleStorageFactory;
  let simpleStorage;
  this.beforeEach(async function() { // Creataing function, that will be call before each it() function
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage"); 
    simpleStorage = await simpleStorageFactory.deploy();
    // We are creating and deploying new contract before every test
  }) 

  // Functions to test our smart contract
  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    expect(currentValue.toString()).to.equal(expectedValue); // Compairing what we get and what we needed to get using expect
  })
  it("It should update, when we call store()", async function () {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue); // Compairing what we get and what we needed to get using assert
  })
  // it()

});