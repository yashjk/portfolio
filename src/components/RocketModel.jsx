import { useGLTF } from "@react-three/drei";
import baseUrl from "../assets/3d/rocket_baseA.glb";
import fuelUrl from "../assets/3d/rocket_fuelA.glb";
import topUrl from "../assets/3d/rocket_topA.glb";
import finsUrl from "../assets/3d/rocket_finsA.glb";

// Kenney parts are each authored at node offset (2, 0, 1.5) with geometry
// sitting on Y=0, so each <primitive> is re-centered with position
// (-2, stackY, -1.5) and stacked by height:
//   base 0.0->1.6  |  fuel 1.6->2.1  |  top(nose) 2.1->2.9  |  fins at base
// The whole assembly is then re-centered vertically (~-1.45) so the pivot is
// the rocket's middle and its nose points +Y.
const RocketModel = (props) => {
	const base = useGLTF(baseUrl);
	const fuel = useGLTF(fuelUrl);
	const top = useGLTF(topUrl);
	const fins = useGLTF(finsUrl);

	return (
		<group {...props}>
			<group position={[0, -1.45, 0]}>
				<primitive object={base.scene} position={[-2, 0, -1.5]} />
				<primitive object={fuel.scene} position={[-2, 1.6, -1.5]} />
				<primitive object={top.scene} position={[-2, 2.1, -1.5]} />
				<primitive object={fins.scene} position={[-2, 0, -1.5]} />
			</group>
		</group>
	);
};

useGLTF.preload(baseUrl);
useGLTF.preload(fuelUrl);
useGLTF.preload(topUrl);
useGLTF.preload(finsUrl);

export default RocketModel;
