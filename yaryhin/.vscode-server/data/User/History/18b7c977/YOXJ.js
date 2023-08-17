const {ethers} = require("hardhat");

// describe("SimpleStorage", () => {});
describe("SimpleStorage", function() {
  let simpleStorageFactory;
  let simpleStorage;
  this.beforeEach(async function() { // Creataing function, that will be call before each it() function
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage"); 
    simpleStorage = await simpleStorageFactory.deploy();
    // We are creating and deploying new contract before every test
  }) 

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    
  }) // Functions to test our smart contract
  it()
  it()

});