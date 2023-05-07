import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/esm/Row";
import {
	getActiveContracts,
	getCurrentContract,
	getLandlordRating,
	getListings,
	getPendingContracts,
	getProperties,
	getTenantRating,
} from "../api/fetcher";
import {
	ActiveContractCards,
	AddListingCard,
	AddPropertyCard,
	CurrentContractCards,
	ListingCards,
	PendingContractCards,
	PropertyCards,
} from "../components/Cards";
import Rating from "../components/Rating";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Dashboard() {
	const [user, setUser] = useLocalStorage("user", null);
	return (
		<div className="dashboard">
			{user.type === "landlord" ? (
				<LandlordDashboard user={user} />
			) : (
				<TenantDashboard user={user} />
			)}
		</div>
	);
}

function LandlordDashboard({ user }) {
	// Landlord rating
	const [rating, setRating] = useState(0);
	const fetchRating = async () => {
		setRating(await getLandlordRating(user.landlord_id));
	};

	// Landlord pending contracts
	const [pendingContracts, setPendingContracts] = useState(null);
	const fetchPendingContracts = async () => {
		setPendingContracts(await getPendingContracts(user.landlord_id));
	};

	// Landlord active contracts
	const [activeContracts, setActiveContracts] = useState(null);
	const fetchActiveContracts = async () => {
		setActiveContracts(await getActiveContracts(user.landlord_id));
	};

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
		fetchRating();
		fetchPendingContracts();
		fetchActiveContracts();
		fetchListings();
		fetchProperties();
	}, []);

	// Debug
	// useEffect(() => {
	// 	console.log(loaded);
	// }, [loaded]);

	// Render
	if (!pendingContracts || !activeContracts || !listings || !properties)
		return <Spinner />;

	return (
		<>
			<Row>
				<div className="rating">
					<h2>Landlord Rating</h2>
					<Rating percentage={rating} />
				</div>
			</Row>
			<Accordion flush alwaysOpen>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						Pending Contracts ({pendingContracts.length})
					</Accordion.Header>
					<Accordion.Body>
						<Row xs="auto">
							<PendingContractCards pendingContracts={pendingContracts} />
						</Row>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						Active Contracts ({activeContracts.length})
					</Accordion.Header>
					<Accordion.Body>
						<Row xs="auto">
							<ActiveContractCards activeContracts={activeContracts} />
						</Row>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>My Listings ({listings.length})</Accordion.Header>
					<Accordion.Body>
						<Row xs="auto">
							<AddListingCard properties={properties} />
							<ListingCards listings={listings} />
						</Row>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="3">
					<Accordion.Header>
						My Properties ({properties.length})
					</Accordion.Header>
					<Accordion.Body>
						<Row xs="auto">
							<AddPropertyCard />
							<PropertyCards properties={properties} />
						</Row>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</>
	);
}

function TenantDashboard({ user }) {
	// Tenant rating
	const [rating, setRating] = useState(0);
	const fetchRating = async () => {
		setRating(await getTenantRating(user.tenant_id));
	};

	// Current Contract
	const [currentContract, setCurrentContract] = useState(null);
	const fetchCurrentContract = async () => {
		setCurrentContract(await getCurrentContract(user.tenant_id));
	};

	useEffect(() => {
		fetchRating();
		fetchCurrentContract();
	}, []);

	if (!currentContract) return <Spinner />;
	return (
		<>
			<Row>
				<div className="rating">
					<h2>Tenant Rating</h2>
					<Rating percentage={rating} />
				</div>
			</Row>
			<Row xs="auto" className="current-contracts">
				<CurrentContractCards currentContracts={currentContract} />
			</Row>
		</>
	);
}
