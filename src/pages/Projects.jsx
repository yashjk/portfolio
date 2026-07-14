import CTA from "../components/CTA";
import { projects } from "../constants";
import { arrow } from "../assets/icons";
import SectionLabel from "../components/SectionLabel";

const linkClass =
	"inline-flex items-center gap-1 rounded font-semibold text-blue-400 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050813]";

const Projects = () => {
	return (
		<section className="max-container min-h-screen">
			<p className="text-sm uppercase tracking-[0.3em] text-blue-300/80 mb-4">
				Work
			</p>
			<h1 className="head-text">
				Selected{" "}
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 font-semibold">
					projects
				</span>
			</h1>

			<p className="text-slate-300 mt-4 leading-relaxed max-w-2xl">
				A mix of live client work and personal builds. Many are open-source — feel
				free to explore the code and the live demos.
			</p>

			<div className="pt-14">
				<SectionLabel number="01">Projects</SectionLabel>

				<div className="mt-10 grid gap-6 md:grid-cols-2">
					{projects.map((project) => (
						<article
							key={project.name}
							className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-white/20 hover:bg-white/[0.05]"
						>
							<div className="flex items-center gap-4">
								<div className="block-container w-11 h-11 shrink-0">
									<div className={`btn-back rounded-xl ${project.theme}`} />
									<div className="btn-front rounded-xl flex justify-center items-center">
										<img
											src={project.iconUrl}
											alt={`${project.name} logo`}
											className="w-1/2 h-1/2 object-contain"
										/>
									</div>
								</div>
								<h2 className="text-xl md:text-2xl font-poppins font-semibold text-white">
									{project.name}
								</h2>
							</div>

							<p className="mt-4 flex-1 text-slate-300 leading-relaxed">
								{project.description}
							</p>

							<div className="mt-6 flex items-center gap-5 font-poppins text-sm">
								{project.source_code && (
									<a
										href={project.source_code}
										target="_blank"
										rel="noopener noreferrer"
										className={linkClass}
									>
										Source
										<span className="sr-only"> code for {project.name} (opens in a new tab)</span>
									</a>
								)}
								<a
									href={project.live_link}
									target="_blank"
									rel="noopener noreferrer"
									className={linkClass}
								>
									Live
									<span className="sr-only"> demo of {project.name} (opens in a new tab)</span>
									<img src={arrow} alt="" aria-hidden="true" className="w-3.5 h-3.5 object-contain" />
								</a>
							</div>
						</article>
					))}
				</div>
			</div>

			<hr className="border-white/10 mt-16" />

			<CTA />
		</section>
	);
};

export default Projects;
