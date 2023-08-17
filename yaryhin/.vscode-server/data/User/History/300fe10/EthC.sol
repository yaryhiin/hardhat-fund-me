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
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    address public immutable i_owner;
    AggregatorV3Interface public priceFeed = AggregatorV3Interface(priceFeedAddress); // Initializing priceFeed

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert FundMe__notOwner();
            _;
        }
    }

    constructor(address priceFeedAddress) {
        // Getting address of pair we want to use
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress); // Setting priceFeed deppending on the using network
    }

    /**
     * @notice This function funds this contract
     * @dev This implements price feeds as our libraries
     */
    function fund() public payable {
        require(
            msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
            "Didn`t send enough!"
        );
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public payable {
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }
}
