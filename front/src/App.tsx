import { MainView } from "./view/main/mainView";
import { LobbyView } from "./view/lobby/lobbyView";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { CenteredWrapper } from "./view/common/common";
//import { IngameView } from "./view/ingameView";
import { appChannel, Pages } from "./app/app.model";

export function App() {
	const [page, setPage] = useState<Pages>(appChannel.get().page);
	appChannel.subscribe((state: any) => {
		setPage(state.page);
	});

	const Pages = {
		main: <MainView />,
		lobby: <LobbyView />,
		ingame: <div>this is ingame</div>,
	};
	return (
		<Container
			style={{ backgroundColor: "white", width: "100%", height: "100%" }}
			fluid
		>
			<CenteredWrapper style={{ width: "100%", height: "100%" }}>
				{Pages[page]}
			</CenteredWrapper>
		</Container>
	);
}
