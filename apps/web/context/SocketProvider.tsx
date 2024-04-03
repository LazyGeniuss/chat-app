"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

interface ISocketProvider {
  children?: React.ReactNode;
}

interface ISocketContext {
  messages: string[];
  sendMessage: (message: String) => any;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error(`state is undefined`);
  }

  return state;
};

export const SocketProvider: React.FC<ISocketProvider> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (message) => {
      console.log("message", message);
      if (socket) {
        socket.emit("event:message", { message });
      }
    },
    [socket]
  );

  const onMessageRecieved = useCallback((msg: string) => {
    console.log("From server", msg);
    const { message } = JSON.parse(msg) as { message: string };
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageRecieved);
    setSocket(_socket);

    return () => {
      _socket.disconnect();
      _socket.off("messsage", onMessageRecieved);
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
