import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { getAllListings, getFilteredListings } from "../api/fetcher";
import { ListingCards } from "../components/Cards";

export default function Listings() {
	// Listings
	const [listings, setListings] = useState(null);
	const fetchListings = async () => {
		setListings(await getAllListings());
	};
	const fetchFilteredListings = async () => {
		setListings(await getFilteredListings(bedrooms, bathrooms, pets));
	};

	// Search
	const [search, setSearch] = useState(null);
	const handleSearch = () => {
		console.log(search);
	};

	// Bedrooms
	const [bedrooms, setBedrooms] = useState(null);
	const [bedsButton, setBedsButton] = useState("off");
	useEffect(() => {
		if (!bedrooms) {
			setBedsButton("off");
			return;
		}
		setBedsButton("on");
		console.log("Bedrooms: ", bedrooms);
	}, [bedrooms]);

	// Bathrooms
	const [bathrooms, setBathrooms] = useState(null);
	const [bathsButton, setBathsButton] = useState("off");
	useEffect(() => {
		if (!bathrooms) {
			setBathsButton("off");
			return;
		}
		setBathsButton("on");
		console.log("Bathrooms: ", bathrooms);
	}, [bathrooms]);

	// Pets
	const [pets, setPets] = useState(null);
	const [petsButton, setPetsButton] = useState("off");
	useEffect(() => {
		if (!pets) {
			setPetsButton("off");
			return;
		}
		setPetsButton("on");
		console.log("Pets: ", pets);
	}, [pets]);

	// Clear filters
	const handleClear = () => {
		if (!bathrooms && !pets && !bedrooms) return;
		setListings(null);
		setBathrooms(null);
		setBedrooms(null);
		setPets(null);
		fetchListings();
		console.log("Cleared Filters");
	};

	// Fetch listings on render
	useEffect(() => {
		fetchListings();
	}, []);

	// Fetch filtered listings
	useEffect(() => {
		if (!pets && !bathrooms && !bedrooms) {
			return;
		}
		setListings(null);
		fetchFilteredListings();
	}, [bathrooms, bedrooms, pets]);

	return (
		<>
			<Row>
				<Form className="search-bar">
					<Form.Control
						type="search"
						placeholder="Search"
						aria-label="Search"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button onClick={handleSearch}>Search</Button>
				</Form>
			</Row>
			<Row>
				<div className="filters">
					<Button className="clear" onClick={handleClear}>
						Clear
					</Button>
					<Button className={petsButton} onClick={() => setPets(!pets)}>
						Pet Friendly
					</Button>
					<DropdownButton
						className={bedsButton}
						title={!bedrooms ? "Beds" : "Beds:" + bedrooms}
					>
						<Dropdown.Item eventKey="1" onClick={() => setBedrooms(1)}>
							1
						</Dropdown.Item>
						<Dropdown.Item eventKey="2" onClick={() => setBedrooms(2)}>
							2
						</Dropdown.Item>
						<Dropdown.Item eventKey="3" onClick={() => setBedrooms(3)}>
							3
						</Dropdown.Item>
					</DropdownButton>
					<DropdownButton
						className={bathsButton}
						title={!bathrooms ? "Baths" : "Baths:" + bathrooms}
					>
						<Dropdown.Item eventKey="1" onClick={() => setBathrooms(1)}>
							1
						</Dropdown.Item>
						<Dropdown.Item eventKey="2" onClick={() => setBathrooms(2)}>
							2
						</Dropdown.Item>
						<Dropdown.Item eventKey="3" onClick={() => setBathrooms(3)}>
							3
						</Dropdown.Item>
					</DropdownButton>
				</div>
			</Row>
			<Row xs="auto">
				<ListingCards listings={listings} />
			</Row>
		</>
	);
}
