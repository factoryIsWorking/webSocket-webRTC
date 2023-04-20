import { RaiseError } from "../common/util";
import config from "../config";
import { appChannel } from "./app.model";
import io, { Socket } from "socket.io-client";
import { socketState } from "./socket.model";
import { applyLobbyAction } from "../lobby/lobby.controller";
import { ActionRequest } from "./socket.type";

const { serverUrl } = config;

export function applyAppAction(socket: Socket) {
	const dealAction = {
		clientRenewed(uid: any) {
			appChannel.update({ user: { id: uid } });
			console.log("new uid : " + uid);
		},
	};
	socket.on("app", ({ action, params }: ActionRequest) => {
		dealAction[action as keyof typeof dealAction](params);
	});
}

function connectSocket(): Socket {
	const socket: Socket = io(`${config.serverUrl}/app`);
	socket.on("connect", () => {
		console.log(`socket connected : ${`${config.serverUrl}/app`}`);
	});
	socket.on("connect_error", (err: Error) => {
		socket.disconnect();
		RaiseError(err);
	});
	socket.on("disconnect", () => {
		RaiseError("LobbySocket disconnected");
	});
	//socket.on("doAction", (data: any) => {});
	socketState.appSocket = socket;
	applyAppAction(socket);
	applyLobbyAction(socket);
	return socket;
}

export const Login = {
	async tryLogin(name: string) {
		function onFailure(e: string) {
			RaiseError("로그인 실패 : " + e);
		}
		function onSuccess({ res }: { res: boolean }) {
			if (res) {
				connectSocket();
				appChannel.update({
					page: "lobby",
					user: {
						name: name,
					},
				});
				(socketState.appSocket as Socket).emit("users", {
					action: "updateUserInfo",
					params: {
						name: name,
					},
				});
			} else {
				onFailure("");
			}
		}
		fetch(serverUrl + "/auth/tryLogin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: name }),
		})
			.then(async (data: Response) => {
				onSuccess(await data.json());
			})
			.catch((e) => {
				onFailure(e);
			});
	},
	async tryLogout() {
		function onFailure() {
			RaiseError("로그아웃 실패");
		}
		function onSuccess({ res }: { res: boolean }) {
			if (res) {
				// 1. 페이지 리로드
				window.location.reload();
			} else {
				onFailure();
			}
		}
		fetch(serverUrl + "/auth/tryLogout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: appChannel.get().user.id as string,
			},
			body: JSON.stringify({ uid: appChannel.get().user.id }),
		})
			.then(async (data: Response) => {
				onSuccess(await data.json());
			})
			.catch(() => {
				onFailure();
			});
	},
};
