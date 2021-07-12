// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

contract ChatApp {
    /** Types */
    struct Message {
        address _author;
        uint256 _dateAdded;
        string _content;
    }

    uint256 public storedMessageCount;
    Message[] public storedMessages;

    /** Events */
    event NewMessage(Message message);

    /** Functions */
    function addMessage(address _author, string memory _content)
        external
        returns (uint256 totalMessage)
    {
        Message memory message;
        message._author = _author;
        message._content = _content;
        message._dateAdded = block.timestamp;
        storedMessages.push(message);
        ++storedMessageCount;
        emit NewMessage(message);
        return storedMessageCount;
    }

    function getStoredMessagesLength() external view returns (uint256 _length) {
        return storedMessageCount;
    }

    function getMessages(uint256 cursor, uint256 howMany)
        external
        view
        returns (Message[] memory messages)
    {
        uint256 length = howMany;
        if (length > storedMessageCount - cursor) {
            length = storedMessageCount - cursor;
        }

        Message[] memory values = new Message[](length);

        for (uint256 i = 0; i < length; i++) {
            values[i] = storedMessages[cursor + i];
        }

        return values;
    }
}
