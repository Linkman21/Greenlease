import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo_dark.svg";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Navigation() {
	const navigate = useNavigate();

	const [user, setUser] = useLocalStorage("user", null);

	return (
		<Navbar expand="sm" collapseOnSelect>
			<Container fluid>
				<Navbar.Brand onClick={() => navigate("/")}>
					<img alt="Logo" src={logo} />
					<h1>Greenlease</h1>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				{!user ? (
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav activeKey={useLocation().pathname} className="me-auto"></Nav>
						<Nav>
							<Navbar.Text>
								<a href="/authentication">Login</a>
							</Navbar.Text>
						</Nav>
					</Navbar.Collapse>
				) : (
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav activeKey={useLocation().pathname} className="me-auto">
							<Nav.Link
								eventKey={"/dashboard"}
								onClick={() => navigate("/dashboard")}
							>
								Dashboard
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
								Hi {user.first_name}! <a href="/authentication">Sign out</a>
							</Navbar.Text>
						</Nav>
					</Navbar.Collapse>
				)}
			</Container>
		</Navbar>
	);
}
