// import { baseURL } from "./api"
import io from "socket.io-client";
import { socketBaseURL } from "./api";

const MESSAGE_EVENT_NAME = "private-message";

export let socketClient;

export async function connect(data) {
  // let sc  = io("https://howbodi.herokuapp.com")

  socketClient = await io.connect(socketBaseURL);
  socketClient.on("connect", (socket) => {
    socketClient.emit("join", data);

    socketClient.on("join", (data) => {});
  });
}

export function disconnect() {
  if (socketClient) {
    socketClient.disconnect();
  }
}

export function setMessageHandler(handler) {
  // socketClient.on(MESSAGE_EVENT_NAME, handler)
  socketClient.on(MESSAGE_EVENT_NAME, (data) => {
    handler(data);
  });
}

export function clearMessageHandler() {
  socketClient.removeAllListeners(MESSAGE_EVENT_NAME);
}

export function sendMessage(data) {
  socketClient.emit(MESSAGE_EVENT_NAME, data);
}
