import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Map from "./Map";

export function EmptyFields({ open, setOpen }) {
	return (
		<Modal show={open} onHide={() => setOpen(false)} size="lg" centered>
			<Modal.Header>
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
		<Modal show={open} onHide={() => setOpen(false)} size="lg" centered>
			<Modal.Header>
				<Modal.Title>
					<h1>Error: User Not Found</h1>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h2>Incorrect username or password</h2>
			</Modal.Body>
			<Modal.Footer>
				<Button
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
	if (!listing) return;
	return (
		<Modal show={open} onHide={() => setOpen(false)} size="lg" centered>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					{listing.address}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>{listing.title}</h4>
				<p>{listing.description}</p>
				<Map />
			</Modal.Body>
			<Modal.Footer>
				<Button
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

export function PropertyView({ open, setOpen, property }) {
	return (
		<Modal show={open} onHide={() => setOpen(false)} size="lg" centered>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					{property.address}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Map />
			</Modal.Body>
			<Modal.Footer>
				<Button
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
