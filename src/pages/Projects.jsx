import CTA from "../components/CTA";
import { projects } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
	return (
		<section className="max-container min-h-screen">
			<h1 className="head-text">
				My{" "}
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 font-semibold">
					Projects
				</span>
			</h1>

			<p className="text-slate-300 mt-3 leading-relaxed max-w-3xl">
				A mix of live client work and personal builds. Many are open-source — feel
				free to explore the code and the live demos.
			</p>

			<div className="flex flex-wrap my-16 gap-10">
				{projects.map((project) => (
					<div
						key={project.name}
						className="relative lg:w-[400px] w-full flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.37)] ring-1 ring-inset ring-white/10 backdrop-blur-xl backdrop-saturate-150"
					>
						{/* liquid-glass sheen */}
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent"
						/>

						<div className="relative z-10 block-container w-12 h-12">
							<div className={`btn-back rounded-xl ${project.theme}`} />
							<div className="btn-front rounded-xl flex justify-center items-center">
								<img
									src={project.iconUrl}
									alt={`${project.name} logo`}
									className="w-1/2 h-1/2 object-contain"
								/>
							</div>
						</div>

						<div className="relative z-10 mt-5 flex flex-1 flex-col">
							<h4 className="text-2xl font-poppins font-semibold text-white">
								{project.name}
							</h4>
							<p className="mt-2 text-slate-300">{project.description}</p>
							<div className="mt-auto pt-5 flex items-center gap-3 font-poppins">
								{project.source_code && (
									<a
										href={project.source_code}
										target="_blank"
										rel="noopener noreferrer"
										className="rounded font-semibold text-blue-400 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050813]"
									>
										Source Code
										<span className="sr-only"> for {project.name} (opens in a new tab)</span>
									</a>
								)}
								<a
									href={project.live_link}
									target="_blank"
									rel="noopener noreferrer"
									className="rounded font-semibold text-blue-400 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050813]"
								>
									Live Link
									<span className="sr-only"> for {project.name} (opens in a new tab)</span>
								</a>
								<img src={arrow} alt="" aria-hidden="true" className="w-4 h-4 object-contain" />
							</div>
						</div>
					</div>
				))}
			</div>

			<hr className="border-white/10" />

			<CTA />
		</section>
	);
};

export default Projects;
