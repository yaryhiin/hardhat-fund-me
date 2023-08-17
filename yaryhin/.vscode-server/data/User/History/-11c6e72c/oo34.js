// Deploy the FundMe contract
const FundMe = await ethers.getContractFactory("FundMe");
const fundMe = await FundMe.deploy(priceFeedAddress); // Pass the priceFeedAddress to the constructor

// Wait for the contract to be mined
await fundMe.deployed();

// Get the contract instance and access priceFeed
const deployedFundMe = await ethers.getContractAt("FundMe", fundMe.address);
const priceFeed = await deployedFundMe.priceFeed();
console.log("Price Feed:", priceFeed);

m