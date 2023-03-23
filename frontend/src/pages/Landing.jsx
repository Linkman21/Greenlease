import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { addUser, getUser } from "../api/fetcher";
import logo from "../assets/logo_dark.svg";
import { EmptyFields, UserNotFound } from "../components/Modal";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Landing() {
	// React-router navigation object
	const navigate = useNavigate();

	// Error handlers
	const [fieldErrorShow, setFieldErrorShow] = useState(false);
	const [userErrorShow, setUserErrorShow] = useState(false);

	// User details in local storage
	const [user, setUser] = useLocalStorage("user", null);

	// Login details
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState(user.password);
	const [type, setType] = useState(user.type);

	// Register details
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newType, setNewType] = useState("");

	// Handle user login procedure
	const handleLogin = async () => {
		// Check for empty fields
		if (email === "" || password === "" || type === "") {
			setFieldErrorShow(true);
			return;
		}

		// Check if user exists
		await setUser(
			await getUser({
				email: email,
				password: password,
				type: type,
			})
		);

		if (user === null) {
			setUserErrorShow(true);
			return;
		}

		navigate("/listings");
	};

	// Handle user registration procedure
	const handleRegister = async () => {
		if (
			newEmail === "" ||
			newPassword == "" ||
			newType == "" ||
			name == "" ||
			phone == ""
		) {
			setFieldErrorShow(true);
			return;
		}

		// Create user
		await setUser(
			await addUser({
				email: newEmail,
				password: newPassword,
				name: name,
				phone: phone,
				type: newType,
			})
		);

		if (user === null) {
			setUserErrorShow(true);
			return;
		}

		navigate("/listings");
	};

	return (
		<div className="landing-page">
			<Container>
				<Row>
					<Col xs={12}>
						<img src={logo} alt="Greenlease-Logo" />
					</Col>
					<Col xs={12}>
						<h1>Greenlease</h1>
					</Col>
				</Row>
				<Row>
					{/* Login */}
					<Col xs={12} md={5}>
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
					</Col>
					<Col xs={12} md={2}>
						<div className="divider"></div>
					</Col>
					{/* Register */}
					<Col xs={12} md={5}>
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
											value={newEmail}
											onChange={(e) => setNewEmail(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											value={newPassword}
											onChange={(e) => setNewPassword(e.target.value)}
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
											onClick={() => setNewType("tenant")}
										/>
									</Col>
									<Col>
										<Form.Check
											type="radio"
											label="Landlord"
											name="type"
											onClick={() => setNewType("landlord")}
										/>
									</Col>
								</Row>
							</Form.Group>

							<Button
								variant="secondary"
								type="button"
								onClick={handleRegister}
							>
								Register
							</Button>
						</Form>
					</Col>
				</Row>
				<EmptyFields open={fieldErrorShow} setOpen={setFieldErrorShow} />
				<UserNotFound open={userErrorShow} setOpen={setUserErrorShow} />
			</Container>
		</div>
	);
}
