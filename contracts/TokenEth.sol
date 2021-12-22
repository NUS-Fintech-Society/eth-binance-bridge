// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './TokenBase.sol';

// Deploy token on Binance smart chain inherited from TokenBase
contract TokenEth is TokenBase {
  constructor() TokenBase('ETH Token', 'ETK') {}
}