import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Spinner from "react-bootstrap/Spinner";
import { ListingView, PropertyView } from "./Modal";

export function AddCard() {
	const [openView, setOpenView] = useState(false);
	return (
		<>
			<Col>
				<Card onClick={() => setOpenView(true)}>
					<Card.Body>
						<div className="add-text">
							Add
							<br />+
						</div>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
}

export function ListingCards({ listings }) {
	// Check if there are listings
	if (listings === null) {
		return <Spinner />;
	}

	return (
		<>
			{listings.map((value, index) => {
				const [openView, setOpenView] = useState(false);
				return (
					<Col key={index}>
						<Card onClick={() => setOpenView(true)}>
							<Card.Img variant="top" src={value.picture} />
							<Card.Body>
								<Card.Title>{value.name}</Card.Title>
								<Card.Text>${value.price}/month</Card.Text>
								<div className="address-label">
									<LocationOnOutlinedIcon
										style={{ color: "#209fa8", margin: "0 0.5rem 0 0.1rem" }}
									/>
									{value.address}
								</div>

								<div className="tags">
									<div className="tag">
										<BedOutlinedIcon className="icon" /> {value.bedrooms} bed
									</div>
									<div className="tag">
										<BathtubOutlinedIcon className="icon" />
										{value.bathrooms} bath
									</div>
									{!value.pet_flag ? null : (
										<div className="tag">
											<PetsOutlinedIcon className="icon" />
											Pet Friendly
										</div>
									)}
								</div>
							</Card.Body>
						</Card>
						<ListingView
							open={openView}
							setOpen={setOpenView}
							listing={value}
						/>
					</Col>
				);
			})}
		</>
	);
}

export function PropertyCards({ properties }) {
	// Check if there are properties
	if (!properties) {
		return null;
	}

	return (
		<>
			{properties.map((value, index) => {
				const [openView, setOpenView] = useState(false);
				return (
					<Col key={index}>
						<Card onClick={() => setOpenView(true)}>
							<Card.Img variant="top" src={value.picture} />
							<Card.Body>
								<Card.Title>{value.name}</Card.Title>
								<div className="address-label">
									<LocationOnOutlinedIcon
										style={{ color: "#209fa8", margin: "0 0.5rem 0 0.1rem" }}
									/>
									{value.address}
								</div>

								<div className="tags">
									<div className="tag">
										<BedOutlinedIcon className="icon" /> {value.bedrooms} bed
									</div>
									<div className="tag">
										<BathtubOutlinedIcon className="icon" />
										{value.bathrooms} bath
									</div>
								</div>
							</Card.Body>
						</Card>
						<PropertyView
							open={openView}
							setOpen={setOpenView}
							property={value}
						/>
					</Col>
				);
			})}
		</>
	);
}
