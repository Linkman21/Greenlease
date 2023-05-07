import { useEffect, useState } from "react";
import useExternalScripts from "../hooks/useExternalScript";
import useScript from "../hooks/useScript";

export default function AthMovil({ pendingPayments, totalPending }) {
	// Checkout data
	// 	const [data, setData] = useState(`
	//   ATHM_Checkout = {
	//   env: "sandbox",
	//   publicToken: "sandboxtoken01875617264",
	//   timeout: 600,
	//   theme: "btn",
	//   lang: "en",
	//   total: ${totalPending},
	//   tax: 0,
	//   subtotal: ${totalPending},
	//   metadata1: "metadata1 test",
	//   metadata2: "metadata2 test",
	//   items: [
	//     {
	//       name: "${pendingPayments[0].contract_name} Monthly Payment",
	//       description: "This is a description.",
	//       quantity: "1",
	//       price: ${totalPending},
	//       tax: "0",
	//       metadata: "metadata test",
	//     },
	//   ],
	//   onCompletedPayment: function (response)
	//  {
	//      console.log(response)
	//  },
	//   onCancelledPayment: function (response)
	//  {
	//      console.log(response)
	//  },
	//   onCompletedPayment: function (response)
	//  {
	//      console.log(response)
	//  },
	// };
	// `);

	// ATH Movil
	const handleScripts = () => {
		// useExternalScripts(
		// 	"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
		// 	null
		// );
		// useScript(`
		//   ATHM_Checkout = {
		//   env: "sandbox",
		//   publicToken: "sandboxtoken01875617264",
		//   timeout: 600,
		//   theme: "btn",
		//   lang: "en",
		//   total: ${totalPending},
		//   tax: 0,
		//   subtotal: ${totalPending},
		//   metadata1: "metadata1 test",
		//   metadata2: "metadata2 test",
		//   items: [
		//     {
		//       name: "${pendingPayments[0].contract_name} Monthly Payment",
		//       description: "This is a description.",
		//       quantity: "1",
		//       price: ${totalPending},
		//       tax: "0",
		//       metadata: "metadata test",
		//     },
		//   ],
		//   onCompletedPayment: function (response)
		//  {
		// 		 console.log(response)
		//  },
		//   onCancelledPayment: function (response)
		//  {
		// 		 console.log(response)
		//  },
		//   onCompletedPayment: function (response)
		//  {
		// 		 console.log(response)
		//  },
		// };
		// `);
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
				console.log(response);
			},
			onCancelledPayment: function (response) {
				console.log(response);
			},
			onExpiredPayment: function (response) {
				console.log(response);
			},
		};
		useExternalScripts(
			"https://www.athmovil.com/api/js/v3/athmovilV3.js",
			null
		);
	};

	if (!pendingPayments || !totalPending)
		return <div className="no-pay-btn"></div>;

	handleScripts();

	return <div id="ATHMovil_Checkout_Button"></div>;
}
