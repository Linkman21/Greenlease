import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function PageLayout() {
	return (
		<>
			<Navigation />
			<div className="layout">
				<Outlet />
			</div>
		</>
	);
}
