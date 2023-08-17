const {ethers} = require("hardhat");

// describe("SimpleStorage", () => {});
describe("SimpleStorage", function() {
  this.beforeEach(async function() { // Creataing function, that will be call before each it() function
    const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await simpleStorageFactory.deploy();
  }) 

  it() // Functions to test our smart contract
  it()
  it()

});