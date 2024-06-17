import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
	CircularProgress,
} from "@mui/material";
import { RecordType } from "../../Types/RecordType";
import { useNavigate } from "react-router-dom";
import { exportProject, retryInitialization } from "../../Utils/Utils";

function Dashboard({
	className,
	rows,
	setRows,
	setIsLoading,
}: {
	className: string;
	rows: RecordType[]|null;
	setRows: React.Dispatch<React.SetStateAction<RecordType[]|null>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const navigate = useNavigate();
	const handleActionClick = (label: string, projectName: string) => {
		switch (label.toUpperCase()) {
			case "RETRY":
				retryInitialization(rows, setRows, setIsLoading);
				break;
			case "EXPORT":
				exportProject(projectName);
				break;
			case "VIEW":
				navigate(`analysis/${projectName}`);
				break;
		}
	};
	return (
		<main className={className}>
			{!rows ? (
				<CircularProgress size={"1.5rem"} />
			) : (
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ width: "50%" }} align="center">
								Name
							</TableCell>
							<TableCell sx={{ width: "50%" }} align="center">
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.name}>
								<TableCell sx={{ width: "50%" }} align="center">
									{row.name}
								</TableCell>
								<TableCell sx={{ width: "50%" }} align="center">
									{row.loading ? (
										<CircularProgress size={"1.5rem"} />
									) : (
										row.actions
											.filter((action) => action.visible)
											.map((action, index) => (
												<Button
													key={index}
													variant="outlined"
													sx={{ marginLeft: "1rem" }}
													onClick={() =>
														handleActionClick(action.label, row.name)
													}
												>
													<span>{action.label}</span>
												</Button>
											))
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</main>
	);
}

export default Dashboard;
