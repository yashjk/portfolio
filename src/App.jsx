import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Navbar from "./components/Navbar";
import OrbitScene from "./components/OrbitScene";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";

const App = () => {
	return (
		<main className="relative min-h-screen bg-[#050813] text-slate-100">
			{/* persistent 3D background — Earth + orbit, shared across all pages */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<Canvas
					dpr={[1, 1.5]}
					gl={{ powerPreference: "high-performance", antialias: true }}
					camera={{ position: [0, 0, 10], fov: 50 }}
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
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/contact" element={<Contact />} />
					</Routes>
				</Router>
			</div>
		</main>
	);
};

export default App;
