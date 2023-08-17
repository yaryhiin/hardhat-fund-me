// SPDX-License-Identifier: MIT
// Pragma
pragma solidity ^0.8.8;
//Imports
import "./PriceConverter.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// Error codes
error FundMe__notOwner();

// Interfaces, Libraries, Contracts

/**
 * @title A contract for crowd funding
 * @author Yaryhin Tymofii
 * @notice This contract is to a demo sample funding contract
 * @dev This implements price feeds as our libraries
 */
contract FundMe {
    // Type declarations
    using PriceConverter for uint256;

    // State variables
    uint256 public constant MINIMUM_USD = 50 * 1e18;
    address[] private s_funders;
    mapping(address => uint256) private s_addressToAmountFunded;
    address private immutable i_owner;
    AggregatorV3Interface private s_priceFeed; // Initializing priceFeed

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert FundMe__notOwner();
        }
        _;
    }

    constructor(address priceFeedAddress) {
        // Getting address of pair we want to use
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress); // Setting priceFeed deppending on the using network
    }

    /**
     * @notice This function funds this contract
     * @dev This implements price feeds as our libraries
     */
    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "Didn`t send enough!"
        );
        s_addressToAmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    function withdraw() public payable onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    function cheaperWithdraw() public payable onlyOwner {
        address[] memory funders = s_funders;
        // Mapping can`t be in memory
        for(uint256 funderIndex; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    function getOwner() public view returns(address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns(address) {
        return s_funders[index];
    }

    function getAddressToAmountFunded(address funder) public view returns(uint256) {
        return s_addressToAmountFunded[funder];
    }

    function getPriceFeed() public view returns(AggregatorV3Interface) {
        return s_priceFeed;
    }
} 
