import { Canvas } from "@react-three/fiber";
import DevWorkspace from "../components/DevWorkspace";

// Prototype hero #2 — dev workspace — test route at /lab2.
const Lab2 = () => {
	return (
		<section className="relative w-full h-screen bg-slate-900">
			<Canvas camera={{ position: [0, 1, 8], fov: 50 }}>
				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 6, 5]} intensity={1.1} />
				<pointLight position={[0, 0.3, 1]} intensity={0.6} color="#7dd3fc" />
				<DevWorkspace />
			</Canvas>

			<div className="absolute top-16 inset-x-0 flex flex-col items-center pointer-events-none px-6 text-center">
				<h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow">
					Yash Joshi
				</h1>
				<p className="mt-3 text-lg md:text-xl text-blue-200">
					Frontend Engineer <span className="text-blue-400">×</span> AI
				</p>
			</div>
		</section>
	);
};

export default Lab2;
