import { useRef } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { CenteredWrapper } from "../common/common";
import { Lobby } from "../../lobby/lobby.controller";

export function MakeNewRoom() {
	const nameRef = useRef<any>(null);
	return (
		<Form>
			<CenteredWrapper>
				<Col>
					<Form.Control
						type="text"
						ref={nameRef}
						placeholder="RoomName"
						style={{ width: "auto" }}
					/>
				</Col>
				<Col>
					<Button
						onClick={() => {
							Lobby.makeNewRoom(`${nameRef.current.value}`);
						}}
					>
						+
					</Button>
				</Col>
			</CenteredWrapper>
		</Form>
	);
}
