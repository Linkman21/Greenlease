import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { getListings, getProperties } from "../api/fetcher";
import { AddCard, ListingCards, PropertyCards } from "../components/Cards";
import Rating from "../components/Rating";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Payments() {
	const [user, setUser] = useLocalStorage("user", null);

	return (
		<div className="payments-page">
			{user.type === "landlord" ? <LandlordPayments /> : <TenantPayments />}
		</div>
	);
}

export function LandlordPayments() {
	return <div>Landlord Payments</div>;
}

function TenantPayments() {
	return <div>Tenant Payments</div>;
}
