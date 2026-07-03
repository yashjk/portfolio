import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import RocketModel from "./RocketModel";
import SatelliteModel from "./SatelliteModel";
import earthDayUrl from "../assets/textures/earth-day.jpg";
import earthSpecUrl from "../assets/textures/earth-specular.jpg";
import earthNightUrl from "../assets/textures/earth-lights.png";
import earthCloudsUrl from "../assets/textures/earth-clouds.png";

// Giant Earth anchored far in the bottom-left; only a large curved limb shows.
// A rocket launches (curving outward so it never enters Earth), transforms
// into a satellite that orbits along the visible limb, passing behind Earth
// and reappearing from the front.

const EARTH_C = new THREE.Vector3(-17, -18, 0);
const EARTH_R = 21;
const LAUNCH_DUR = 9; // seconds of (slow) rocket flight
const TRANS = 0.7; // rocket→satellite crossfade half-window
const ORBIT_R = 26;
const SLOW_SPEED = 0.1; // rad/s while the satellite is on-screen (lingers)
const FAST_SPEED = 0.9; // rad/s while it's hidden on the far side (returns sooner)
const VIS_HALF = 1.1; // half-width (rad) of the visible arc around the limb
const SMOKE = 60;
const _up = new THREE.Vector3(0, 1, 0);
// Direction toward the key light — used to mask the night-lights emissive to
// the dark hemisphere. Must match the <directionalLight> position in App.
const SUN_DIR = new THREE.Vector3(-2, 4, 7).normalize();
const SUN_SPEED = 0.12; // rad/s — sun orbits the globe (~52s day/night cycle)
const SUN_TILT = 0.32; // keeps the sun a little "north" of edge-on

// Atmosphere glow: cool blue on the day limb, a warm sunrise band at the
// terminator, fading to nothing on the night side. Reads the moving sun.
const ATMO_VERT = /* glsl */ `
	varying vec3 vNormalW;
	varying vec3 vPositionW;
	void main() {
		vNormalW = normalize(mat3(modelMatrix) * normal);
		vec4 wp = modelMatrix * vec4(position, 1.0);
		vPositionW = wp.xyz;
		gl_Position = projectionMatrix * viewMatrix * wp;
	}
`;
const ATMO_FRAG = /* glsl */ `
	uniform vec3 uSunDirection;
	varying vec3 vNormalW;
	varying vec3 vPositionW;
	void main() {
		vec3 N = normalize(vNormalW);
		vec3 V = normalize(cameraPosition - vPositionW);
		float fres = pow(1.0 - max(dot(V, N), 0.0), 2.5); // rim falloff
		float sunDot = dot(N, uSunDirection);
		float day = smoothstep(-0.05, 0.45, sunDot);
		float twilight = exp(-pow(sunDot / 0.22, 2.0)); // warm band at the terminator
		vec3 dayCol = vec3(0.30, 0.62, 1.0);
		vec3 duskCol = vec3(1.0, 0.45, 0.22);
		vec3 col = dayCol * day + duskCol * twilight;
		float alpha = fres * (day * 0.55 + twilight * 1.15);
		gl_FragColor = vec4(col, alpha);
	}
`;

const OrbitScene = () => {
	const earth = useRef();
	const clouds = useRef();
	const sun = useRef(); // the moving directional light
	const sunViz = useRef(); // the visible sun disc
	const rocket = useRef();
	const satellite = useRef();
	const flame = useRef();
	const stars = useRef();
	// Shared uniform: the earth material's shader reads the same object we
	// update each frame, so the city-lights mask tracks the moving sun.
	const sunUniform = useRef({ value: SUN_DIR.clone() });
	const puffRefs = useRef([]);
	const puffState = useRef(
		Array.from({ length: SMOKE }, () => ({ life: 0, pos: new THREE.Vector3() }))
	);
	const spawnTimer = useRef(0);
	const head = useRef(0);
	const orbAngle = useRef(0);

	// Real NASA Blue Marble maps: day, ocean specular, night city lights, and
	// clouds. Loaded imperatively (no Suspense) — materials update on arrival.
	const [earthMap, earthSpec, nightMap, cloudsMap] = useMemo(() => {
		const loader = new THREE.TextureLoader();
		const day = loader.load(earthDayUrl);
		day.colorSpace = THREE.SRGBColorSpace;
		day.anisotropy = 8;
		const spec = loader.load(earthSpecUrl); // data map — keep linear
		const night = loader.load(earthNightUrl);
		night.colorSpace = THREE.SRGBColorSpace;
		night.anisotropy = 8;
		const clouds = loader.load(earthCloudsUrl);
		clouds.colorSpace = THREE.SRGBColorSpace;
		clouds.anisotropy = 8;
		return [day, spec, night, clouds];
	}, []);

	// Atmosphere material — shares the moving sun-direction uniform so the
	// sunrise band tracks the terminator.
	const atmoMaterial = useMemo(
		() =>
			new THREE.ShaderMaterial({
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
				side: THREE.FrontSide,
				uniforms: { uSunDirection: sunUniform.current },
				vertexShader: ATMO_VERT,
				fragmentShader: ATMO_FRAG,
			}),
		[]
	);

	// Soft sun sprite — a radial gradient (bright core -> warm halo -> fully
	// transparent) so it fades outward like the real sun, no hard ring. Same
	// idea as three.js's lensflare0 glow texture.
	const sunSprite = useMemo(() => {
		const s = 256;
		const c = document.createElement("canvas");
		c.width = c.height = s;
		const ctx = c.getContext("2d");
		const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
		g.addColorStop(0.0, "rgba(255, 252, 242, 1.0)");
		g.addColorStop(0.12, "rgba(255, 246, 220, 0.95)");
		g.addColorStop(0.28, "rgba(255, 214, 140, 0.55)");
		g.addColorStop(0.55, "rgba(255, 186, 96, 0.16)");
		g.addColorStop(0.8, "rgba(255, 170, 80, 0.04)");
		g.addColorStop(1.0, "rgba(255, 170, 80, 0.0)");
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, s, s);
		const tex = new THREE.CanvasTexture(c);
		tex.colorSpace = THREE.SRGBColorSpace;
		return tex;
	}, []);

	const starGeom = useMemo(() => {
		const pos = [];
		for (let i = 0; i < 700; i++) {
			pos.push((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 34 - 6);
		}
		const g = new THREE.BufferGeometry();
		g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
		return g;
	}, []);

	// Round sprite for the stars — pointsMaterial draws square points by
	// default, so we map a soft radial-gradient disc onto each point.
	const starSprite = useMemo(() => {
		const s = 64;
		const c = document.createElement("canvas");
		c.width = c.height = s;
		const ctx = c.getContext("2d");
		const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
		g.addColorStop(0, "rgba(255,255,255,1)");
		g.addColorStop(0.35, "rgba(255,255,255,0.85)");
		g.addColorStop(1, "rgba(255,255,255,0)");
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
		ctx.fill();
		return new THREE.CanvasTexture(c);
	}, []);

	// direction from Earth centre toward the visible limb (screen centre)
	const limbDir = useMemo(() => EARTH_C.clone().negate().normalize(), []);
	// orbit basis: a=0 sits on the visible limb, orbV arcs up + toward camera
	const orbV = useMemo(() => new THREE.Vector3(0.6, 0.4, 0.9).normalize(), []);

	// launch: from the visible surface, curving outward (Bézier) to orbit entry
	const p0 = useMemo(() => {
		const d = EARTH_C.clone().negate();
		d.z = EARTH_R * 0.3;
		d.normalize();
		return EARTH_C.clone().add(d.multiplyScalar(EARTH_R));
	}, []);
	const p1 = useMemo(() => EARTH_C.clone().add(limbDir.clone().multiplyScalar(ORBIT_R)), [limbDir]);
	const pc = useMemo(() => {
		const r0 = p0.clone().sub(EARTH_C).normalize();
		return EARTH_C.clone().add(r0.multiplyScalar(EARTH_R + 12));
	}, [p0]);

	useFrame((state, delta) => {
		const t = state.clock.getElapsedTime();
		if (earth.current) earth.current.rotation.y += delta * 0.06;
		if (clouds.current) clouds.current.rotation.y += delta * 0.09; // drift faster than the surface
		if (stars.current) stars.current.rotation.y -= delta * 0.005;

		// Orbit the sun so the terminator sweeps across the globe over time,
		// cycling day -> dusk -> night -> dawn. The shader mask reads the same
		// uniform, so the city lights follow the moving night side.
		const sa = t * SUN_SPEED;
		sunUniform.current.value.set(Math.cos(sa), SUN_TILT, Math.sin(sa)).normalize();
		if (sun.current) sun.current.position.copy(sunUniform.current.value).multiplyScalar(20);
		// Visible sun rides its own arc across the sky at constant depth (so its
		// apparent size stays steady) and is depth-tested behind the Earth. It
		// RISES on one side, crosses high at "midday" (sa=0), and SETS below the
		// horizon through "night" (sa≈PI) — phase-linked to the moving key light.
		if (sunViz.current)
			sunViz.current.position.set(Math.sin(sa) * 7, -2.5 + Math.cos(sa) * 7, -1);
		const launching = t < LAUNCH_DUR;

		// rocket: fly the Bézier during launch, then shrink out over the transition
		if (rocket.current) {
			const flying = t < LAUNCH_DUR + TRANS;
			rocket.current.visible = flying;
			if (flying) {
				const k = THREE.MathUtils.smoothstep(Math.min(t, LAUNCH_DUR) / LAUNCH_DUR, 0, 1);
				const omk = 1 - k;
				rocket.current.position.set(
					omk * omk * p0.x + 2 * omk * k * pc.x + k * k * p1.x,
					omk * omk * p0.y + 2 * omk * k * pc.y + k * k * p1.y,
					omk * omk * p0.z + 2 * omk * k * pc.z + k * k * p1.z
				);
				const tan = pc
					.clone()
					.sub(p0)
					.multiplyScalar(2 * omk)
					.add(p1.clone().sub(pc).multiplyScalar(2 * k))
					.normalize();
				rocket.current.quaternion.copy(new THREE.Quaternion().setFromUnitVectors(_up, tan));
				rocket.current.scale.setScalar(
					1 - THREE.MathUtils.smoothstep(t, LAUNCH_DUR - TRANS, LAUNCH_DUR + TRANS)
				);
			}
		}
		if (flame.current) flame.current.scale.setY(0.6 + Math.abs(Math.sin(t * 30)) * 0.6);

		// smoke trail
		if (launching && rocket.current) {
			spawnTimer.current += delta;
			if (spawnTimer.current > 0.05) {
				spawnTimer.current = 0;
				const p = puffState.current[head.current % SMOKE];
				p.pos.copy(rocket.current.position);
				p.life = 1;
				head.current++;
			}
		}
		puffState.current.forEach((p, i) => {
			if (p.life > 0) p.life = Math.max(0, p.life - delta * 0.3);
			const m = puffRefs.current[i];
			if (!m) return;
			m.visible = p.life > 0;
			m.position.copy(p.pos);
			m.scale.setScalar((1 - p.life) * 0.55 + 0.16);
			if (m.material) m.material.opacity = p.life * 0.5;
		});

		// satellite: grow in over the transition, then orbit the visible limb
		if (satellite.current) {
			const appeared = t > LAUNCH_DUR - TRANS;
			satellite.current.visible = appeared;
			if (appeared) {
				// slow while near the visible limb (|angle| small), fast while hidden
				let an = orbAngle.current % (Math.PI * 2);
				if (an > Math.PI) an -= Math.PI * 2;
				if (an < -Math.PI) an += Math.PI * 2;
				const inView = Math.abs(an) < VIS_HALF;
				orbAngle.current -= (inView ? SLOW_SPEED : FAST_SPEED) * delta; // reversed
				const a = orbAngle.current;
				satellite.current.position.set(
					EARTH_C.x + ORBIT_R * (Math.cos(a) * limbDir.x + Math.sin(a) * orbV.x),
					EARTH_C.y + ORBIT_R * (Math.cos(a) * limbDir.y + Math.sin(a) * orbV.y),
					EARTH_C.z + ORBIT_R * (Math.cos(a) * limbDir.z + Math.sin(a) * orbV.z)
				);
				satellite.current.scale.setScalar(
					THREE.MathUtils.smoothstep(t, LAUNCH_DUR - TRANS, LAUNCH_DUR + TRANS)
				);
				satellite.current.rotation.y += delta * 0.5;
			}
		}
	});

	return (
		<>
			{/* moving sun (animated in useFrame so the terminator sweeps) */}
			<directionalLight ref={sun} intensity={2.4} />

			{/* the visible sun — a soft radial sprite that fades outward */}
			<sprite ref={sunViz} scale={[2.6, 2.6, 1]}>
				<spriteMaterial
					map={sunSprite}
					transparent
					blending={THREE.AdditiveBlending}
					depthWrite={false}
					toneMapped={false}
				/>
			</sprite>

			<points ref={stars} geometry={starGeom}>
				<pointsMaterial
					color="#cbd5e1"
					size={0.14}
					map={starSprite}
					alphaTest={0.02}
					sizeAttenuation
					transparent
					opacity={0.8}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</points>

			{/* atmosphere — day-blue limb + warm sunrise band at the terminator */}
			<mesh position={EARTH_C} material={atmoMaterial}>
				<sphereGeometry args={[EARTH_R + 0.5, 96, 96]} />
			</mesh>

			{/* earth */}
			<mesh ref={earth} position={EARTH_C}>
				<sphereGeometry args={[EARTH_R, 96, 96]} />
				<meshStandardMaterial
					map={earthMap}
					metalnessMap={earthSpec}
					metalness={0.6}
					roughness={0.78}
					emissive="#ffffff"
					emissiveMap={nightMap}
					emissiveIntensity={2.2}
					onBeforeCompile={(shader) => {
						shader.uniforms.uSunDirection = sunUniform.current;
						shader.fragmentShader = shader.fragmentShader
							.replace(
								"#include <common>",
								"#include <common>\nuniform vec3 uSunDirection;"
							)
							.replace(
								"#include <emissivemap_fragment>",
								`#include <emissivemap_fragment>
								// City lights only on the night side of the terminator.
								vec3 sunView = normalize((viewMatrix * vec4(uSunDirection, 0.0)).xyz);
								float dayFactor = smoothstep(-0.15, 0.25, dot(normalize(vNormal), sunView));
								totalEmissiveRadiance *= (1.0 - dayFactor);`
							);
					}}
				/>
			</mesh>

			{/* clouds — a slightly larger sphere drifting over the surface */}
			<mesh ref={clouds} position={EARTH_C}>
				<sphereGeometry args={[EARTH_R + 0.22, 96, 96]} />
				<meshStandardMaterial
					map={cloudsMap}
					transparent
					opacity={0.85}
					depthWrite={false}
				/>
			</mesh>

			{/* smoke pool */}
			{Array.from({ length: SMOKE }).map((_, i) => (
				<mesh key={i} ref={(el) => (puffRefs.current[i] = el)} visible={false}>
					<sphereGeometry args={[0.2, 8, 8]} />
					<meshBasicMaterial color="#e2e8f0" transparent opacity={0} depthWrite={false} />
				</mesh>
			))}

			{/* rocket + flame */}
			<group ref={rocket}>
				<RocketModel scale={0.42} />
				<mesh ref={flame} position={[0, -0.55, 0]} rotation={[Math.PI, 0, 0]}>
					<coneGeometry args={[0.12, 0.55, 14]} />
					<meshBasicMaterial color="#fb923c" transparent opacity={0.9} />
				</mesh>
			</group>

			{/* satellite */}
			<group ref={satellite} visible={false}>
				<SatelliteModel scale={0.5} />
			</group>
		</>
	);
};

export default OrbitScene;
