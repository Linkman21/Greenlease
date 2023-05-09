// Users
export async function getUser({ email, password, type }) {
	const api =
		"/api/users/?email=" + email + "&password=" + password + "&type=" + type;
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

	if (last_name === "") {
		last_name = "No Lastname";
	}

	const api =
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
	const api = "/api/properties/?landlord_id=" + landlord_id;
	const response = await fetch(api);
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}

export async function addProperty(
	landlord_id,
	name,
	address,
	bedrooms,
	bathrooms,
	images
) {
	const api = `/api/properties/?landlord_id=${landlord_id}&bedrooms=${bedrooms}&bathrooms=${bathrooms}`;
	// const api =
	// 	"/api/properties/?landlord_id=1&name=%235 Calle Bosque Mayagüez, PR 00680&address=%235 Calle Bosque Mayagüez, PR 00680&bedrooms=1&bathrooms=1";
	// console.log(api);

	try {
		const response = await fetch(api, {
			method: "POST",
			body: JSON.stringify({ name, address, images }),
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		const data = await response.json();

		if (data === "Not Found") {
			return null;
		}
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function deleteProperty(property_id) {
	const api = `/api/properties/?property_id=${property_id}`;
	try {
		const response = await fetch(api, { method: "DELETE" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
	}
}

// Listings
export async function getAllListings() {
	const api = "/api/listings";
	const response = await fetch(api);
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}

export async function getListings(landlord_id) {
	const api = "/api/listings/?landlord_id=" + landlord_id;
	const response = await fetch(api);
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}

export async function getFilteredListings(search, beds, baths, pets) {
	if (!search) search = "";
	if (!beds) beds = "";
	if (!baths) baths = "";
	if (!pets) pets = "";

	const api =
		"/api/listings/filters/?search=" +
		search +
		"&bedrooms=" +
		beds +
		"&bathrooms=" +
		baths +
		"&pets=" +
		pets;

	const response = await fetch(api);
	const data = await response.json();

	if (data === "Not Found") {
		return null;
	}

	return data;
}

export async function addListing(
	landlord_id,
	property_id,
	title,
	description,
	pet_flag,
	price
) {
	const api = `/api/listings/?landlord_id=${landlord_id}&property_id=${property_id}&pet_flag=${pet_flag}&price=${price}`;

	try {
		const response = await fetch(api, {
			method: "POST",
			body: JSON.stringify({ title, description }),
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		const data = await response.json();

		if (data === "Not Found") {
			return null;
		}
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function deleteListing(listing_id) {
	const api = `/api/listings/?listing_id=${listing_id}`;
	try {
		const response = await fetch(api, { method: "DELETE" });
		const data = await response.json();

		if (data === "Not Found") {
			return null;
		}
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

// Ratings
export async function getLandlordRating(landlord_id) {
	const api = `/api/ratings/landlord/?landlord_id=${landlord_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return parseInt(data);
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getTenantRating(tenant_id) {
	const api = `/api/ratings/tenant/?tenant_id=${tenant_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return parseInt(data);
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function addLandlordRating(landlord_id, tenant_id, rating) {
	const api = `/api/ratings/landlord/?landlord_id=${landlord_id}&tenant_id=${tenant_id}&rating=${rating}`;
	try {
		const response = await fetch(api, { method: "POST" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function addTenantRating(tenant_id, landlord_id, rating) {
	const api = `/api/ratings/tenant/?tenant_id=${tenant_id}&landlord_id=${landlord_id}&rating=${rating}`;
	try {
		const response = await fetch(api, { method: "POST" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getPropertyRating(property_id) {
	const api = `/api/ratings/property/?property_id=${property_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function addPropertyRating(tenant_id, property_id, rating) {
	const api = `/api/ratings/property/?tenant_id=${tenant_id}&property_id=${property_id}&rating=${rating}`;
	try {
		const response = await fetch(api, { method: "POST" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

// Contracts
export async function requestContract(landlord_id, tenant_id, property_id) {
	const api = `/api/contracts/request/?landlord_id=${landlord_id}&tenant_id=${tenant_id}&property_id=${property_id}`;
	try {
		const response = await fetch(api, { method: "POST" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getPendingContracts(landlord_id) {
	const api = `/api/contracts/pending/?landlord_id=${landlord_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getActiveContracts(landlord_id) {
	const api = `/api/contracts/active/?landlord_id=${landlord_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getCurrentContract(tenant_id) {
	const api = `/api/contracts/current/?tenant_id=${tenant_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function signContract(
	contract_id,
	date_start,
	date_end,
	pdf,
	price
) {
	const api = `/api/contracts/sign/?contract_id=${contract_id}&date_start=${date_start}&date_end=${date_end}&price=${price}`;
	try {
		const response = await fetch(api, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(pdf),
		});
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function deleteContract(contract_id) {
	const api = `/api/contracts/delete/?contract_id=${contract_id}`;
	try {
		const response = await fetch(api, { method: "DELETE" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

// Invoices
export async function postInvoice(contract_id, date_due, late_fee) {
	const api = `/api/invoices/post/?contract_id=${contract_id}&date_due=${date_due}&late_fee=${late_fee}`;
	try {
		const response = await fetch(api, { method: "POST" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getInvoicesPendingLandlord(landlord_id) {
	const api = `/api/invoices/pending/landlord/?landlord_id=${landlord_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getInvoicesPaidLandlord(landlord_id) {
	const api = `/api/invoices/paid/landlord/?landlord_id=${landlord_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getInvoicesTotalLandlord(landlord_id) {
	const api = `/api/invoices/total/landlord/?landlord_id=${landlord_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getInvoicesPendingTenant(tenant_id) {
	const api = `/api/invoices/pending/tenant/?tenant_id=${tenant_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getInvoicesPaidTenant(tenant_id) {
	const api = `/api/invoices/paid/tenant/?tenant_id=${tenant_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getInvoicesTotalTenant(tenant_id) {
	const api = `/api/invoices/total/tenant/?tenant_id=${tenant_id}`;
	try {
		const response = await fetch(api, { method: "GET" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function payInvoice(invoice_id, total_paid) {
	const api = `/api/invoices/pay/?invoice_id=${invoice_id}&total_paid=${total_paid}`;
	try {
		const response = await fetch(api, { method: "PUT" });
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}
