import { Component, useState } from "react";
import { Canvas } from "@react-three/fiber";
import OrbitScene from "./OrbitScene";
import fallbackImage from "../assets/space-fallback.webp";

// One-time probe for a usable WebGL context. This is not a theoretical state:
// Chrome removed its software-WebGL fallback, so with "Use graphics
// acceleration" off (which Chrome can also disable on its own after repeated
// GPU-process crashes) getContext() simply returns null and the 3D scene can
// never run. Old hardware, VMs, and remote desktops hit this too.
const canUseWebGL = () => {
	if (typeof window === "undefined") return false;
	try {
		const probe = document.createElement("canvas");
		return Boolean(
			window.WebGLRenderingContext &&
				(probe.getContext("webgl2") || probe.getContext("webgl"))
		);
	} catch {
		return false;
	}
};

// A pre-rendered frame of the very same scene, so losing WebGL costs only the
// slow orbital drift rather than the whole visual.
const StaticBackdrop = () => (
	<div
		className="absolute inset-0 bg-cover bg-center"
		style={{ backgroundImage: `url(${fallbackImage})` }}
	/>
);

// getContext() can succeed and the scene still fail to render (a texture or
// GLB that won't load). A decorative background should never take the page
// down with it. Note this catches render-time errors only — the no-WebGL case
// is handled up front by canUseWebGL().
class SceneBoundary extends Component {
	state = { failed: false };

	static getDerivedStateFromError() {
		return { failed: true };
	}

	render() {
		return this.state.failed ? <StaticBackdrop /> : this.props.children;
	}
}

// Purely decorative background — hidden from assistive tech, not focusable,
// and frozen when the user prefers reduced motion.
const Backdrop = () => {
	const [webglAvailable] = useState(canUseWebGL);

	return (
		<div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
			{webglAvailable ? (
				<SceneBoundary>
					<Canvas
						dpr={[1, 1.5]}
						gl={{ powerPreference: "high-performance", antialias: true }}
						camera={{ position: [0, 0, 10], fov: 50 }}
						tabIndex={-1}
					>
						<color attach="background" args={["#050813"]} />
						<ambientLight intensity={0.2} />
						{/* the key light lives in OrbitScene — it orbits so the
						    day/night terminator sweeps across the globe */}
						<OrbitScene />
					</Canvas>
				</SceneBoundary>
			) : (
				<StaticBackdrop />
			)}
			{/* scrim — darkens toward the right where content sits, for contrast.
			    Sits above either backdrop so the design is identical both ways. */}
			<div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#050813]/20 to-[#050813]/80" />
		</div>
	);
};

export default Backdrop;
