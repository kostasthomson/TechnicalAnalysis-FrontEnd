import { RecordType } from "../Types/RecordType";
import { GetExportProjectCallout, GetInitialCallout } from "./Callouts";

export function createRow(name: string, loading?: boolean) {
	return {
		name: name,
		actions: [
			{ label: "view", visible: true },
			{ label: "export", visible: true },
			{ label: "retry", visible: false },
		],
		loading: loading !== undefined ? loading : true,
	};
}

export function retryInitialization(
	rows: RecordType[] | null,
	setRows: React.Dispatch<React.SetStateAction<RecordType[] | null>>,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
	if (!rows) return;
	setIsLoading(true);
	const newRows = [...rows];
	const index = rows.length - 1;
	newRows[index].loading = true;
	setRows(newRows);
	GetInitialCallout()
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
	console.log("Exporting");
	const fileName = name.replace("/", "_");
	GetExportProjectCallout(fileName)
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
