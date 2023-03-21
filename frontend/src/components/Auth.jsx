import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/fetcher";

export function Login({ setFieldErrorShow, setUserErrorShow }) {
	// React-router navigation object
	const navigate = useNavigate();

	// Local Storage object
	const storage = window.localStorage;

	// Fields
	const [email, setEmail] = useState("heisenberg@gmail.com");
	const [password, setPassword] = useState("123");
	const [type, setType] = useState("");

	// Handle user login procedure
	const handleLogin = async () => {
		// Check for empty fields
		if (email === "" || password == "" || type == "") {
			setFieldErrorShow(true);
			return;
		}

		// Check if user exists
		const user = await getUser({
			email: email,
			password: password,
			type: type,
		});

		if (user === null) {
			setUserErrorShow(true);
			return;
		}

		navigate("/listings");
	};

	useEffect(() => {
		storage.setItem("name", "Walter");
		storage.setItem("phone", "1234567890");
		storage.setItem("email", email);
		storage.setItem("password", password);
		storage.setItem("type", type);
	}, [email, password, type]);

	return (
		<Form>
			<h2>Login</h2>
			<Form.Group className="mb-3">
				<Form.Label>Email</Form.Label>
				<Form.Control
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Row>
					<Col>
						<Form.Check
							type="radio"
							label="Tenant"
							name={type}
							onClick={() => setType("tenant")}
						/>
					</Col>
					<Col>
						<Form.Check
							type="radio"
							label="Landlord"
							name={type}
							onClick={() => setType("landlord")}
						/>
					</Col>
				</Row>
			</Form.Group>

			<Button variant="secondary" type="button" onClick={handleLogin}>
				Login
			</Button>
		</Form>
	);
}

export function Register({ setFieldErrorShow }) {
	// React-router navigation object
	const navigate = useNavigate();

	// User attributes
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [type, setType] = useState("");

	// Handle user registration procedure
	const handleRegister = () => {
		if (
			email === "" ||
			password == "" ||
			type == "" ||
			name == "" ||
			phone == ""
		) {
			setFieldErrorShow(true);
			return;
		}

		navigate("/listings");
	};

	useEffect(() => {
		window.localStorage.setItem("name", name);
		window.localStorage.setItem("phone", phone);
		window.localStorage.setItem("email", email);
		window.localStorage.setItem("password", password);
		window.localStorage.setItem("type", type);
	}, [name, phone, email, password, type]);

	return (
		<Form>
			<h2>Register</h2>
			<Row>
				<Col xs={12} sm={6}>
					<Form.Group className="mb-3">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Phone</Form.Label>
						<Form.Control
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col xs={12} sm={6}>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>

			<Form.Group className="mb-3">
				<Row>
					<Col>
						<Form.Check
							type="radio"
							label="Tenant"
							name="type"
							onClick={() => setType("tenant")}
						/>
					</Col>
					<Col>
						<Form.Check
							type="radio"
							label="Landlord"
							name="type"
							onClick={() => setType("landlord")}
						/>
					</Col>
				</Row>
			</Form.Group>

			<Button variant="secondary" type="button" onClick={handleRegister}>
				Register
			</Button>
		</Form>
	);
}
