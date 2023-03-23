import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function PageLayout() {
	return (
		<>
			<Navigation />
			<Suspense fallback={<Spinner />}>
				<div className="layout">
					<Outlet />
				</div>
			</Suspense>
		</>
	);
}
