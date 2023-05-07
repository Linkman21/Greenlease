import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import Authentication from "./pages/Authentication";

const Listings = lazy(() => import("./pages/Listings"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Payments = lazy(() => import("./pages/Payments"));

export default function App() {
	return (
		<Routes>
			<Route path="/authentication" element={<Authentication />} />
			<Route element={<PageLayout />}>
				<Route path="/" element={<Listings />} />
				<Route path="/Dashboard" element={<Dashboard />} />
				<Route path="/payments" element={<Payments />} />
			</Route>
		</Routes>
	);
}
