import { useEffect } from "react";

export default function useScript(content) {
	useEffect(() => {
		const body = document.querySelector("body");
		const script = document.createElement("script");

		script.setAttribute("type", "text/javascript");
		script.innerHTML = content;
		body.appendChild(script);

		return () => {
			body.removeChild(script);
		};
	}, [content]);
}
