import { useEffect, useRef, useState } from "react";
import itachi from "../assets/itachi.mp3";
import { soundoff, soundon } from "../assets/icons";

// Global background-music control. Rendered once in App so the track persists
// across route changes instead of restarting. Implemented as a real <button>
// (not a bare <img>) so it's keyboard-focusable and announced to screen
// readers. Starts paused — browsers block audio autoplay until a user gesture,
// and unexpected sound-on-load is itself an accessibility problem.
const MusicToggle = () => {
	const audioRef = useRef(null);
	if (!audioRef.current) {
		audioRef.current = new Audio(itachi);
		audioRef.current.volume = 0.4;
		audioRef.current.loop = true;
	}

	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const audio = audioRef.current;
		if (isPlaying) {
			// Swallow the autoplay-policy rejection and reflect reality in the UI.
			audio.play().catch(() => setIsPlaying(false));
		} else {
			audio.pause();
		}
	}, [isPlaying]);

	return (
		<button
			type="button"
			onClick={() => setIsPlaying((p) => !p)}
			aria-pressed={isPlaying}
			aria-label={isPlaying ? "Turn background music off" : "Turn background music on"}
			className="fixed bottom-4 right-4 z-20 rounded-full bg-blue-500 p-1 transition hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050813]"
		>
			<img
				src={isPlaying ? soundon : soundoff}
				alt=""
				aria-hidden="true"
				className="w-10 h-10 object-contain"
			/>
		</button>
	);
};

export default MusicToggle;
