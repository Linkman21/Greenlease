import { useEffect } from "react";

export default function useExternalScripts(url, data) {
	useEffect(() => {
		const body = document.querySelector("body");
		const script = document.createElement("script");

		script.setAttribute("src", url);
		if (data) script.setAttribute("data-*", toString(data));
		body.appendChild(script);

		return () => {
			body.removeChild(script);
		};
	}, [url]);
}
