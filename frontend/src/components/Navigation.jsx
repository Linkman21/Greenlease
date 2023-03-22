import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo_dark.svg";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Navigation() {
	const navigate = useNavigate();

	const [name, setName] = useLocalStorage("name", "");

	return (
		<Navbar expand="sm" collapseOnSelect>
			<Container fluid>
				<Navbar.Brand href={"#/listings"}>
					<div className=".navbar-brand">
						<img
							alt="Logo"
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>
						Greenlease
					</div>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav activeKey={useLocation().pathname} className="me-auto">
						<Nav.Link eventKey={"/home"} onClick={() => navigate("/home")}>
							Home
						</Nav.Link>
						<Nav.Link eventKey={"/rent"} onClick={() => navigate("/rent")}>
							Rent
						</Nav.Link>
						<Nav.Link
							eventKey={"/payments"}
							onClick={() => navigate("/payments")}
						>
							Payments
						</Nav.Link>
					</Nav>
					<Nav>
						<Navbar.Text>
							Hi {name}! <a href="/">Sign out</a>
						</Navbar.Text>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
