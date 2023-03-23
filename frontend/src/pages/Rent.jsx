import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { getListings, getProperties } from "../api/fetcher";
import { AddCard, ListingCards, PropertyCards } from "../components/Cards";
import Rating from "../components/Rating";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Rent() {
	const [user, setUser] = useLocalStorage("user", null);

	return (
		<div className="rent-page">
			{user.type === "landlord" ? <LandlordRent /> : <TenantRent />}
		</div>
	);
}

function LandlordRent() {
	const [user, setUser] = useLocalStorage("user", null);

	// Landlord listings
	const [listings, setListings] = useState(null);
	const fetchListings = async () => {
		setListings(await getListings(user.landlord_id));
	};

	// Landlord properties
	const [properties, setProperties] = useState(null);
	const fetchProperties = async () => {
		setProperties(await getProperties(user.landlord_id));
	};

	// On component mount
	useEffect(() => {
		fetchListings();
		fetchProperties();
	}, []);

	// Render
	return (
		<>
			<Row>
				<h2>My Listings</h2>
			</Row>
			<Row xs="auto">
				<ListingCards listings={listings} />
				<AddCard />
			</Row>
			<Row>
				<h2>My Properties</h2>
			</Row>
			<Row xs="auto">
				<PropertyCards properties={properties} />
				<AddCard />
			</Row>
		</>
	);
}

export function TenantRent() {
	return <div>Tenant Rent</div>;
}
