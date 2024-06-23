import TableRecordType from "../Types/TableRecordType";
import { CalloutFunctions } from "./";

export function createRow(name: string, loading?: boolean) {
	return {
		name: name,
		actions: [
			{ label: "view", visible: true },
			{ label: "export", visible: true },
			{ label: "delete", visible: true },
			{ label: "retry", visible: false },
		],
		loading: loading !== undefined ? loading : true,
	};
}

export const getRow = (url: string) => {
	url = url.replace(".git", "");
	let name: string = url.replace("https://github.com/", "");
	return createRow(name);
};

export const isValidURL = (
	input: string,
	setErrorText: React.Dispatch<React.SetStateAction<string>>
) => {
	if (input.match("https://github.com/[A-Za-z0-9_]+/[A-Za-z0-9-_]+(.git)?"))
		return true;
	setErrorText("Invalid repository url");
	return false;
};

export function retryInitialization(
	rows: TableRecordType[] | null,
	setRows: React.Dispatch<React.SetStateAction<TableRecordType[] | null>>,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
	if (!rows) return;
	setIsLoading(true);
	const newRows = [...rows];
	const index = rows.length - 1;
	newRows[index].loading = true;
	setRows(newRows);
	CalloutFunctions.GetInitialCallout()
		.then((response) => {
			newRows[index].actions.forEach(
				(action: { label: string; visible: boolean }) => {
					action.visible = !action.visible;
				}
			);
		})
		.catch((error) => {
			console.log(error);
		})
		.finally(() => {
			newRows[index].loading = false;
			setRows(newRows);
			setIsLoading(false);
		});
}

export function exportProject(name: string) {
	const fileName = name.replace("/", "_");
	CalloutFunctions.GetExportProjectCallout(fileName)
		.then((result) => {
			console.log(result.headers);
			const url = window.URL.createObjectURL(new Blob([result.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", fileName + ".csv");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		})
		.catch((error) => {
			console.log(error);
		});
}

export function deleteProject(name: string) {
	CalloutFunctions.PostProjectDelete(name)
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		})
		.finally(() => {
			window.location.reload();
		});
}
