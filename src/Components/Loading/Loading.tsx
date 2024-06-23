import React from "react";
import { CircularProgress } from "@mui/material";

function Loading({ loading }: { loading?: boolean }) {
	return (
		<div
			className={` ${
				loading ? "block" : "hidden"
			}`}
		>
			<CircularProgress size={"1.5rem"} />
		</div>
	);
}

export default Loading;
