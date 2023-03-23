// const url = "";
const url = "http://127.0.0.1:5000";
// const url = "https://greenlease.herokuapp.com";

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
	var full_name = name.split(" ");
	var first_name = "";
	var last_name = "";

	for (var i in full_name) {
		if (first_name === "") {
			first_name = full_name[i];
		} else {
			last_name += full_name[i];
		}
	}

	const api =
		url +
		"/api/users/?email=" +
		email +
		"&password=" +
		password +
		"&first_name=" +
		first_name +
		"&last_name=" +
		last_name +
		"&phone=" +
		phone +
		"&type=" +
		type;

	const response = await fetch(api, { method: "POST" });
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}

// Properties
export async function getProperties(landlord_id) {
	const api = url + "/api/properties/?landlord_id=" + landlord_id;
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

export async function getListings(landlord_id) {
	const api = url + "/api/listings/?landlord_id=" + landlord_id;
	const response = await fetch(api);
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}
