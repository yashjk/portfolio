import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Stylised low-poly dev workspace built entirely from primitives
// (no external models) — desk, monitor w/ code, keyboard, mug, plant.
const codeLines = [
	{ y: 0.55, w: 1.6, x: -0.55, c: "#7dd3fc" },
	{ y: 0.35, w: 1.0, x: -0.85, c: "#c4b5fd" },
	{ y: 0.15, w: 1.9, x: -0.35, c: "#86efac" },
	{ y: -0.05, w: 0.8, x: -0.95, c: "#7dd3fc" },
	{ y: -0.25, w: 1.4, x: -0.6, c: "#fca5a5" },
	{ y: -0.45, w: 1.1, x: -0.8, c: "#c4b5fd" },
];

const DevWorkspace = () => {
	const group = useRef();
	const { pointer } = useThree();

	useFrame((state) => {
		if (!group.current) return;
		const t = state.clock.getElapsedTime();
		group.current.position.y = Math.sin(t * 0.8) * 0.1; // gentle float
		group.current.rotation.y = THREE.MathUtils.lerp(
			group.current.rotation.y,
			pointer.x * 0.4,
			0.05
		);
		group.current.rotation.x = THREE.MathUtils.lerp(
			group.current.rotation.x,
			-pointer.y * 0.2,
			0.05
		);
	});

	return (
		<group ref={group}>
			{/* desk */}
			<mesh position={[0, -1.3, 0]}>
				<boxGeometry args={[7, 0.25, 3]} />
				<meshStandardMaterial color="#2b3a4a" />
			</mesh>

			{/* monitor stand */}
			<mesh position={[0, -0.75, -0.3]}>
				<boxGeometry args={[0.3, 0.9, 0.3]} />
				<meshStandardMaterial color="#1f2937" />
			</mesh>
			<mesh position={[0, -1.15, -0.1]}>
				<boxGeometry args={[1.2, 0.15, 0.6]} />
				<meshStandardMaterial color="#1f2937" />
			</mesh>

			{/* monitor frame + screen */}
			<mesh position={[0, 0.2, -0.4]}>
				<boxGeometry args={[4.2, 2.4, 0.2]} />
				<meshStandardMaterial color="#111827" />
			</mesh>
			<mesh position={[0, 0.2, -0.29]}>
				<planeGeometry args={[3.9, 2.1]} />
				<meshBasicMaterial color="#0b1220" />
			</mesh>
			{codeLines.map((l, i) => (
				<mesh key={i} position={[l.x, 0.2 + l.y, -0.28]}>
					<planeGeometry args={[l.w, 0.09]} />
					<meshBasicMaterial color={l.c} />
				</mesh>
			))}

			{/* keyboard */}
			<mesh position={[0, -1.15, 0.9]} rotation={[-0.15, 0, 0]}>
				<boxGeometry args={[2.4, 0.12, 0.8]} />
				<meshStandardMaterial color="#374151" />
			</mesh>

			{/* mug */}
			<mesh position={[2.1, -1.0, 0.6]}>
				<cylinderGeometry args={[0.22, 0.22, 0.45, 20]} />
				<meshStandardMaterial color="#4a90d9" />
			</mesh>

			{/* plant pot + leaves */}
			<mesh position={[-2.2, -1.0, 0.4]}>
				<cylinderGeometry args={[0.28, 0.22, 0.45, 16]} />
				<meshStandardMaterial color="#b45309" />
			</mesh>
			{[0, 0.28, -0.28].map((dx, i) => (
				<mesh key={i} position={[-2.2 + dx, -0.5, 0.4]} rotation={[0, 0, dx]}>
					<coneGeometry args={[0.18, 0.7, 8]} />
					<meshStandardMaterial color="#15803d" />
				</mesh>
			))}
		</group>
	);
};

export default DevWorkspace;
