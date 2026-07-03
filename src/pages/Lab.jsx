import { Canvas } from "@react-three/fiber";
import NodeGraph from "../components/NodeGraph";

// Prototype hero — test route at /lab (not linked in the nav).
const Lab = () => {
	return (
		<section className="relative w-full h-screen">
			<Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
				<color attach="background" args={["#060a14"]} />
				<fog attach="fog" args={["#0a1428", 12, 30]} />
				<ambientLight intensity={0.8} />
				<NodeGraph />
			</Canvas>

			<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
				<h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_2px_20px_rgba(74,168,255,0.4)]">
					Yash Joshi
				</h1>
				<p className="mt-4 text-lg md:text-2xl text-blue-200 tracking-wide">
					Frontend Engineer <span className="text-violet-400">×</span> AI
				</p>
			</div>
		</section>
	);
};

export default Lab;
