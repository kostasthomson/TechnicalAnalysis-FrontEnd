import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import TableRecordType from "../../Types/TableRecordType";
import { CalloutFunctions, UtilFunctions } from "../../Utils";

function AddNewProjectModal({
	open,
	rows,
	setOpen,
	setRows,
	setIsLoading,
}: {
	open: boolean;
	rows: TableRecordType[] | null;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setRows: React.Dispatch<React.SetStateAction<TableRecordType[] | null>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [errorText, setErrorText] = useState<string>("");

	const handleClose = () => {
		setErrorText("");
		setOpen(false);
	};

	const handleClick = (url: string) => {
		if (!rows) return;
		const newRow = UtilFunctions.getRow(url);
		if (rows.find((value) => value.name === newRow.name)) {
			setErrorText("Repository already analyzed");
			return;
		}
		handleClose();
		setIsLoading(true);
		const index = rows.length;
		let newRows = [...rows, newRow];
		setRows(newRows);
		CalloutFunctions.GetInitialCallout(url)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
				newRows[index].actions.forEach(
					(action: { label: string; visible: boolean }) => {
						action.visible = !action.visible;
					}
				);
			})
			.finally(() => {
				newRows[index].loading = false;
				setRows(newRows);
				setIsLoading(false);
			});
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				component: "form",
				onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
					const formData = new FormData(event.currentTarget);
					const formObj = Object.fromEntries((formData as any).entries());
					const url = formObj.repoUrl;
					if (!UtilFunctions.isValidURL(url, setErrorText)) return;
					handleClick(url);
				},
			}}
		>
			<DialogTitle>Add New Repository</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Provide repository's URL to analyze your project.
				</DialogContentText>
				<TextField
					autoFocus
					fullWidth
					margin="normal"
					id="repoUrl"
					name="repoUrl"
					label="Repository URL"
					type="text"
					variant="standard"
					error={errorText !== ""}
					helperText={errorText}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button type="submit">Analyze</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddNewProjectModal;
