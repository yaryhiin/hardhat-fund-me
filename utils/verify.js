const { run } = require("hardhat");
const { modules } = require("web3");

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

  module.exports = {verify};