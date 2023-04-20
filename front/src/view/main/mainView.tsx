import { Login } from "../../app/app.controller";
import { Button, Container, Row, Form } from "react-bootstrap";
import { CenteredWrapper } from "../common/common";
import { useRef } from "react";

export function MainView() {
	const nameRef = useRef<any>(null);
	const res = (
		<Container style={{ width: "auto" }}>
			<Row>
				<h1 style={{ textAlign: "center" }}>LOGIN</h1>
			</Row>
			<Row>
				<Form>
					<CenteredWrapper>
						<Form.Control
							type="text"
							ref={nameRef}
							placeholder="UserName"
							style={{ margin: 50 }}
						/>
					</CenteredWrapper>
					<CenteredWrapper>
						<Button
							onClick={() => {
								Login.tryLogin(`${nameRef.current.value}`);
							}}
						>
							CONNECT
						</Button>
					</CenteredWrapper>
				</Form>
			</Row>
		</Container>
	);
	return res;
}
