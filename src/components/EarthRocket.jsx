import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Earth + launching rocket, fully procedural (no external textures/models).
// Earth texture is drawn to a canvas; rocket is built from primitives and
// loops its launch upward with a flickering flame.
const EarthRocket = () => {
	const earth = useRef();
	const rocket = useRef();
	const flame = useRef();
	const stars = useRef();

	// procedural earth texture (ocean + continents + ice caps)
	const earthTexture = useMemo(() => {
		const w = 1024;
		const h = 512;
		const c = document.createElement("canvas");
		c.width = w;
		c.height = h;
		const ctx = c.getContext("2d");
		const grad = ctx.createLinearGradient(0, 0, 0, h);
		grad.addColorStop(0, "#1e3a8a");
		grad.addColorStop(0.5, "#2563eb");
		grad.addColorStop(1, "#1e3a8a");
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, w, h);
		// continents
		for (let i = 0; i < 46; i++) {
			ctx.fillStyle = Math.random() > 0.5 ? "#15803d" : "#166534";
			const x = Math.random() * w;
			const y = 40 + Math.random() * (h - 80);
			const r = 18 + Math.random() * 70;
			ctx.beginPath();
			ctx.ellipse(x, y, r, r * (0.5 + Math.random() * 0.4), Math.random() * Math.PI, 0, Math.PI * 2);
			ctx.fill();
		}
		// ice caps
		ctx.fillStyle = "#eef2f7";
		ctx.fillRect(0, 0, w, 22);
		ctx.fillRect(0, h - 22, w, 22);
		const tex = new THREE.CanvasTexture(c);
		tex.colorSpace = THREE.SRGBColorSpace;
		return tex;
	}, []);

	const starGeom = useMemo(() => {
		const pos = [];
		for (let i = 0; i < 700; i++) {
			pos.push(
				(Math.random() - 0.5) * 45,
				(Math.random() - 0.5) * 32,
				(Math.random() - 0.5) * 30 - 6
			);
		}
		const g = new THREE.BufferGeometry();
		g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
		return g;
	}, []);

	useFrame((state, delta) => {
		if (earth.current) earth.current.rotation.y += delta * 0.12;
		if (stars.current) stars.current.rotation.y -= delta * 0.008;
		if (rocket.current) {
			rocket.current.position.y += delta * 1.4; // rise
			// drift slightly and reset for a looping launch
			if (rocket.current.position.y > 9) rocket.current.position.y = 2.2;
		}
		if (flame.current) {
			const s = 0.6 + Math.abs(Math.sin(state.clock.elapsedTime * 30)) * 0.6;
			flame.current.scale.set(1, s, 1);
		}
	});

	return (
		<>
			{/* starfield */}
			<points ref={stars} geometry={starGeom}>
				<pointsMaterial
					color="#cbd5e1"
					size={0.08}
					sizeAttenuation
					transparent
					opacity={0.8}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</points>

			{/* atmosphere glow */}
			<mesh>
				<sphereGeometry args={[2.5, 48, 48]} />
				<meshBasicMaterial
					color="#4aa8ff"
					transparent
					opacity={0.16}
					side={THREE.BackSide}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</mesh>

			{/* earth */}
			<mesh ref={earth}>
				<sphereGeometry args={[2.2, 64, 64]} />
				<meshStandardMaterial map={earthTexture} roughness={0.9} metalness={0.05} />
			</mesh>

			{/* rocket */}
			<group ref={rocket} position={[0, 2.2, 0]}>
				<mesh>
					<cylinderGeometry args={[0.13, 0.13, 0.6, 20]} />
					<meshStandardMaterial color="#eef2f7" metalness={0.4} roughness={0.35} />
				</mesh>
				<mesh position={[0, 0.42, 0]}>
					<coneGeometry args={[0.13, 0.28, 20]} />
					<meshStandardMaterial color="#ef4444" />
				</mesh>
				{/* window */}
				<mesh position={[0, 0.1, 0.13]}>
					<circleGeometry args={[0.05, 16]} />
					<meshBasicMaterial color="#38bdf8" />
				</mesh>
				{/* fins */}
				{[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((a, i) => (
					<mesh
						key={i}
						position={[Math.cos(a) * 0.14, -0.26, Math.sin(a) * 0.14]}
						rotation={[0, -a, 0.2]}
					>
						<coneGeometry args={[0.07, 0.24, 4]} />
						<meshStandardMaterial color="#ef4444" />
					</mesh>
				))}
				{/* flame */}
				<mesh ref={flame} position={[0, -0.55, 0]} rotation={[Math.PI, 0, 0]}>
					<coneGeometry args={[0.11, 0.45, 14]} />
					<meshBasicMaterial color="#fb923c" transparent opacity={0.9} />
				</mesh>
			</group>
		</>
	);
};

export default EarthRocket;
