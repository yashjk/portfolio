import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Navbar from "./components/Navbar";
import MusicToggle from "./components/MusicToggle";
import OrbitScene from "./components/OrbitScene";
import usePrefersReducedMotion from "./hooks/usePrefersReducedMotion";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";

const App = () => {
	const reducedMotion = usePrefersReducedMotion();

	return (
		<div className="relative min-h-screen bg-[#050813] text-slate-100">
			{/* Purely decorative 3D background — hidden from assistive tech, not
			    focusable, and frozen when the user prefers reduced motion. */}
			<div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
				<Canvas
					dpr={[1, 1.5]}
					frameloop={reducedMotion ? "demand" : "always"}
					gl={{ powerPreference: "high-performance", antialias: true }}
					camera={{ position: [0, 0, 10], fov: 50 }}
					tabIndex={-1}
				>
					<color attach="background" args={["#050813"]} />
					<ambientLight intensity={0.4} />
					<directionalLight position={[6, 2, 5]} intensity={1.9} />
					<OrbitScene />
				</Canvas>
				{/* scrim — darkens toward the right where content sits, for contrast */}
				<div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#050813]/20 to-[#050813]/80" />
			</div>

			{/* content layer on top */}
			<div className="relative z-10">
				<Router>
					<a href="#main-content" className="skip-link">
						Skip to content
					</a>
					<Navbar />
					<main id="main-content" tabIndex={-1} className="focus:outline-none">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/projects" element={<Projects />} />
							<Route path="/contact" element={<Contact />} />
						</Routes>
					</main>
					<MusicToggle />
				</Router>
			</div>
		</div>
	);
};

export default App;
