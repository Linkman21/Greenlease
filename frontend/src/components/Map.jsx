import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

export default function Map({ address }) {
	// Google Maps Api Key
	const apiKey = "AIzaSyA6yY_cU0oAtUgzmfwNNdPZSaMbKnlHhvg";
	const defaultAddress = "Universidad de Puerto Rico, Mayaguez, Puerto Rico";

	// Address Coordinates
	const [pin, setPin] = useState(null);
	const getPin = async () => {
		try {
			const response = await fetch(
				"https://maps.googleapis.com/maps/api/geocode/json?address=" +
					address +
					"&key=" +
					apiKey
			);
			const data = await response.json();
			setPin(data.results[0].geometry.location);
		} catch (e) {
			console.log(e);
			console.log("Address not found, defaulting to UPRM");
			const response = await fetch(
				"https://maps.googleapis.com/maps/api/geocode/json?address=" +
					defaultAddress +
					"&key=" +
					apiKey
			);
			const data = await response.json();
			setPin(data.results[0].geometry.location);
		}
	};

	useEffect(() => {
		if (!address) return;
		getPin();
	}, []);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: apiKey,
		libraries: ["geometry", "drawing"],
	});

	if (!isLoaded) return <Spinner />;

	return (
		<GoogleMap mapContainerClassName="map" center={pin} zoom={15}>
			<MarkerF position={pin} />
		</GoogleMap>
	);
}
