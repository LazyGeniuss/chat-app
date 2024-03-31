import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
    host:"redis-2a641a9f-shreyash8402-82c5.a.aivencloud.com",
    port:18887,
    username:"default",
    password:"AVNS_UY6uZlwMzpvLVLFLPKm",
});
const sub = new Redis({
    host:"redis-2a641a9f-shreyash8402-82c5.a.aivencloud.com",
    port:18887,
    username:"default",
    password:"AVNS_UY6uZlwMzpvLVLFLPKm",
});

class SocketService {
  private _io: Server;
  constructor() {
    console.log("init socket service");

    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    console.log("init socket listener");

    this.io.on("connect", (socket) => {
      console.log(`socket id : ${socket.id}`);

      socket.on("event:message", async ({ message }: { message: String }) => {
        console.log(`message ${message}`);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
