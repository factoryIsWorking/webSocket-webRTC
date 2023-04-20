import { Channel } from "../common/common.type";

export type Pages = "main" | "lobby" | "ingame";

export type AppModel = {
	page: Pages;
	user: {
		name: string | null;
		id: string;
	};
};

export const appChannel: Channel<AppModel> = new Channel({
	page: "main",
	user: {
		name: null,
		id: "",
	},
});
