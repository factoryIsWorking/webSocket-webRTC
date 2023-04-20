import { Socket } from "socket.io-client";

export type SocketModel = {
	appSocket: Socket | null;
};

export const socketState: SocketModel = {
	appSocket: null,
};
