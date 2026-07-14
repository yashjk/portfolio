import CTA from "../components/CTA";
import { writings } from "../constants";

const Writing = () => {
	return (
		<section className="max-container">
			<p className="text-sm uppercase tracking-[0.3em] text-blue-300/80 mb-4">
				Writing
			</p>
			<h1 className="head-text">
				Posts &amp;{" "}
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 font-semibold">
					articles
				</span>
			</h1>
			<p className="text-slate-300 mt-4 leading-relaxed max-w-2xl">
				Engineering deep-dives and the occasional lesson learned — published on
				Medium.
			</p>

			{writings.length === 0 ? (
				<p className="mt-16 text-slate-400 italic">Writing coming soon.</p>
			) : (
				<ul className="mt-14 flex flex-col list-none p-0">
					{writings.map((post, index) => (
						<li key={`${post.title}-${index}`}>
							<a
								href={post.url}
								target="_blank"
								rel="noopener noreferrer"
								className="group block border-t border-white/10 py-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050813] rounded-sm"
							>
								<div className="flex items-center gap-4 text-xs uppercase tracking-widest text-slate-400">
									<span className="text-blue-300">{post.platform}</span>
									{post.date && (
										<>
											<span aria-hidden="true">·</span>
											<span>{post.date}</span>
										</>
									)}
								</div>
								<h2 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-100 transition group-hover:text-white">
									{post.title}
									<span className="sr-only"> (opens in a new tab)</span>
								</h2>
								{post.description && (
									<p className="mt-3 text-slate-400 leading-relaxed max-w-2xl">
										{post.description}
									</p>
								)}
								<span
									aria-hidden="true"
									className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition group-hover:text-blue-300"
								>
									Read on {post.platform}
									<span className="transition group-hover:translate-x-0.5">→</span>
								</span>
							</a>
						</li>
					))}
				</ul>
			)}

			<hr className="border-white/10 mt-8" />
			<CTA />
		</section>
	);
};

export default Writing;
