import { CSSProperties } from "react";

// 컴포넌트 가운데 정렬 wrapper
export function CenteredWrapper(props: any) {
	const defaultStyle: CSSProperties = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		width: "auto",
		height: "auto",
	};
	return (
		<div
			style={
				props.style
					? Object.assign(defaultStyle, props.style)
					: defaultStyle
			}
		>
			{props.children}
		</div>
	);
}
