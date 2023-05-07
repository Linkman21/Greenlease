import { useEffect } from "react";

export default function useExternalScripts(url) {
	useEffect(() => {
		const body = document.querySelector("body");
		const script = document.createElement("script");

		script.setAttribute("src", url);
		body.appendChild(script);

		return () => {
			body.removeChild(script);
		};
	}, [url]);
}
