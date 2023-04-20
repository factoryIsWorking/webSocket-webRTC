import { Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { CenteredWrapper } from "../common/common";
import { Room } from "../../lobby/lobby.model";
import { MakeNewRoom } from "./makeNewRoom";

export function RoomItem({ room }: { room: Room }) {
	return (
		<Container>
			<Row>
				<h1>{room.name}</h1>
				<h3>{room.uid}</h3>
			</Row>
			<Row>
				<h4>{`users : ${room.users.join(", ")}`}</h4>
			</Row>
		</Container>
	);
}

export function RoomList({ roomList }: { roomList: Room[] }) {
	const itemList = roomList.map((room: Room) => (
		<RoomItem key={room.uid} room={room} />
	));
	const res = (
		<Container style={{ width: "auto" }}>
			<ListGroup>
				{[
					...roomList.map((room: Room) => (
						<ListGroupItem key={room.uid}>
							<RoomItem room={room} />
						</ListGroupItem>
					)),
					<ListGroupItem key="makeRoom">
						<CenteredWrapper key={"addButton"}>
							<MakeNewRoom />
						</CenteredWrapper>
					</ListGroupItem>,
				]}
			</ListGroup>
		</Container>
	);
	return res;
}
