// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0;

contract TaskStore {
    string public storedTask;

    function updateTask(string calldata x) external {
        storedTask = x;
    }

    function readTask( ) view public returns (string memory) {
        return storedTask;
    }

}