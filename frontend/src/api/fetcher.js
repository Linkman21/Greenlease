export async function getUser({ email, password, type }) {
	const api = "/Greenlease/data/users.json";
	const response = await fetch(api);
	const data = await response.json();

	var result = null;
	// result = [];

	for (var index in data) {
		console.log(data[index]);
		if (
			data[index].email == email &&
			data[index].password == password &&
			data[index].type == type
		) {
			result = data[index];
		}
	}

	return result;
}

export async function getProperties(user_id) {
	const api = "/Greenlease/data/properties.json";
	const response = await fetch(api);
	const data = await response.json();

	var result = [];

	for (var index in data) {
		// console.log(data[index]);
		if (data[index].landlord_id === user_id) {
			result.push(data[index]);
		}
	}

	return result;
}

export async function getListings(user_id) {
	const api = "/Greenlease/data/listings.json";
	const response = await fetch(api);
	const data = await response.json();

	var result = [];

	for (var index in data) {
		// console.log(data[index]);
		if (data[index].landlord_id === user_id) {
			result.push(data[index]);
		}
	}

	return result;
}

export async function getAllListings() {
	const api = "/Greenlease/data/listings.json";
	const response = await fetch(api);
	const data = await response.json();

	var result = [];

	for (var index in data) {
		// console.log(data[index]);

		result.push(data[index]);
	}

	return result;
}
