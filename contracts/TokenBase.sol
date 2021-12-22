// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Remix style import
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Token Base is ERC20 token
contract TokenBase is ERC20 {
  address public admin;

  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    admin = msg.sender;
  }

  function updateAdmin(address newAdmin) external {
    require(msg.sender == admin, 'only admin');
    admin = newAdmin;
  }

  // To create token
  function mint(address to, uint amount) external {
    // function protected where only admin is able to call this function
    require(msg.sender == admin, 'only admin');
    _mint(to, amount);
  }
  
  // To destroy token
  function burn(address owner, uint amount) external {
    // function protected where only admin is able to call this function
    require(msg.sender == admin, 'only admin');
    _burn(owner, amount);
  }
}