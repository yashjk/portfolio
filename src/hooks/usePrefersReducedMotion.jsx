import { useEffect, useState } from "react";

// Tracks the user's "reduce motion" OS setting so we can freeze the animated
// 3D background (an important accessibility / vestibular-safety measure).
export default function usePrefersReducedMotion() {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onChange = () => setReduced(mq.matches);
		onChange();
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	return reduced;
}
