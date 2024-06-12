import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Grid,
	Button,
	CircularProgress,
} from "@mui/material";
import { RecordType } from "../../Types/RecordType";
import { InitialCallout } from "../../Utils/Callouts";
import { useNavigate } from "react-router-dom";

function Dashboard({
	className,
	rows,
	setRows,
	setIsLoading,
}: {
	className: string;
	rows: RecordType[];
	setRows: React.Dispatch<React.SetStateAction<RecordType[]>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const navigate = useNavigate();
	const handleActionClick = ({ target }: any) => {
		switch (target.innerText) {
			case "RETRY":
				setIsLoading(true);
				const newRows = [...rows];
				const index = rows.length - 1;
				newRows[index].loading = true;
				setRows(newRows);
				InitialCallout()
					.then((response) => {
						console.log(response);
						newRows[index].actions[0].visible = true;
						newRows[index].actions[1].visible = false;
					})
					.catch((error) => {
						console.log(error);
					})
					.finally(() => {
						newRows[index].loading = false;
						setRows(newRows);
						setIsLoading(false);
					});
				break;
			case "VIEW":
				navigate(
					`analysis/${target.parentElement.attributes["project-name"].value}`
				);
				break;
		}
	};

	return (
		<main className={className}>
			<Grid
				container
				spacing={2}
				direction="column"
				justifyContent="center"
				sx={{ maxWidth: 4 / 5 }}
			>
				<Grid item alignSelf="flex-end"></Grid>
				<Grid item>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center">Name</TableCell>
									<TableCell align="center">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow key={row.name}>
										<TableCell align="center" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="center" scope="row">
											{row.loading ? (
												<CircularProgress size={"1.5rem"} />
											) : (
												row.actions
													.filter((action) => action.visible)
													.map((action, index) => (
														<Button
															key={index}
															variant="outlined"
															onClick={handleActionClick}
															project-name={row.name}
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
					</TableContainer>
				</Grid>
			</Grid>
		</main>
	);
}

export default Dashboard;
