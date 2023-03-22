import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
	const [type, setType] = useLocalStorage("type", "");

	return (
		<div className="home-page">
			{type === "landlord" ? <LandlordHome /> : <TenantHome />}
		</div>
	);
}

function LandlordHome() {
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

export function TenantHome() {
	return <div>Tenant Home</div>;
}
