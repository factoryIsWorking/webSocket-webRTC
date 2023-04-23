import { Injectable } from "@nestjs/common";
import { Room as ClientRoom, User as ClientUser } from "src/type/common.type";
import { Room, User } from "src/type/domestic.type";
import { lobbyState } from "src/model/Models";
import { Socket } from "dgram";

// 대상 유저들에게 일괄적으로 이벤트 반환
export function emitForEach(targets: User[], event: string, data?: any) {
	for (const user of targets) {
		user.sockets.lobby.emit(event, data);
	}
}
// 전체 유저에게 접속 정보 갱신 요청
function refreshListAll() {
	const roomList = _getRoomList();
	emitForEach(
		Array.from(lobbyState.users.values()) as User[],
		"1.getRoomList",
		roomList
	);
}

// 클라이언트를 관리대상으로 추가
export function _addClient(socket: Socket, { name, id }: ClientUser): void {
	// 1. 요청들어온 소켓으로 유저 생성
	// 2. 로비 상태에 유저 추가
	// 3. 소켓 오너 설정
	const newUser = new User(name, id);
	newUser.sockets.lobby = socket;
	lobbyState.users.set(id, newUser);
	lobbyState.socketOwner.set(socket, newUser);
}

// 방 목록 반환
export function _getRoomList(): ClientRoom[] {
	return Array.from(
		Array.from(lobbyState.roomList.values()).map((e: Room) => e.parse())
	);
}

//방생성
export function _makeRoom(name: string, maker: ClientUser): ClientRoom {
	//1. 새 방 객체 생성, 생성자를 바로 유저 목록에 추가
	//2. 로비 상태에 방 추가
	//3. refreshListAll
	const res = new Room(name, lobbyState.users.get(maker.id));
	lobbyState.roomList.set(res.id, res);

	refreshListAll();
	return res.parse();
}

export function _joinRoom(
	cliUser: ClientUser,
	cliRoom: ClientRoom
): ClientRoom {
	//1. 접속 대상 방 조회
	//2. 방에 유저 정보 입력
	//3. 유저의 방정보 업데이트
	//3. refreshListAll
	const user = lobbyState.users.get(cliUser.id);
	const room = lobbyState.roomList.get(cliRoom.id) as Room;
	room.users.set(cliUser.id, user);
	user.room = room;
	refreshListAll();
	return room.parse();
}

export function _exitRoom(user: ClientUser, cliRoom?: ClientRoom): boolean {
	//1. 접속 대상 방 조회
	//2. 방에서 유저 정보삭제
	//3. 방이 빌경우 삭제 진행
	//4. 유저 방정보 = null
	//4. refreshListAll
	const room = lobbyState.roomList.get(cliRoom.id);
	room.users.delete(user.id);
	if (room.users.size === 0) {
		_destroyRoom(cliRoom);
	}
	lobbyState.users.get(user.id).room = null;
	refreshListAll();
	return true;
}

export function _destroyRoom(cliRoom: ClientRoom): boolean {
	//1. 방을 로비에서 삭제
	//2. 로비 유저들에게 방목록 갱신 요청
	lobbyState.roomList.get(cliRoom.id).destroy();
	lobbyState.roomList.delete(cliRoom.id);
	refreshListAll();
	return true;
}

export function _removeUser(user: ClientUser) {
	//1. 유저 정보 획득
	//2. 유저의 방정보 획득, _exitRoom
	//3. 로비 상태 유저목록에서 제거
	//4. 소켓 오너 해제
	//5. 로비 유저들에게 방목록 갱신 요청
	const userData = lobbyState.users.get(user.id);
	if (userData.room !== null) {
		_exitRoom(user, userData.room.parse());
	}
	userData.destroy();
	lobbyState.users.delete(user.id);
}

@Injectable()
export class LobbyService {}
