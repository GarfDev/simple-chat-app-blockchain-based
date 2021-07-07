// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;


contract ChatApp {

    /** Types */
    struct Message {
        address _author;
        uint _dateAdded;
        string _content;
    }

    uint public storedMessageCount;
    Message[] public storedMessages;

    /** Events */
    event NewMessage(Message message);

    /** Functions */
    function addMessage(address _author, string memory _content) external returns(uint totalMessage) {
        Message memory message;
        message._author = _author;
        message._content = _content;
        message._dateAdded = block.timestamp;
        storedMessages.push(message);
        ++storedMessageCount;
        emit NewMessage(message);
        return storedMessageCount;
    }

    function getMessages() view external returns(Message[] memory messages) {
        return storedMessages;
    }

}
