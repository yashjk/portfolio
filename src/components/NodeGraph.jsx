import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 60;
const LINK_DISTANCE = 2.5;
const STAR_COUNT = 650;

const BLUE = new THREE.Color("#4aa8ff");
const VIOLET = new THREE.Color("#a855f7");

// Interactive "neural constellation" with a glowing, layered look:
// gradient nodes + additive-blend links over a drifting starfield.
const NodeGraph = () => {
	const group = useRef();
	const stars = useRef();
	const { pointer } = useThree();

	const nodes = useMemo(
		() =>
			Array.from(
				{ length: NODE_COUNT },
				() =>
					new THREE.Vector3(
						(Math.random() - 0.5) * 12,
						(Math.random() - 0.5) * 7,
						(Math.random() - 0.5) * 7
					)
			),
		[]
	);

	const lineGeom = useMemo(() => {
		const positions = [];
		for (let i = 0; i < nodes.length; i++) {
			for (let j = i + 1; j < nodes.length; j++) {
				if (nodes[i].distanceTo(nodes[j]) < LINK_DISTANCE) {
					positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
					positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
				}
			}
		}
		const g = new THREE.BufferGeometry();
		g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
		return g;
	}, [nodes]);

	const nodeGeom = useMemo(() => {
		const pos = [];
		const col = [];
		nodes.forEach((n) => {
			pos.push(n.x, n.y, n.z);
			const c = BLUE.clone().lerp(VIOLET, (n.y + 3.5) / 7);
			col.push(c.r, c.g, c.b);
		});
		const g = new THREE.BufferGeometry();
		g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
		g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
		return g;
	}, [nodes]);

	const starGeom = useMemo(() => {
		const pos = [];
		for (let i = 0; i < STAR_COUNT; i++) {
			pos.push(
				(Math.random() - 0.5) * 42,
				(Math.random() - 0.5) * 30,
				(Math.random() - 0.5) * 30 - 8
			);
		}
		const g = new THREE.BufferGeometry();
		g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
		return g;
	}, []);

	useFrame((_, delta) => {
		if (group.current) {
			group.current.rotation.y += delta * 0.06;
			group.current.rotation.x = THREE.MathUtils.lerp(
				group.current.rotation.x,
				pointer.y * 0.3,
				0.05
			);
			group.current.rotation.z = THREE.MathUtils.lerp(
				group.current.rotation.z,
				-pointer.x * 0.12,
				0.05
			);
		}
		if (stars.current) stars.current.rotation.y -= delta * 0.01;
	});

	return (
		<>
			{/* background starfield for depth */}
			<points ref={stars} geometry={starGeom}>
				<pointsMaterial
					color="#3b6ea5"
					size={0.09}
					sizeAttenuation
					transparent
					opacity={0.6}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</points>

			<group ref={group}>
				<lineSegments geometry={lineGeom}>
					<lineBasicMaterial
						color="#4a90d9"
						transparent
						opacity={0.5}
						blending={THREE.AdditiveBlending}
						depthWrite={false}
					/>
				</lineSegments>
				<points geometry={nodeGeom}>
					<pointsMaterial
						vertexColors
						size={0.3}
						sizeAttenuation
						transparent
						blending={THREE.AdditiveBlending}
						depthWrite={false}
					/>
				</points>
			</group>
		</>
	);
};

export default NodeGraph;
