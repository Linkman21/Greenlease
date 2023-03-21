import { Route, Routes } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Listings from "./pages/Listings";
import Payments from "./pages/Payments";
import Rent from "./pages/Rent";

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
