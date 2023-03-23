import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PageLayout from "./layout/PageLayout";

const Landing = lazy(() => import("./pages/Landing"));
const Listings = lazy(() => import("./pages/Listings"));
const Home = lazy(() => import("./pages/Home"));
const Rent = lazy(() => import("./pages/Rent"));
const Payments = lazy(() => import("./pages/Payments"));

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route element={<PageLayout />}>
				<Route path="/listings" element={<Listings />} />
				<Route path="/home" element={<Home />} />
				<Route path="/rent" element={<Rent />} />
				<Route path="/payments" element={<Payments />} />
			</Route>
		</Routes>
	);
}
