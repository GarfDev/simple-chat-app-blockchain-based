import { ethers } from "ethers";
import { useRecoilState } from "recoil";
import React, { useEffect, useRef, useState } from "react";
import { Message, MessageState } from "./modules/core/messages";
import ChatAppContract from "../build/contracts/ChatApp.json";

const contractAddress = "0x2D00Fa58b0f19924Df0091d03dC47365504A79d2";

const App = (): JSX.Element => {
  const [newMessage, setNewMessage] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<any>();
  const [messages, setMessages] = useRecoilState(MessageState);
  const [loading, setLoading] = useState(false);
  const [sending, changeSending] = useState(false);
  const messageRef = useRef(messages);

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  let contract = new ethers.Contract(
    contractAddress,
    ChatAppContract.abi,
    provider
  );

  contract = contract.connect(signer);

  // Event Handle
  const handleNewMessage = (message: Message) => {
    setMessages([...messageRef.current, message]);
  };

  const handleAddMessage = async () => {
    changeSending(true);
    console.log("Added new message", currentAccount, newMessage);
    await contract.addMessage(currentAccount, newMessage);
    changeSending(false);
    setNewMessage("");
  };

  const getMessages = async () => {
    setLoading(true);
    const lastIndex = await contract.getStoredMessagesLength();
    const firstIndex = lastIndex.toNumber() -  5 > 0 ? lastIndex.toNumber() -  5 : 0
    const newMessages = await contract.getMessages(firstIndex, lastIndex.toNumber()); // Get All
    console.log(firstIndex, lastIndex.toNumber())
    setMessages(newMessages);
    setLoading(false)
  };

  const init = async () => {
    await (window as any).ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts: any) => {
        setCurrentAccount(accounts[0]);
      });
  };

  // Side-Effects
  useEffect(() => {
    messageRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (!initialized) {
      init().then(() => getMessages());
      contract.on("NewMessage", handleNewMessage);
      setInitialized(true);
    }
  }, [initialized]);
  
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {loading && <>Loading messages..</>}
        {!loading && messages.map((msg, index) => (
          <span style={{ padding: "5px 0px" }} key={msg._author + index}>
            {msg._author}: {msg._content}
          </span>
        ))}
      </div>
      <div>
        <input
          value={newMessage}
          style={{ marginRight: '5px' }}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button disabled={sending} onClick={handleAddMessage}>{sending ? 'Sending' : 'Send'}</button>
      </div>
    </div>
  );
};

export default App;
