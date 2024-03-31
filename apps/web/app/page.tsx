"use client";

import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

const Page = () => {
  const { sendMessage } = useSocket();

  const [message, setMessage] = useState("");

  return (
    <div>
      <div>All messages will appear here</div>
      <div>
        <input
          placeholder="Enter your Message.."
          className={classes["chat-input"]}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={classes.button}
          onClick={(e) => sendMessage(message)}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;
