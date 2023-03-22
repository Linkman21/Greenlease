import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { getListings, getProperties } from "../api/fetcher";
import { AddCard, ListingCards, PropertyCards } from "../components/Cards";
import Rating from "../components/Rating";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Rent() {
	const [type, setType] = useLocalStorage("type", "");

	return (
		<div className="rent-page">
			{type === "landlord" ? <LandlordRent /> : <TenantRent />}
		</div>
	);
}

function LandlordRent() {
	// Landlord listings
	const [listings, setListings] = useState(null);
	const fetchListings = async () => {
		setListings(await getListings(0));
	};

	// Landlord properties
	const [properties, setProperties] = useState(null);
	const fetchProperties = async () => {
		setProperties(await getProperties(0));
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
