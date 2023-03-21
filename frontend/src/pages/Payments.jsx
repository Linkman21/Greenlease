import Container from "react-bootstrap/esm/Container";
import { LandlordPayments, TenantPayments } from "../components/Feed";

function Payments() {
	const storage = window.localStorage;

	const type = storage.getItem("type");

	return (
		<div className="payments-page">
			{type === "landlord" ? <LandlordPayments /> : <TenantPayments />}
		</div>
	);
}

export default Payments;
