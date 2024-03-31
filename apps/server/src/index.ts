import http from "http";
import SocketService from "./services/socket";

const init = async () => {
  const socketService = new SocketService();

  const server = http.createServer();
  const port = process.env.PORT ?? 8000;

  socketService.io.attach(server);

  server.listen(port, () => console.log(`listening at port ${port}`));
  socketService.initListeners();
};

init();
