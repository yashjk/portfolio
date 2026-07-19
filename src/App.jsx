import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import RouteMeta from "./components/RouteMeta";
import Footer from "./components/Footer";
import MusicToggle from "./components/MusicToggle";
import Backdrop from "./components/Backdrop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Writing from "./pages/Writing";

const App = () => {
	return (
		<div className="relative min-h-screen bg-[#050813] text-slate-100">
			<Backdrop />

			{/* content layer on top */}
			<div className="relative z-10">
				<Router>
					<RouteMeta />
					<a href="#main-content" className="skip-link">
						Skip to content
					</a>
					<Navbar />
					<main id="main-content" tabIndex={-1} className="focus:outline-none">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/projects" element={<Projects />} />
							<Route path="/writing" element={<Writing />} />
							<Route path="/contact" element={<Contact />} />
						</Routes>
					</main>
					<Footer />
					<MusicToggle />
				</Router>
			</div>

			{/* Vercel Web Analytics — privacy-friendly page-view + route tracking */}
			<Analytics />
		</div>
	);
};

export default App;
