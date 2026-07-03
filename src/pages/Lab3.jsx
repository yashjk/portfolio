import { Canvas } from "@react-three/fiber";
import OrbitScene from "../components/OrbitScene";

// Prototype hero #3 — quarter-Earth at left, rocket launch → satellite orbit.
const Lab3 = () => {
	return (
		<section className="relative w-full h-screen">
			<Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
				<color attach="background" args={["#050813"]} />
				<ambientLight intensity={0.4} />
				<directionalLight position={[6, 2, 5]} intensity={1.9} />
				<OrbitScene />
			</Canvas>

			<div className="absolute inset-y-0 right-8 md:right-20 flex flex-col justify-center pointer-events-none text-right max-w-md">
				<h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_2px_20px_rgba(74,168,255,0.4)]">
					Yash Joshi
				</h1>
				<p className="mt-4 text-lg md:text-2xl text-blue-200 tracking-wide">
					Fullstack Engineer <span className="text-violet-400">×</span> AI
				</p>
			</div>
		</section>
	);
};

export default Lab3;
