import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import {
	getActiveContracts,
	getInvoicesPaidLandlord,
	getInvoicesPaidTenant,
	getInvoicesPendingLandlord,
	getInvoicesPendingTenant,
	getInvoicesTotalLandlord,
	getInvoicesTotalTenant,
	getListings,
	getProperties,
} from "../api/fetcher";
import AthMovil from "../components/AthMovil";
import { CreateInvoiceView } from "../components/Modal";
import Rating from "../components/Rating";
import useExternalScripts from "../hooks/useExternalScript";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Payments() {
	const [user, setUser] = useLocalStorage("user", null);

	return (
		<div className="payments">
			{user.type === "landlord" ? (
				<LandlordPayments user={user} />
			) : (
				<TenantPayments user={user} />
			)}
		</div>
	);
}

function LandlordPayments({ user }) {
	// Landlord pending payments
	const [pendingPayments, setPendingPayments] = useState(null);
	const fetchPendingPayments = async () => {
		setPendingPayments(await getInvoicesPendingLandlord(user.landlord_id));
	};

	// Landlord pending payments
	const [totalRevenue, setTotalRevenue] = useState(null);
	const fetchTotalRevenue = async () => {
		setTotalRevenue(await getInvoicesTotalLandlord(user.landlord_id));
	};

	// Landlord past contracts
	const [pastPayments, setPastPayments] = useState(null);
	const fetchPastPayments = async () => {
		setPastPayments(await getInvoicesPaidLandlord(user.landlord_id));
	};

	// Contract information
	const [contracts, setContracts] = useState(null);
	const fetchContracts = async () => {
		setContracts(await getActiveContracts(user.landlord_id));
	};

	// Modal handling
	const [openView, setOpenView] = useState(false);

	// On component mount
	useEffect(() => {
		fetchTotalRevenue();
		fetchPendingPayments();
		fetchPastPayments();
		fetchContracts();
	}, []);

	if (!pendingPayments || !pastPayments) return <Spinner />;

	// Render
	return (
		<>
			<Row>
				Total Revenue
				<div className="total">${!totalRevenue ? 0 : totalRevenue}</div>
				<Button className="invoice-btn" onClick={() => setOpenView(true)}>
					Create Invoice +
				</Button>
			</Row>
			<Accordion flush alwaysOpen>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						Pending Payments ({pendingPayments.length})
					</Accordion.Header>
					<Accordion.Body>
						<Row xs="auto">
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Contract</th>
										<th>Issued</th>
										<th>Due</th>
										<th>Late Fee</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>
									{pendingPayments.map((invoice, index) => {
										return (
											<tr key={index}>
												<td>{invoice.contract_name}</td>
												<td>
													{new Date(invoice.date_issued).toLocaleDateString()}
												</td>
												<td>
													{new Date(invoice.date_due).toLocaleDateString()}
												</td>
												<td>${invoice.late_fee}</td>
												<td>${invoice.contract_price}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Row>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						Payment History ({pastPayments.length})
					</Accordion.Header>
					<Accordion.Body>
						<Row xs="auto">
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Contract</th>
										<th>Issued</th>
										<th>Paid</th>
										<th>Late Fee</th>
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									{pastPayments.map((invoice, index) => {
										var late =
											new Date(invoice.date_paid) > new Date(invoice.date_due);
										return (
											<tr key={index}>
												<td>{invoice.contract_name}</td>
												<td>
													{new Date(invoice.date_issued).toLocaleDateString()}
												</td>
												<td
													style={late ? { color: "red" } : { color: "green" }}
												>
													{new Date(invoice.date_paid).toLocaleDateString()}
												</td>
												<td>${late ? invoice.late_fee : 0}</td>
												<td>${invoice.total_paid}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Row>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<CreateInvoiceView
				open={openView}
				setOpen={setOpenView}
				user={user}
				contracts={contracts}
			/>
		</>
	);
}

function TenantPayments({ user }) {
	// Tenant pending payments
	const [pendingPayments, setPendingPayments] = useState(null);
	const fetchPendingPayments = async () => {
		setPendingPayments(await getInvoicesPendingTenant(user.tenant_id));
	};

	// Tenant total pending
	const [totalPending, setTotalPending] = useState(0);
	const fetchTotalPending = async () => {
		setTotalPending(await getInvoicesTotalTenant(user.tenant_id));
	};

	// Tenant past contracts
	const [pastPayments, setPastPayments] = useState(null);
	const fetchPastPayments = async () => {
		setPastPayments(await getInvoicesPaidTenant(user.tenant_id));
	};

	// On component mount
	useEffect(() => {
		fetchTotalPending();
		fetchPendingPayments();
		fetchPastPayments();
	}, []);

	if (!pendingPayments || !pastPayments) return <Spinner />;

	// Render
	return (
		<>
			<Row>
				Total Pending:
				<div className="total">${!totalPending ? 0 : totalPending}</div>
				{pendingPayments.length == 0 ? null : (
					<AthMovil
						pendingPayments={pendingPayments}
						totalPending={totalPending}
					/>
				)}
			</Row>
			<Accordion flush alwaysOpen>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						Pending Payments ({pendingPayments.length})
					</Accordion.Header>
					<Accordion.Body>
						<Row xs="auto">
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Contract</th>
										<th>Issued</th>
										<th>Due</th>
										<th>Late Fee</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>
									{pendingPayments.map((invoice, index) => {
										return (
											<tr key={index}>
												<td>{invoice.contract_name}</td>
												<td>
													{new Date(invoice.date_issued).toLocaleDateString()}
												</td>
												<td>
													{new Date(invoice.date_due).toLocaleDateString()}
												</td>
												<td>${invoice.late_fee}</td>
												<td>${invoice.contract_price}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Row>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						Payment History ({pastPayments.length})
					</Accordion.Header>
					<Accordion.Body>
						<Row xs="auto">
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Contract</th>
										<th>Issued</th>
										<th>Due</th>
										<th>Paid</th>
										<th>Late Fee</th>
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									{pastPayments.map((invoice, index) => {
										var late =
											new Date(invoice.date_paid) > new Date(invoice.date_due);
										return (
											<tr key={index}>
												<td>{invoice.contract_name}</td>
												<td>
													{new Date(invoice.date_issued).toLocaleDateString()}
												</td>
												<td>
													{new Date(invoice.date_due).toLocaleDateString()}
												</td>
												<td
													style={late ? { color: "red" } : { color: "green" }}
												>
													{new Date(invoice.date_paid).toLocaleDateString()}
												</td>
												<td>${late ? invoice.late_fee : 0}</td>
												<td>${invoice.total_paid}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Row>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</>
	);
}
