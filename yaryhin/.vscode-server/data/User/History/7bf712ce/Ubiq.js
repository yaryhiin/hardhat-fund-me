const { ethers, run } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to ${simpleStorage.address}`);
}

async function verify(contractAddress, args) { // Function, that will automaticly veify our contract in Etherscan
  console.log("Veryfing contract...");
  try {
    await run("verify:verify", { // Adding parametrs to verify function
      address: contractAddress,
      constructorArguments: args
    });
  }
  catch (e) {
    if(e.message.toLowerCase()")))
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
})