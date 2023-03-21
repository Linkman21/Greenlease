import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import { getAllListings } from "../api/fetcher";
import { ListingCards } from "../components/Cards";

export default function Listings() {
	const [listings, setListings] = useState(null);
	const getListings = async () => {
		setListings(await getAllListings());
	};

	useEffect(() => {
		getListings();
	}, [listings]);

	return (
		<>
			<Row>
				<Form className="search-bar">
					<Form.Control
						type="search"
						placeholder="Search"
						aria-label="Search"
					/>
					<Button variant="outline-success">Search</Button>
				</Form>
			</Row>
			<Row>
				<div className="filters">
					<Button className="filter-btn">Closest to UPRM</Button>
					<Button className="filter-btn">Pet Friendly</Button>
					<DropdownButton className="filter-dropdown" title="Beds">
						<Dropdown.Item eventKey="1">1</Dropdown.Item>
						<Dropdown.Item eventKey="2">2</Dropdown.Item>
						<Dropdown.Item eventKey="3">3</Dropdown.Item>
					</DropdownButton>
					<DropdownButton className="filter-dropdown" title="Baths">
						<Dropdown.Item eventKey="1">1</Dropdown.Item>
						<Dropdown.Item eventKey="2">2</Dropdown.Item>
						<Dropdown.Item eventKey="3">3</Dropdown.Item>
					</DropdownButton>
				</div>
			</Row>
			<Row xs="auto">
				<ListingCards listings={listings} />
			</Row>
		</>
	);
}
