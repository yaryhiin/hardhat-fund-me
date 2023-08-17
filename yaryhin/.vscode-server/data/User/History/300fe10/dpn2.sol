// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./PriceConverter.sol";

error notOwner(); // Declairing the error message

contract FundMe {

    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18; // Making this variable as constant to reduce the gas
    // 347 gas - constant
    // 2446 gas - non-constant

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    uint256 number;

    address public immutable i_owner;
    // Immutable variable can be set one time, but it can be made outside the declaration of it
    // 439 gas - immutable
    // 2574 gas - non-immutable

    // Function that is called when the contract is deploying
    constructor() {
        i_owner = msg.sender; // We set owner to address that deploy contract 
    }

    function fund() public payable {
        number = 5;
        require(msg.value.getConversionRate() >= MINIMUM_USD, "Didn`t send enough!"); 
        // require will check if given statement is true, unless it send the error message
        // msg.value its value that is in transaction, for example 1Eth

        // If require is not satisfied it will reverete all previous actions(number will remain as 0)
        // cancel transaction and return all remaining gas to sender
        funders.push(msg.sender); // msg.sender is the address which sent the tx to our contract, for example 0x7beA3b851fd00f36787046FD2ddc32c0eB341c69
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner {
        for(uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);

        // Transfer
        // msg.sender = address
        // payable(msg.sender) = payable address
        // payable(msg.sender).transfer(address(this).balance);
        // We transfer exact amount of Ether(address(this).balance) to message sender address

        // Send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // We send exact amount of Ether(address(this).balance) to message sender address
        // require(sendSuccess, "Send failed");
        // If transaction failed, it will reverte the transaction

        // Call
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    
    }

    // We can add modifier to function and they will at first proccess the code in modifier
    // and only then the code in actual function
    modifier onlyOwner {
        // require(msg.sender == i_owner, "Sender is not owner"); // Checking if the sender of transaction is the owner of contract
        if(msg.sender != i_owner) { 
            revert notOwner();
        _;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

}