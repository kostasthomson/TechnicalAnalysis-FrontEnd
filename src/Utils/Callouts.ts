import axios from "axios";

export const InitialCallout = async () => {
	const url = sessionStorage.getItem("url");
	if (!url) throw new Error("Url not found");
	return await axios.get(`http://127.0.0.1:8080/init`, {
		params: { link: url },
	});
};

export const GroupedCommitsCallout = async() => {
	return await axios.get("http://127.0.0.1:8080/commits/grouped");
}
