import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { getListings, getProperties } from "../api/fetcher";
import { AddCard, ListingCards, PropertyCards } from "./Cards";
import Rating from "./Rating";

export function LandlordHome() {
	// Navigation object
	const navigate = useNavigate();

	// Landlord Rating
	const rating = 69;

	return (
		<>
			<Row>
				<div className="rating">
					<h2>Landlord Rating</h2>
					<Rating percentage={rating} />
				</div>
			</Row>
			<Row>
				<Button className="view-rent-btn" onClick={() => navigate("/rent")}>
					View Rent
				</Button>
			</Row>
			<Row>
				<Button
					className="view-payments-btn"
					onClick={() => navigate("/payments")}
				>
					View Payments
				</Button>
			</Row>
		</>
	);
}

export function LandlordRent() {
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

export function LandlordPayments() {
	return <div>Landlord Payments</div>;
}

export function TenantHome() {
	return <div>Tenant Home</div>;
}

export function TenantRent() {
	return <div>Tenant Rent</div>;
}

export function TenantPayments() {
	return <div>Tenant Payments</div>;
}
