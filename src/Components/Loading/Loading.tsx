import React from "react";
import { CircularProgress } from "@mui/material";

function Loading({ loading }: { loading?: boolean }) {
	return (
		<div
		// fixed inset-0 flex items-center justify-center z-20
			className={` ${
				loading ? "block" : "hidden"
			}`}
		>
			<CircularProgress size={"1.5rem"} />
		</div>
	);
}

export default Loading;
