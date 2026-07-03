import { useEffect, useRef, useState } from "react";
import itachi from "../assets/itachi.mp3";

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
			className="fixed bottom-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050813]"
		>
			<svg
				viewBox="0 0 24 24"
				className="h-5 w-5"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
				{isPlaying ? (
					<>
						<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
						<path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
					</>
				) : (
					<>
						<line x1="23" y1="9" x2="17" y2="15" />
						<line x1="17" y1="9" x2="23" y2="15" />
					</>
				)}
			</svg>
		</button>
	);
};

export default MusicToggle;
