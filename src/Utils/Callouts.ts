import axios from "axios";

const host = process.env.REACT_APP_HOST;

export async function GetInitialCallout(url?: string) {
	if (url) sessionStorage.setItem("url", url);
	else {
		let storageUrl = sessionStorage.getItem("url");
		if (storageUrl) url = storageUrl;
		else throw new Error("Url not found");
	}
	return await axios.get(`${host}/api/init`, {
		params: { link: url },
	});
}

export async function GetGroupedCommitsCallout(projectName: string) {
	return await axios.get(`${host}/api/commits/grouped`, {
		params: { projectName: projectName },
	});
}

export async function GetProjectsCallout() {
	return await axios.get(`${host}/api/projects`);
}

export async function GetProjectMaxTdCallout(projectName: string) {
	return await axios.get(`${host}/api/projects/max-td`, {
		params: { projectName: projectName },
	});
}

export async function PostProjectDelete(name: string) {
	return await axios.delete(`${host}/api/projects/delete`, {
		params: { projectName: name },
	});
}

export async function GetExportProjectCallout(name: string) {
	return await axios.get(`${host}/api/export`, {
		params: { fileName: name },
		responseType: "blob",
	});
}