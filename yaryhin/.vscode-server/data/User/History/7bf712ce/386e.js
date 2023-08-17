const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to ${simpleStorage.address}`);

  if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) { // Checking if it`s not hardhat network
    console.log("Waiting for block txes...");
    await simpleStorage.deployTransaction.wait(6); // Waiting 6 blocks to be confirmed before verifying contract code
    await verify(simpleStorage.address, []); // Verifying contract code
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is: ${currentValue}`);

  const transactionResponse = await simpleStorage.store("7");
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value: ${updatedValue}`);
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