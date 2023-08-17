const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to ${simpleStorage.address}`);

  if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await verify(simpleStorage.address, [])
  }
}

async function verify(contractAddress, args) { // Function, that will automaticly veify our contract in Etherscan
  console.log("Veryfing contract...");
  try { // Catching the error
    await run("verify:verify", { // Adding parametrs to verify function
      address: contractAddress,
      constructorArguments: args
    });
  }
  catch (e) { // Checking error
    if(e.message.toLowerCase().includes("already verified")) { // Checking error mesaage
      console.log("ALready Verified!");
    } else {
      console.log(e);
    }
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
})