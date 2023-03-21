import Container from "react-bootstrap/esm/Container";
import { LandlordRent, TenantRent } from "../components/Feed";

function Rent() {
	const storage = window.localStorage;

	const type = storage.getItem("type");

	return (
		<div className="rent-page">
			{type === "landlord" ? <LandlordRent /> : <TenantRent />}
		</div>
	);
}

export default Rent;
