// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TestContract{
    event TestEvent(
        uint indexed id,
        uint indexed date,
        string value
    );
    uint nextId;
    function emitEvent(string calldata value) external{
        emit TestEvent(nextId, block.timestamp, value);
        nextId++;
    }
}