import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1830332",
  key: "b637e0e8230c4443eeba",
  secret: "f4c5a0f758cb95898c52",
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient(
    "b637e0e8230c4443eeba",
  {
    cluster: "ap2",
    authEndpoint: "/api/pusher-auth",
    authTransport: "ajax",
    auth: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  }
);
