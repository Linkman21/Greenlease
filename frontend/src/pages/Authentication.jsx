import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
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
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [type, setType] = useState("");

	// Register details
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newType, setNewType] = useState("");

	// Handle user login procedure
	const [loadingLogin, setLoadingLogin] = useState(false);
	const handleLogin = async () => {
		setLoadingLogin(true);
		// Check for empty fields
		if (email === "" || password === "" || type === "") {
			setFieldErrorShow(true);
			setLoadingLogin(false);
			return;
		}
		// Check if user exists
		const checkUser = await getUser({
			email: email,
			password: password,
			type: type,
		});

		if (checkUser === null) {
			setUserErrorShow(true);
			setLoadingLogin(false);
			return;
		}

		setUser(checkUser);

		navigate("/");
	};

	// Handle user registration procedure
	const [loadingRegister, setLoadingRegister] = useState(false);
	const handleRegister = async () => {
		setLoadingRegister(true);
		if (
			newEmail === "" ||
			newPassword == "" ||
			newType == "" ||
			name == "" ||
			phone == ""
		) {
			setFieldErrorShow(true);
			setLoadingRegister(false);
			return;
		}

		// Create user
		const createUser = await addUser({
			email: newEmail,
			password: newPassword,
			name: name,
			phone: phone,
			type: newType,
		});

		if (createUser === null) {
			setUserErrorShow(true);
			setLoadingRegister(false);
			return;
		}

		setUser(createUser);

		navigate("/");
	};

	useEffect(() => {
		if (!user) {
			return;
		}
		setEmail(user.email);
		setPassword(user.password);
		setType(user.type);
		return () => {
			setLoadingLogin(false);
			setLoadingRegister(false);
		};
	}, []);

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
											onChange={() => setType("tenant")}
											checked={type === "tenant" ? true : false}
										/>
									</Col>
									<Col>
										<Form.Check
											type="radio"
											label="Landlord"
											name={type}
											onChange={() => setType("landlord")}
											checked={type === "landlord" ? true : false}
										/>
									</Col>
								</Row>
							</Form.Group>

							<Button variant="secondary" type="button" onClick={handleLogin}>
								{loadingLogin ? <Spinner className="loading-btn" /> : "Login"}
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
											pattern="[0-9]"
											value={phone}
											onChange={(e) =>
												setPhone(
													e.target.value
														.replace(/[^0-9.]/g, "")
														.replace(/(\..*)\./g, "$1")
												)
											}
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
								{loadingRegister ? (
									<Spinner className="loading-btn" />
								) : (
									"Register"
								)}
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
