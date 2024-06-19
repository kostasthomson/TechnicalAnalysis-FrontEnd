import axios from "axios";

const host = process.env.REACT_APP_HOST;

export async function GetInitialCallout() {
	const url = sessionStorage.getItem("url");
	if (!url) throw new Error("Url not found");
	return await axios.get(`${host}/init`, {
		params: { link: url },
	});
}

export async function GetGroupedCommitsCallout(projectName: string) {
	return await axios.get(`${host}/commits/grouped`, {
		params: { projectName: projectName },
	});
}

export async function GetProjectsCallout() {
	return await axios.get(`${host}/projects`);
}

export async function GetProjectMaxTdCallout(projectName: string) {
	return await axios.get(`${host}/projects/max-td`, {
		params: { projectName: projectName },
	});
}

export async function GetExportProjectCallout(name: string) {
	return await axios.get(`${host}/export`, {
		params: { fileName: name },
		responseType: "blob",
	});
}
