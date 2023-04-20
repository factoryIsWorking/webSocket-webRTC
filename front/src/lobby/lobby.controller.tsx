import { Socket } from "socket.io-client";
import { socketState } from "../app/socket.model";
import { ActionRequest } from "../app/socket.type";
import { Room, lobbyChannel } from "./lobby.model";
import { appChannel } from "../app/app.model";
import { RaiseError } from "../common/util";
import config from "../config";

const { serverUrl } = config;

const LOBBY = "lobby";

export function applyLobbyAction(socket: Socket) {
	const dealAction = {
		recieveRoomList(roomList: Room[]) {
			lobbyChannel.update({
				roomList: roomList.map((room) => {
					return new Room(room);
				}),
			});
		},
		roomDestroyed() {
			appChannel.update({
				page: "lobby",
			});
		},
	};
	socket.on(LOBBY, ({ action, params }: ActionRequest) => {
		dealAction[action as keyof typeof dealAction](params);
	});
}

export const Lobby = {
	getRoomList() {
		(socketState.appSocket as Socket).emit(LOBBY, {
			action: "getRoomList",
		});
	},
	makeNewRoom(name: string) {
		function onFailure(e: string) {
			RaiseError("방생성 실패 : " + e);
		}
		const onSuccess = ({ roomId }: { roomId: string }) => {
			this.joinRoom(roomId);
		};
		fetch(serverUrl + "/lobby/createRoom", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: appChannel.get().user.id as string,
			},
			body: JSON.stringify({ name: name }),
		})
			.then(async (data: Response) => {
				onSuccess(await data.json());
			})
			.catch((e) => {
				onFailure(e);
			});
	},
	joinRoom(roomId: string) {
		function onFailure(e: string) {
			RaiseError("방 입장 실패 : " + e);
		}
		const onSuccess = (room: Room) => {
			console.log("해당 정보로 업데이트 : " + room);
		};
		fetch(serverUrl + "/lobby/joinRoom", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: appChannel.get().user.id as string,
			},
			body: JSON.stringify({
				roomId: roomId,
			}),
		})
			.then(async (data: Response) => {
				onSuccess(await data.json());
			})
			.catch((e) => {
				onFailure(e);
			});
	},
};
