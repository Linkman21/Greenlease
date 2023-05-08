import { useEffect, useState } from "react";
import { payInvoice } from "../api/fetcher";
import useExternalScripts from "../hooks/useExternalScript";

export default function AthMovil({ pendingPayments, totalPending }) {
	// Handle Payment
	const handlePayment = async (res) => {
		console.log(res);
		for (let i in pendingPayments) {
			let total =
				new Date(pendingPayments[i].date_due) >= new Date()
					? pendingPayments[i].contract_price
					: pendingPayments[i].contract_price + pendingPayments[i].late_fee;
			await payInvoice(pendingPayments[i].invoice_id, total);
			// console.log(total);
		}
		window.location.reload(false);
	};

	// ATH Movil
	const handleScripts = () => {
		window.ATHM_Checkout = {
			env: "sandbox",
			publicToken: "sandboxtoken01875617264",
			timeout: 600,
			theme: "btn",
			lang: "en",
			total: totalPending,
			tax: 0,
			subtotal: totalPending,
			metadata1: "metadata1 test",
			metadata2: "metadata2 test",
			items: [
				{
					name: `${pendingPayments[0].contract_name} Monthly Payment`,
					description: "This is a description.",
					quantity: "1",
					price: totalPending,
					tax: "0",
					metadata: "metadata test",
				},
			],
			onCompletedPayment: function (response) {
				handlePayment(response);
			},
			onCancelledPayment: function (response) {
				// console.log(response);
				handlePayment(response);
			},
			onExpiredPayment: function (response) {
				console.log(response);
			},
		};
		useExternalScripts("https://www.athmovil.com/api/js/v3/athmovilV3.js");
	};

	if (!pendingPayments || !totalPending)
		return <div className="no-pay-btn"></div>;

	handleScripts();

	return <div id="ATHMovil_Checkout_Button"></div>;
}
