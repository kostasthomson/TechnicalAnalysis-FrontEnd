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
import { RecordType } from "../../Types/RecordType";
import { InitialCallout } from "../../Utils/Callouts";

function NewAnalysisModal({
	open,
	rows,
	setOpen,
	setRows,
	setIsLoading,
}: {
	open: boolean;
	rows: RecordType[];
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setRows: React.Dispatch<React.SetStateAction<RecordType[]>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [errorText, setErrorText] = useState<string>("");

	const handleClose = () => {
		setErrorText("");
		setOpen(false);
	};

	const createRow = (url: string) => {
		url = url.replace(".git", "");
		let name: string = url.replace("https://github.com/", "");
		let actions = [
			{ label: "view", visible: true },
			{ label: "retry", visible: false },
		];
		return { name, actions, loading: true };
	};

	const isValidURL = (input: string) => {
		if (input.match("https://github.com/[A-Za-z0-9_]+/[A-Za-z0-9-_]+(.git)?"))
			return true;
		setErrorText("Invalid repository url");
		return false;
	};

	const handleClick = (url: string) => {
		const newRow = createRow(url);
		if (rows.find((value) => value.name === newRow.name)) {
			setErrorText("Repository already analyzed");
			return;
		}
		handleClose();
		sessionStorage.setItem("url", url);
		sessionStorage.setItem("newRow", JSON.stringify(newRow));
		setIsLoading(true);
		const index = rows.length;
		let newRows = [...rows, newRow];
		setRows(newRows);
		InitialCallout()
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
				newRows[index].actions[0].visible = false;
				newRows[index].actions[1].visible = true;
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
					if (!isValidURL(url)) return;
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

export default NewAnalysisModal;
