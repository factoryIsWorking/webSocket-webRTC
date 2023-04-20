import { Button, Container, Row, Form } from "react-bootstrap";
import { CenteredWrapper } from "../common/common";
import { RoomList } from "./roomList";
import { Room, lobbyChannel } from "../../lobby/lobby.model";
import { useEffect, useState } from "react";
import { Lobby } from "../../lobby/lobby.controller";

export function LobbyView() {
	const [roomList, setRoomList] = useState<Room[]>(
		lobbyChannel.get().roomList
	);
	lobbyChannel.subscribe((state: any) => {
		setRoomList(state.roomList);
	});
	useEffect(() => {
		Lobby.getRoomList();
	}, []);
	const res = (
		<Container style={{ width: "auto" }}>
			<Row>
				<CenteredWrapper style={{ width: 250, height: 250 }}>
					<h1 style={{ textAlign: "center" }}>Lobby</h1>
				</CenteredWrapper>
			</Row>
			<Row>
				<CenteredWrapper>
					<RoomList roomList={roomList} />
				</CenteredWrapper>
			</Row>
			<Row>
				<CenteredWrapper>
					<Button
						onClick={() => {
							Lobby.getRoomList();
						}}
					>
						refresh
					</Button>
				</CenteredWrapper>
			</Row>
		</Container>
	);
	return res;
}
