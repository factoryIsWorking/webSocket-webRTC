import { Channel } from "../common/common.type";

export class Room {
	uid: string;
	name: string;
	users: string[];
	constructor({ uid, name, users }: Room) {
		this.uid = uid;
		this.name = name;
		this.users = users;
	}
}

export type LobbyModel = {
	roomList: Room[];
};

export const lobbyChannel: Channel<LobbyModel> = new Channel({
	roomList: [],
});
