import { Link } from "react-router-dom";

// Hero content sits on the right; the shared Earth/orbit background shows
// through on the bottom-left.
const Home = () => {
	return (
		<section className="relative w-full min-h-screen flex items-center">
			<div className="w-full max-w-6xl mx-auto px-8 md:px-16 flex justify-end">
				<div className="max-w-xl">
					<p className="text-sm uppercase tracking-[0.3em] text-blue-300/80 mb-5">
						Frontend Engineer <span className="text-violet-400" aria-hidden="true">×</span> AI
					</p>
					<h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-[0_2px_24px_rgba(74,168,255,0.35)]">
						Yash{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
							Joshi
						</span>
					</h1>
					<p className="mt-6 text-lg text-slate-300 leading-relaxed">
						I build performant, accessible interfaces in React, Next.js, and
						TypeScript — and author AI-evaluation benchmarks that challenge
						frontier models.
					</p>
					<div className="mt-9 flex flex-wrap gap-4">
						<Link
							to="/projects"
							className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050813]"
						>
							View Projects
						</Link>
						<Link
							to="/contact"
							className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-slate-100 backdrop-blur-sm transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
						>
							Get in touch
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
