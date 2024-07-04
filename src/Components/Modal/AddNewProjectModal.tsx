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
import { CalloutFunctions, UtilFunctions } from "../../Utils";
import { ModalType } from "../../Types/FunctionType";

function AddNewProjectModal({
	className,
	open,
	rows,
	setOpen,
	setRows,
	setIsLoading,
}: ModalType) {
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
			<DialogTitle sx={{ textAlign: "center", fontSize: "1.5rem" }}>
				Add new project
			</DialogTitle>
			<DialogContent sx={{ marginLeft: "4rem", marginRight: "5rem" }}>
				<DialogContentText sx={{ fontStyle: "italic", fontSize: "1rem" }}>
					Provide repository's URL to analyze your project.
				</DialogContentText>
				<TextField
					sx={{ marginTop: "3rem", fontSize: "1.75rem" }}
					autoFocus
					fullWidth
					margin="normal"
					id="repoUrl"
					name="repoUrl"
					label="Repository's URL"
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
