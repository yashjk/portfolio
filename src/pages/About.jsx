import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";

import React from "react";
import { experiences, skills } from "../constants";
import CTA from "../components/CTA";

const About = () => {
	return (
		<section className="max-container">
			<h1 className="head-text">
				Hello, I'm{" "}
				<span className="blue-gradient_text font-semibold drop-shadow">
					Yash
				</span>
			</h1>

			<div className="mt-5 flex flex-col gap-3 text-slate-300">
				<p>
					Frontend-focused full-stack engineer based in India with 5+ years across
					React, Next.js, and TypeScript. I build performant, accessible UIs and
					scalable frontend architecture — from a fintech platform I built from
					scratch to AI-evaluation benchmarks that challenge frontier LLMs.
				</p>
			</div>

			<div className="py-10 flex flex-col">
				<h3 className="subhead-text">My Skills</h3>

				<ul className="mt-16 flex flex-wrap gap-12 list-none p-0" aria-label="Skills">
					{skills.map((skill) => (
						<li className="block-container w-20 h-20" key={skill.name}>
							<div className="btn-back rounded-xl" aria-hidden="true" />
							<div className="btn-front rounded-xl flex justify-center items-center">
								<img
									src={skill.imageUrl}
									alt={skill.name}
									className="w-1/2 h-1/2 object-contain"
								/>
							</div>
						</li>
					))}
				</ul>
			</div>

			<div className="py-16">
				<h3 className="subhead-text">Work Experience.</h3>
				<div className="mt-5 flex flex-col gap-3 text-slate-300">
					<p>
						I've worked with various companies, leveling up my skills and
						teaming up with smart people. Here's the rundown:
					</p>
				</div>

				<div className="mt-12 flex">
					<VerticalTimeline>
						{[...experiences].reverse().map((experience, index) => (
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
										className="text-slate-300 font-medium text-base"
										style={{ margin: 0 }}
									>
										{experience.company_name}
									</p>
								</div>

								<ul className="my-5 list-disc ml-5 space-y-2">
									{experience.points.map((point, index) => (
										<li
											key={`experience-point-${index}`}
											className="text-slate-200 font-normal pl-1 text-sm"
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

			<hr className="border-slate-200" />

			<CTA />
		</section>
	);
};

export default About;
