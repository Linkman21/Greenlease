import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/esm/Col";
import { deleteContract, getPropertyRating } from "../api/fetcher";
import {
	AddListingView,
	AddPropertyView,
	ListingView,
	PendingContractView,
	PropertyView,
	RateContractView,
} from "./Modal";

export function AddPropertyCard() {
	const [openView, setOpenView] = useState(false);
	return (
		<>
			<Col>
				<Card className="property-card" onClick={() => setOpenView(true)}>
					<Card.Body>
						<div className="add-text">
							Add
							<br />+
						</div>
					</Card.Body>
				</Card>
			</Col>
			<AddPropertyView open={openView} setOpen={setOpenView} />
		</>
	);
}

export function AddListingCard({ properties }) {
	const [openView, setOpenView] = useState(false);
	return (
		<>
			<Col>
				<Card className="listing-card" onClick={() => setOpenView(true)}>
					<Card.Body>
						<div className="add-text">
							Add
							<br />+
						</div>
					</Card.Body>
				</Card>
			</Col>
			<AddListingView
				properties={properties}
				open={openView}
				setOpen={setOpenView}
			/>
		</>
	);
}

export function ListingCards({ listings, filtered }) {
	const [currentListing, setCurrentListing] = useState(null);
	const [openView, setOpenView] = useState(false);

	// Check if there are listings
	if (listings === null) {
		return <Spinner />;
	}

	if (listings.length === 0 && filtered) {
		return <Container>No matches found.</Container>;
	}

	return (
		<>
			{listings.map((listing, index) => {
				return (
					<Col key={index}>
						<Card
							onClick={() => {
								setCurrentListing(listing);
								setOpenView(true);
							}}
							className="listing-card"
						>
							<Card.Img variant="top" src={listing.pictures[0]} />
							<Card.Body>
								<Card.Title>{listing.title}</Card.Title>
								<Card.Text>${listing.price}/month</Card.Text>
								<Rating
									value={parseInt(listing.property_rating) / 20}
									readOnly
								/>
								<div className="address-label">
									<LocationOnOutlinedIcon
										style={{ color: "#209fa8", margin: "0 0.5rem 0 0.1rem" }}
									/>
									{listing.address}
								</div>
								<div className="tags">
									<div className="tag">
										<BedOutlinedIcon className="icon" /> {listing.bedrooms} bed
									</div>
									<div className="tag">
										<BathtubOutlinedIcon className="icon" />
										{listing.bathrooms} bath
									</div>
									{!listing.pet_flag ? null : (
										<div className="tag">
											<PetsOutlinedIcon className="icon" />
											Pet Friendly
										</div>
									)}
								</div>
							</Card.Body>
						</Card>
					</Col>
				);
			})}
			<ListingView
				open={openView}
				setOpen={setOpenView}
				listing={currentListing}
			/>
		</>
	);
}

export function PropertyCards({ properties }) {
	// Check if there are properties
	if (!properties) {
		return null;
	}

	return (
		<>
			{properties.map((value, index) => {
				const [openView, setOpenView] = useState(false);
				return (
					<Col key={index}>
						<Card className="property-card" onClick={() => setOpenView(true)}>
							<Card.Img variant="top" src={value.pictures[0]} />
							<Card.Body>
								<Card.Title>{value.name}</Card.Title>
								<div className="address-label">
									<LocationOnOutlinedIcon
										style={{ color: "#209fa8", margin: "0 0.5rem 0 0.1rem" }}
									/>
									{value.address}
								</div>

								<div className="tags">
									<div className="tag">
										<BedOutlinedIcon className="icon" /> {value.bedrooms} bed
									</div>
									<div className="tag">
										<BathtubOutlinedIcon className="icon" />
										{value.bathrooms} bath
									</div>
								</div>
							</Card.Body>
						</Card>
						<PropertyView
							open={openView}
							setOpen={setOpenView}
							property={value}
						/>
					</Col>
				);
			})}
		</>
	);
}

export function ActiveContractCards({ activeContracts }) {
	const [openView, setOpenView] = useState(false);
	if (!activeContracts) return;
	return (
		<>
			{activeContracts.map((contract, index) => {
				return (
					<Col key={index}>
						<Card className="active-contract-card">
							<Card.Header>Active</Card.Header>
							<Card.Body>
								<Card.Title>{contract.name}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									Starts: {new Date(contract.date_start).toLocaleDateString()}
									<br />
									Ends: {new Date(contract.date_end).toLocaleDateString()}
									<br />
									Price: ${contract.price}/month
								</Card.Subtitle>
								<ListGroup variant="flush">
									<ListGroup.Item>
										Tenant: {contract.tenant_first_name}{" "}
										{contract.tenant_last_name}
										<br />
										{`(${contract.tenant_phone.substr(
											0,
											3
										)}) ${contract.tenant_phone.substr(
											3,
											3
										)}-${contract.tenant_phone.substr(6, 4)}`}
									</ListGroup.Item>
									<ListGroup.Item>
										Landlord: {contract.landlord_first_name}{" "}
										{contract.landlord_last_name}
										<br />
										{`(${contract.landlord_phone.substr(
											0,
											3
										)}) ${contract.landlord_phone.substr(
											3,
											3
										)}-${contract.landlord_phone.substr(6, 4)}`}
									</ListGroup.Item>
								</ListGroup>
								<Button
									className="contract-btn"
									href={contract.pdf}
									target="_blank"
								>
									View Contract <PictureAsPdfIcon />
								</Button>
								<Button className="rate-btn" onClick={() => setOpenView(true)}>
									Rate Contract
								</Button>
							</Card.Body>
						</Card>
						<RateContractView
							open={openView}
							setOpen={setOpenView}
							contract={contract}
						/>
					</Col>
				);
			})}
		</>
	);
}

export function PendingContractCards({ pendingContracts }) {
	const [openView, setOpenView] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleRevoke = async (contract_id) => {
		setLoading(true);
		await deleteContract(contract_id);
		setLoading(false);
		window.location.reload(false);
	};
	if (!pendingContracts) return;
	return (
		<>
			{pendingContracts.map((contract, index) => {
				return (
					<Col key={index}>
						<Card className="pending-contract-card">
							<Card.Header>Pending</Card.Header>
							<Card.Body>
								<Card.Title>{contract.name}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									Requested by:
								</Card.Subtitle>
								<Card.Text>
									Name: {contract.tenant_first_name} {contract.tenant_last_name}
									<br />
									Phone:{" "}
									{`(${contract.tenant_phone.substr(
										0,
										3
									)}) ${contract.tenant_phone.substr(
										3,
										3
									)}-${contract.tenant_phone.substr(6, 4)}`}
								</Card.Text>
								<Button
									className="deny-btn"
									onClick={() => handleRevoke(contract.contract_id)}
								>
									{loading ? <Spinner className="loading-btn" /> : "Deny"}
								</Button>
								<Button
									className="accept-btn"
									onClick={() => setOpenView(true)}
								>
									Accept
								</Button>
							</Card.Body>
						</Card>
						<PendingContractView
							open={openView}
							setOpen={setOpenView}
							contract={contract}
						/>
					</Col>
				);
			})}
		</>
	);
}

export function CurrentContractCards({ currentContracts }) {
	const [openView, setOpenView] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleRevoke = async (contract_id) => {
		setLoading(true);
		await deleteContract(contract_id);
		setLoading(false);
		window.location.reload(false);
	};
	if (!currentContracts) return;
	return (
		<>
			{currentContracts.map((contract, index) => {
				return contract.date_start ? (
					<Col key={index}>
						<Card className="active-contract-card">
							<Card.Header>Active</Card.Header>
							<Card.Body>
								<Card.Title>{contract.name}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									Starts: {new Date(contract.date_start).toLocaleDateString()}
									<br />
									Ends: {new Date(contract.date_end).toLocaleDateString()}
									<br />
									Price: ${contract.price}/month
								</Card.Subtitle>
								<ListGroup variant="flush">
									<ListGroup.Item>
										Tenant: {contract.tenant_first_name}{" "}
										{contract.tenant_last_name}
										<br />
										{`(${contract.tenant_phone.substr(
											0,
											3
										)}) ${contract.tenant_phone.substr(
											3,
											3
										)}-${contract.tenant_phone.substr(6, 4)}`}
									</ListGroup.Item>
									<ListGroup.Item>
										Landlord: {contract.landlord_first_name}{" "}
										{contract.landlord_last_name}
										<br />
										{`(${contract.landlord_phone.substr(
											0,
											3
										)}) ${contract.landlord_phone.substr(
											3,
											3
										)}-${contract.landlord_phone.substr(6, 4)}`}
									</ListGroup.Item>
								</ListGroup>
								<Button
									className="contract-btn"
									href={contract.pdf}
									target="_blank"
								>
									View Contract <PictureAsPdfIcon />
								</Button>
								<Button className="rate-btn" onClick={() => setOpenView(true)}>
									Rate Contract
								</Button>
							</Card.Body>
						</Card>
						<RateContractView
							open={openView}
							setOpen={setOpenView}
							contract={contract}
						/>
					</Col>
				) : (
					<Col key={index}>
						<Card className="pending-contract-card">
							<Card.Header>Pending</Card.Header>
							<Card.Body>
								<Card.Title>{contract.name}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									Landlord Details:
								</Card.Subtitle>
								<ListGroup variant="flush">
									<ListGroup.Item>
										Name: {contract.landlord_first_name}{" "}
										{contract.landlord_last_name}
										<br />
										Phone:{" "}
										{`(${contract.landlord_phone.substr(
											0,
											3
										)}) ${contract.landlord_phone.substr(
											3,
											3
										)}-${contract.landlord_phone.substr(6, 4)}`}
									</ListGroup.Item>
								</ListGroup>
								<Button
									className="deny-btn"
									onClick={() => handleRevoke(contract.contract_id)}
								>
									{loading ? <Spinner className="loading-btn" /> : "Revoke"}
								</Button>
							</Card.Body>
						</Card>
					</Col>
				);
			})}
		</>
	);
}
