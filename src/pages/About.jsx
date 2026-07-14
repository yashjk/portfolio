import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
// Base layout styles for the timeline (line, icon circles, spacing). Without
// this the element icons render at full size. Inline contentStyle overrides
// below keep the cards transparent over the animated background.
import "react-vertical-timeline-component/style.min.css";

import React from "react";
import { experiences, skills } from "../constants";
import CTA from "../components/CTA";
import SectionLabel from "../components/SectionLabel";

const About = () => {
	return (
		<section className="max-container">
			<p className="text-sm uppercase tracking-[0.3em] text-blue-300/80 mb-4">
				About
			</p>
			<h1 className="head-text">
				Hello, I'm{" "}
				<span className="blue-gradient_text font-semibold drop-shadow">
					Yash
				</span>
			</h1>

			<div className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
				<p>
					Frontend-focused full-stack engineer based in India with 5+ years across
					React, Next.js, and TypeScript. I build performant, accessible UIs and
					scalable frontend architecture — from a fintech platform I built from
					scratch to AI-evaluation benchmarks that challenge frontier LLMs.
				</p>
			</div>

			<a
				href="/Yash_Joshi_Resume.pdf"
				download
				className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050813]"
			>
				<span aria-hidden="true">↓</span> Download Résumé
			</a>

			<div className="pt-20">
				<SectionLabel number="01">Skills</SectionLabel>

				<ul
					className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 list-none p-0"
					aria-label="Skills"
				>
					{skills.map((skill) => (
						<li
							key={skill.name}
							className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-white/25 hover:bg-white/[0.06]"
						>
							<img
								src={skill.imageUrl}
								alt=""
								aria-hidden="true"
								className="w-6 h-6 object-contain shrink-0"
							/>
							<span className="text-sm font-medium text-slate-200">
								{skill.name}
							</span>
						</li>
					))}
				</ul>
			</div>

			<div className="pt-20">
				<SectionLabel number="02">Experience</SectionLabel>
				<p className="mt-6 max-w-2xl text-slate-300 leading-relaxed">
					Companies I've worked with, and what I shipped along the way.
				</p>

				<div className="mt-10 flex">
					<VerticalTimeline>
						{[...experiences].reverse().map((experience) => (
							<VerticalTimelineElement
								className="mt-12"
								key={experience.company_name}
								date={experience.date}
								iconStyle={{ background: experience.iconBg }}
								icon={
									<div className="flex justify-center items-center w-full h-full">
										<img
											src={experience.icon}
											alt=""
											aria-hidden="true"
											className="w-[60%] h-[60%] object-contain"
										/>
									</div>
								}
								contentStyle={{
									background: "transparent",
									color: "#e2e8f0",
									boxShadow: "none",
									padding: "0 0 0 8px",
									// No card surface — keep text legible on the animated
									// background with a shadow (preserves WCAG contrast).
									textShadow: "0 1px 6px rgba(0, 0, 0, 0.95)",
								}}
								contentArrowStyle={{ borderRight: "7px solid transparent" }}
							>
								<div>
									<h3 className="text-white text-xl font-poppins font-semibold">
										{experience.title}
									</h3>
									<p
										className="text-blue-300/90 font-medium text-base"
										style={{ margin: 0 }}
									>
										{experience.company_name}
									</p>
								</div>

								<ul className="my-5 list-disc ml-5 space-y-2">
									{experience.points.map((point, index) => (
										<li
											key={`experience-point-${index}`}
											className="text-slate-200 font-normal pl-1 text-sm leading-relaxed"
										>
											{point}
										</li>
									))}
								</ul>
							</VerticalTimelineElement>
						))}
					</VerticalTimeline>
				</div>
			</div>

			<hr className="border-white/10 mt-8" />

			<CTA />
		</section>
	);
};

export default About;
