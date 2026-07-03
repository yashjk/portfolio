// The Kenney space kit only has ground-station satellite *dishes*, not an
// orbiting satellite — so this is a proper space satellite built from
// primitives: a gold foil body, two solar-panel wings on booms, and a dish.
const SatelliteModel = (props) => {
	return (
		<group {...props}>
			{/* body */}
			<mesh>
				<boxGeometry args={[0.32, 0.32, 0.5]} />
				<meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
			</mesh>

			{/* solar-panel wings on booms */}
			{[1, -1].map((dir, i) => (
				<group key={i}>
					<mesh position={[dir * 0.38, 0, 0]}>
						<boxGeometry args={[0.44, 0.03, 0.03]} />
						<meshStandardMaterial color="#6b7280" metalness={0.5} />
					</mesh>
					<mesh position={[dir * 0.92, 0, 0]}>
						<boxGeometry args={[0.7, 0.02, 0.44]} />
						<meshStandardMaterial color="#1e3a8a" metalness={0.4} roughness={0.5} />
					</mesh>
				</group>
			))}

			{/* antenna mast + dish */}
			<mesh position={[0, 0.24, 0.12]}>
				<cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
				<meshStandardMaterial color="#9ca3af" />
			</mesh>
			<mesh position={[0, 0.33, 0.16]} rotation={[Math.PI / 4, 0, 0]}>
				<cylinderGeometry args={[0.11, 0.11, 0.025, 20]} />
				<meshStandardMaterial color="#e5e7eb" metalness={0.3} />
			</mesh>
		</group>
	);
};

export default SatelliteModel;
