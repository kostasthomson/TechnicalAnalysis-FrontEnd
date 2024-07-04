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
import { useNavigate } from "react-router-dom";
import { UtilFunctions } from "../../Utils";
import { DashboardType } from "../../Types/FunctionType";

function Dashboard({ className, rows, setRows, setIsLoading }: DashboardType) {
	const navigate = useNavigate();
	const handleActionClick = (label: string, projectName: string) => {
		switch (label.toUpperCase()) {
			case "RETRY":
				UtilFunctions.retryInitialization(rows, setRows, setIsLoading);
				break;
			case "DELETE":
				UtilFunctions.deleteProject(projectName);
				break;
			case "EXPORT":
				UtilFunctions.exportProject(projectName);
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
													sx={{ marginLeft: "1rem" }}
													title={action.label.toUpperCase()}
													variant="contained"
													color="blue500"
													onClick={() =>
														handleActionClick(action.label, row.name)
													}
												>
													<action.icon />
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
