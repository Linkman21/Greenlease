import Container from "react-bootstrap/esm/Container";
import { LandlordHome, TenantHome } from "../components/Feed";

function Home() {
	const storage = window.localStorage;

	const type = storage.getItem("type");

	return (
		<div className="home-page">
			{type === "landlord" ? <LandlordHome /> : <TenantHome />}
		</div>
	);
}

export default Home;
