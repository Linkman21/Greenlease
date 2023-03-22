// const url = ""
// const url = "http://127.0.0.1:5000";
const url = "https://greenlease.herokuapp.com";

// Users
export async function getUser({ email, password, type }) {
	const api =
		url +
		"/api/users/?email=" +
		email +
		"&password=" +
		password +
		"&type=" +
		type;
	const response = await fetch(api);
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}

export async function addUser({ email, password, name, phone, type }) {
	const api = url + "/api/users/?email=" + email + "&password=" + password;
	const response = await fetch(api);
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}

// Properties
export async function getProperties(user_id) {
	const api = url + "/api/properties/?user_id=" + user_id;
	const response = await fetch(api);
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}

// Listings
export async function getAllListings() {
	const api = url + "/api/listings";
	const response = await fetch(api);
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}

export async function getListings(user_id) {
	const api = url + "/api/listings/?user_id:" + user_id;
	const response = await fetch(api);
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}
