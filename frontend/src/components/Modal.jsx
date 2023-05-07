import PersonIcon from "@mui/icons-material/Person";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/esm/Button";
import {
	addLandlordRating,
	addListing,
	addProperty,
	addPropertyRating,
	addTenantRating,
	deleteListing,
	deleteProperty,
	getActiveContracts,
	postInvoice,
	requestContract,
	signContract,
} from "../api/fetcher";
import useLocalStorage from "../hooks/useLocalStorage";
import Map from "./Map";

export function EmptyFields({ open, setOpen }) {
	return (
		<Modal
			className="error-modal"
			show={open}
			onHide={() => setOpen(false)}
			size="lg"
			centered
		>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>
					<h1>Error: Empty Fields</h1>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h2>
					Fields are missing. Make sure to select whether you are a tenant or
					landlord.
				</h2>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="close-btn"
					variant="secondary"
					type="button"
					onClick={() => setOpen(false)}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export function UserNotFound({ open, setOpen }) {
	return (
		<Modal
			className="error-modal"
			show={open}
			onHide={() => setOpen(false)}
			size="lg"
			centered
		>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>
					<h1>Error: User Not Found</h1>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h2>Incorrect username or password</h2>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="close-btn"
					variant="secondary"
					type="button"
					onClick={() => setOpen(false)}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export function ListingView({ open, setOpen, listing }) {
	const [user, setUser] = useLocalStorage("user", null);
	const [loading, setLoading] = useState(null);
	const handleRemove = async () => {
		setLoading(<Spinner />);
		await deleteListing(listing.listing_id);
		setOpen(false);
		window.location.reload(false);
	};
	const handleRequest = async () => {
		setLoading(<Spinner />);
		await requestContract(
			listing.landlord_id,
			user.tenant_id,
			listing.property_id
		);
		setOpen(false);
		window.location.reload(false);
	};

	// Handle closing
	useEffect(() => {
		if (open) return;
		setLoading(null);
		setOpen(false);
	}, [open]);

	if (!listing) return;
	return (
		<Modal
			className="listing-modal"
			show={open}
			onHide={() => setOpen(false)}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{listing.address}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>{listing.title}</h4>
				<p>{listing.description}</p>
				{listing.pictures.length == 0 ? null : (
					<Carousel variant="dark" interval={null}>
						{listing.pictures.map((value, index) => {
							return (
								<Carousel.Item key={index}>
									<img src={value} alt={`Image ${index}`} />
								</Carousel.Item>
							);
						})}
						<Carousel.Item>
							<Map address={listing.address} />
						</Carousel.Item>
					</Carousel>
				)}
				<div className="contact">
					<PersonIcon />
					{listing.landlord_first_name} {listing.landlord_last_name}
					<br />
					{listing.landlord_phone}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="close-btn"
					type="button"
					onClick={() => setOpen(false)}
				>
					Close
				</Button>
				{user.type == "landlord" ? (
					user.landlord_id != listing.landlord_id ? null : (
						<Button className="delete-btn" type="button" onClick={handleRemove}>
							Remove
						</Button>
					)
				) : (
					<Button className="add-btn" type="button" onClick={handleRequest}>
						Request
					</Button>
				)}
			</Modal.Footer>
			{loading}
		</Modal>
	);
}

export function PropertyView({ open, setOpen, property }) {
	const handleDelete = async () => {
		console.log("deleting property...");
		await deleteProperty(property.property_id);
		setOpen(false);
		window.location.reload(false);
	};
	if (!property) return;
	return (
		<Modal
			className="property-modal"
			show={open}
			onHide={() => setOpen(false)}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{property.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					Address: <br />
					{property.address}
				</p>
				<p>
					Bedrooms: <br />
					{property.bedrooms}
				</p>
				<p>
					Bathrooms: <br />
					{property.bathrooms}
				</p>
				{property.pictures.length == 0 ? null : (
					<Carousel variant="dark">
						{property.pictures.map((value, index) => {
							return (
								<Carousel.Item key={index}>
									<img src={value} alt={`Image ${index}`} />
								</Carousel.Item>
							);
						})}
					</Carousel>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="close-btn"
					type="button"
					onClick={() => setOpen(false)}
				>
					Close
				</Button>
				<Button className="delete-btn" type="submit" onClick={handleDelete}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export function AddPropertyView({ open, setOpen }) {
	// Property information
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [bedrooms, setBedrooms] = useState(0);
	const [bathrooms, setBathrooms] = useState(0);

	// Property images
	const [images, setImages] = useState([]);
	const handleFiles = async (files) => {
		// Check for files
		if (!files || files.length == 0) return;

		// Convert each file into base64
		for (let i = 0; i < files.length; i++) {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(files[i]);
			fileReader.onload = () => {
				setImages((prev) => [...prev, fileReader.result]);
			};
		}
	};

	// Log images
	useEffect(() => {
		if (images.length == 0) return;
		// console.log("Images: ", images);
	}, [images]);

	// Handle add property
	const [user, setUser] = useLocalStorage("user", null);
	const [loading, setLoading] = useState(null);
	const handleAdd = async () => {
		if (name == "" && address == "" && bathrooms == 0 && bedrooms == 0) {
			alert("Error: Missing fields.");
			return;
		}

		if (images.length == 0) {
			alert("Error: No images selected");
			return;
		}

		console.log({
			name: name,
			address: address,
			bedrooms: bedrooms,
			bathrooms: bathrooms,
			images: images,
		});

		setLoading(<Spinner />);
		await addProperty(
			user.landlord_id,
			name,
			address,
			bedrooms,
			bathrooms,
			images
		);
		setOpen(false);
		window.location.reload(false);
	};

	// Handle closing
	useEffect(() => {
		if (open) return;
		setName("");
		setAddress("");
		setBedrooms("");
		setBathrooms("");
		setImages([]);
		setLoading(null);
		setOpen(false);
	}, [open]);

	return (
		<Modal
			className="add-modal"
			show={open}
			onHide={() => setOpen(false)}
			size="lg"
			centered
		>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title id="contained-modal-title-vcenter">
					Add New Property
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="form-group">
						<Form.Label>Property Name</Form.Label>
						<Form.Control
							type="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Form.Text>
							Enter a name for your property. e.g. Apartment Calle Bosque
						</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Property Address</Form.Label>
						<Form.Control
							type="address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
						<Form.Text>Where is your apartment located?</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Bedrooms</Form.Label>
						<Form.Select onChange={(e) => setBedrooms(e.target.value)}>
							<option value={0}></option>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
								return (
									<option key={index} value={value}>
										{value}
									</option>
								);
							})}
						</Form.Select>
						<Form.Text>How many bedrooms?</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Bathrooms</Form.Label>
						<Form.Select onChange={(e) => setBathrooms(e.target.value)}>
							<option value={0}></option>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
								return (
									<option key={index} value={value}>
										{value}
									</option>
								);
							})}
						</Form.Select>
						<Form.Text>How many bathrooms?</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Images</Form.Label>
						<label className="image-input">
							<input
								type="file"
								accept="image/*"
								onChange={(e) => handleFiles(e.target.files)}
								value={undefined}
								multiple
							/>
							<span>Upload Images</span>
						</label>
						<Form.Text>Upload images of your property</Form.Text>
						{images.length == 0 ? null : (
							<Carousel variant="dark">
								{images.map((value, index) => {
									return (
										<Carousel.Item key={index}>
											<img src={value} alt={`Image ${index}`} />
										</Carousel.Item>
									);
								})}
							</Carousel>
						)}
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="close-btn"
					variant="secondary"
					type="button"
					onClick={() => setOpen(false)}
				>
					Cancel
				</Button>
				<Button
					className="add-btn"
					variant="secondary"
					type="button"
					onClick={handleAdd}
				>
					Add
				</Button>
			</Modal.Footer>
			{loading}
		</Modal>
	);
}

export function AddListingView({ properties, open, setOpen }) {
	const [property_id, setProperty_id] = useState(null);
	const [user, setUser] = useLocalStorage("user", null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [pet_flag, setPet_flag] = useState(null);
	const [price, setPrice] = useState(null);

	// Handle add listing
	const [loading, setLoading] = useState(null);
	const handleCreate = async () => {
		if (
			property_id == "" &&
			title == "" &&
			description == 0 &&
			pet_flag == null &&
			price == null
		) {
			alert("Error: Missing fields.");
			return;
		}

		if (price == "") {
			alert("Price must be a number");
			return;
		}

		console.log({
			landlord_id: user.landlord_id,
			property_id: property_id,
			title: title,
			description: description,
			pet_flag: pet_flag,
			price: price,
		});

		setLoading(<Spinner />);
		await addListing(
			user.landlord_id,
			property_id,
			title,
			description,
			pet_flag,
			price
		);
		setOpen(false);
		window.location.reload(false);
	};

	// Handle closing
	useEffect(() => {
		if (open) return;
		setProperty_id(null);
		setTitle("");
		setDescription("");
		setPet_flag(null);
		setPrice(null);
		setLoading(null);
		setOpen(false);
	}, [open]);

	if (!properties) return;

	return (
		<Modal
			className="add-modal"
			show={open}
			onHide={() => setOpen(false)}
			size="lg"
			centered
		>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title id="contained-modal-title-vcenter">
					Create Listing
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="form-group">
						<Form.Label>Property</Form.Label>
						<Form.Select
							onChange={(e) => setProperty_id(e.target.value)}
							style={{ display: "block", width: "20rem" }}
						>
							<option value={null}></option>
							{properties.map((p, i) => {
								return (
									<option key={i} value={p.property_id}>
										{p.name}
									</option>
								);
							})}
						</Form.Select>
						<Form.Text>Select the property you want to list.</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Title</Form.Label>
						<Form.Control
							onChange={(e) => setTitle(e.target.value)}
							type="text"
						/>
						<Form.Text>
							Give your listing a catchy title. e.g. Beautiful Apartment Near
							University
						</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Description</Form.Label>
						<Form.Control
							onChange={(e) => setDescription(e.target.value)}
							as="textarea"
							rows={3}
							type="text"
						/>
						<Form.Text>
							Feel free to share as much details as possible.
						</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Pets</Form.Label>
						<Form.Check
							onChange={(e) => setPet_flag(e.target.value)}
							value={true}
							inline
							label="Yes"
							name="pets"
							type="radio"
						/>
						<Form.Check
							onChange={(e) => setPet_flag(e.target.value)}
							inline
							value={false}
							label="No"
							name="pets"
							type="radio"
						/>
						<Form.Text>Are pets allowed?</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Price per month</Form.Label>
						<InputGroup style={{ width: "15rem" }}>
							<InputGroup.Text>$</InputGroup.Text>
							<Form.Control
								onChange={(e) => setPrice(e.target.value)}
								type="number"
							/>
							<InputGroup.Text>.00</InputGroup.Text>
						</InputGroup>
						<Form.Text>How much does it cost per month?</Form.Text>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="close-btn"
					variant="secondary"
					type="button"
					onClick={() => setOpen(false)}
				>
					Cancel
				</Button>
				<Button
					className="add-btn"
					variant="secondary"
					type="button"
					onClick={handleCreate}
				>
					Create
				</Button>
			</Modal.Footer>
			{loading}
		</Modal>
	);
}

export function PendingContractView({ open, setOpen, contract }) {
	// Dates
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);

	// PDF contract
	const [pdf, setPdf] = useState(null);
	const handleFile = async (file) => {
		// Convert each file into base64
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			setPdf(fileReader.result);
		};
	};

	const [loading, setLoading] = useState(null);
	const handleAccept = async () => {
		if (!start || !end || !pdf) {
			alert("Missing fields");
		}
		setLoading(<Spinner />);
		await signContract(contract.contract_id, start, end, pdf);
		setOpen(false);
		window.location.reload(false);
	};

	// Handle closing
	useEffect(() => {
		if (open) return;
		setStart(null);
		setEnd(null);
		setPdf(null);
		setLoading(null);
		setOpen(false);
	}, [open]);

	if (!contract) return;
	return (
		<Modal
			className="pending-contract-modal"
			show={open}
			onHide={() => setOpen(false)}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{contract.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					Requested by: {contract.tenant_first_name} {contract.tenant_last_name}{" "}
					(
					{contract.tenant_phone.substr(0, 3) +
						"-" +
						contract.tenant_phone.substr(3, 3) +
						"-" +
						contract.tenant_phone.substr(6, 4)}
					)
				</p>
				<Form>
					<Form.Group className="form-group">
						<Form.Label>Start Date</Form.Label>
						<Form.Control
							onChange={(e) => setStart(e.target.value)}
							type="date"
							placeholder="mm-dd-yyyy"
						/>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>End Date</Form.Label>
						<Form.Control
							onChange={(e) => setEnd(e.target.value)}
							type="date"
							placeholder="mm-dd-yyyy"
						/>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Contract PDF</Form.Label>
						<label className="pdf-input">
							<input
								type="file"
								accept="application/pdf"
								onChange={(e) => handleFile(e.target.files[0])}
								value={undefined}
							/>
							<span>Upload</span>
						</label>
						{!pdf ? null : (
							<a href={pdf} target="_blank">
								<PictureAsPdfIcon />
							</a>
						)}
						<Form.Text>Upload a pdf of your contract</Form.Text>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="close-btn"
					type="button"
					onClick={() => setOpen(false)}
				>
					Close
				</Button>
				<Button className="accept-btn" type="submit" onClick={handleAccept}>
					Accept
				</Button>
			</Modal.Footer>
			{loading}
		</Modal>
	);
}

export function RateContractView({ open, setOpen, contract }) {
	// User
	const [user, setUser] = useLocalStorage("user", null);

	// Loading flag
	const [loading, setLoading] = useState(null);

	// Ratings
	const [landlordRating, setLandlordRating] = useState(null);
	const [tenantRating, setTenantRating] = useState(null);
	const [propertyRating, setPropertyRating] = useState(null);
	const handleLandlordRating = async () => {
		if (!tenantRating) return alert("Missing Rating");
		await addTenantRating(
			contract.tenant_id,
			contract.landlord_id,
			tenantRating * 20
		);
	};
	const handleTenantRating = async () => {
		if (!landlordRating || !propertyRating) return alert("Missing Rating");
		await addLandlordRating(
			contract.landlord_id,
			contract.tenant_id,
			landlordRating * 20
		);
		await addPropertyRating(
			contract.tenant_id,
			contract.property_id,
			propertyRating * 20
		);
	};
	const handleRate = async () => {
		setLoading(<Spinner />);
		if (user.type == "landlord") {
			await handleLandlordRating();
		} else {
			await handleTenantRating();
		}
		setOpen(false);
		window.location.reload(false);
	};

	// Handle closing
	useEffect(() => {
		if (open) return;
		setLandlordRating(null);
		setTenantRating(null);
		setPropertyRating(null);
		setLoading(null);
		setOpen(false);
	}, [open]);

	useEffect(() => {
		console.log("Landlord Rating: ", landlordRating);
		console.log("Tenant Rating: ", tenantRating);
		console.log("Property Rating: ", propertyRating);
	}, [landlordRating, tenantRating, propertyRating]);

	if (!contract) return;
	return (
		<Modal
			className="rate-contract-modal"
			show={open}
			onHide={() => setOpen(false)}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Rate Contract: {contract.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{user.type == "landlord" ? (
					<Form>
						<Form.Group className="form-group">
							<Form.Label>Tenant Rating</Form.Label>
							<Rating
								name="tenant-rating"
								value={tenantRating}
								onChange={(e) => {
									setTenantRating(e.target.value);
								}}
							/>
							<Form.Text>How would you rate this tenant?</Form.Text>
						</Form.Group>
					</Form>
				) : (
					<Form>
						<Form.Group className="form-group">
							<Form.Label>Landlord Rating</Form.Label>
							<Rating
								name="landlord-rating"
								value={landlordRating}
								onChange={(e) => {
									setLandlordRating(e.target.value);
								}}
							/>
							<Form.Text>How would you rate this landlord?</Form.Text>
						</Form.Group>
						<Form.Group className="form-group">
							<Form.Label>Property Rating</Form.Label>
							<Rating
								name="property-rating"
								value={propertyRating}
								onChange={(e) => {
									setPropertyRating(e.target.value);
								}}
							/>
							<Form.Text>How would you rate this property?</Form.Text>
						</Form.Group>
					</Form>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="close-btn"
					type="button"
					onClick={() => setOpen(false)}
				>
					Close
				</Button>
				<Button className="submit-btn" type="submit" onClick={handleRate}>
					Submit
				</Button>
			</Modal.Footer>
			{loading}
		</Modal>
	);
}

export function CreateInvoiceView({ user, open, setOpen }) {
	// Contract information
	const [contracts, setContracts] = useState(null);
	const handleContracts = async () => {
		setContracts(getActiveContracts(user.landlord_id));
	};

	// Invoice parameters
	const [selectedContract, setSelectedContract] = useState(null);
	const [due, setDue] = useState(null);
	const [fee, setFee] = useState(null);
	const [total, setTotal] = useState(null);

	// Handle add listing
	const [loading, setLoading] = useState(null);
	const handleCreate = async () => {
		if (!due || !fee || !total) {
			alert("Error: Missing fields.");
			return;
		}
		console.log({
			contract: selectedContract,
			due: due,
			fee: fee,
			total: total,
		});

		setLoading(<Spinner />);
		await postInvoice(
			selectedContract.landlord_id,
			selectedContract.tenant_id,
			due,
			fee,
			total
		);
		setOpen(false);
		window.location.reload(false);
	};

	// Handle closing
	useEffect(() => {
		if (open) return;
		setSelectedContract(null);
		setDue(null);
		setFee(null);
		setTotal(null);
		setLoading(null);
		setOpen(false);
	}, [open]);

	if (!contracts) return <Spinner />;

	return (
		<Modal
			className="add-modal"
			show={open}
			onHide={() => setOpen(false)}
			size="lg"
			centered
		>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title id="contained-modal-title-vcenter">
					Create Invoice
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="form-group">
						<Form.Label>Contract</Form.Label>
						<Form.Select
							onChange={(e) => setContract(e.target.value)}
							style={{ display: "block", width: "20rem" }}
						>
							<option value={null}></option>
							{properties.map((p, i) => {
								return (
									<option key={i} value={p.property_id}>
										{p.name}
									</option>
								);
							})}
						</Form.Select>
						<Form.Text>Select the property you want to list.</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Title</Form.Label>
						<Form.Control
							onChange={(e) => setTitle(e.target.value)}
							type="text"
						/>
						<Form.Text>
							Give your listing a catchy title. e.g. Beautiful Apartment Near
							University
						</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Description</Form.Label>
						<Form.Control
							onChange={(e) => setDescription(e.target.value)}
							as="textarea"
							rows={3}
							type="text"
						/>
						<Form.Text>
							Feel free to share as much details as possible.
						</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Pets</Form.Label>
						<Form.Check
							onChange={(e) => setPet_flag(e.target.value)}
							value={true}
							inline
							label="Yes"
							name="pets"
							type="radio"
						/>
						<Form.Check
							onChange={(e) => setPet_flag(e.target.value)}
							inline
							value={false}
							label="No"
							name="pets"
							type="radio"
						/>
						<Form.Text>Are pets allowed?</Form.Text>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label>Price per month</Form.Label>
						<InputGroup style={{ width: "15rem" }}>
							<InputGroup.Text>$</InputGroup.Text>
							<Form.Control
								onChange={(e) => setPrice(e.target.value)}
								type="number"
							/>
							<InputGroup.Text>.00</InputGroup.Text>
						</InputGroup>
						<Form.Text>How much does it cost per month?</Form.Text>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="close-btn"
					variant="secondary"
					type="button"
					onClick={() => setOpen(false)}
				>
					Cancel
				</Button>
				<Button
					className="add-btn"
					variant="secondary"
					type="button"
					onClick={handleCreate}
				>
					Create
				</Button>
			</Modal.Footer>
			{loading}
		</Modal>
	);
}
