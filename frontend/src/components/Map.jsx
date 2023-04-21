import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

export default function Map({ address }) {
	// Google Maps Api Key
	const apiKey = "AIzaSyA6yY_cU0oAtUgzmfwNNdPZSaMbKnlHhvg";

	// Address Coordinates
	const [pin, setPin] = useState(null);
	const getPin = async () => {
		const response = await fetch(
			"https://maps.googleapis.com/maps/api/geocode/json?address=" +
				address +
				"&key=" +
				apiKey
		);
		const data = await response.json();
		setPin(data.results[0].geometry.location);

		console.log("Address: ", address);
		console.log("Pin: ", data.results[0]);
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
		<GoogleMap
			mapContainerStyle={{ width: "auto", height: "400px" }}
			center={pin}
			zoom={15}
		>
			<MarkerF position={pin} />
		</GoogleMap>
	);
}
