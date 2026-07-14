import { meta, shopify, vineti, bba, automint, theta, agastya } from "../assets/images";
import {
	car,
	contact,
	css,
	estate,
	express,
	git,
	github,
	html,
	javascript,
	linkedin,
	mongodb,
	mui,
	nextjs,
	nodejs,
	pricewise,
	react,
	redux,
	sass,
	snapgram,
	summiz,
	tailwindcss,
	apple,
	typescript,
} from "../assets/icons";

export const skills = [
	{
		imageUrl: css,
		name: "CSS",
		type: "Frontend",
	},
	{
		imageUrl: express,
		name: "Express",
		type: "Backend",
	},
	{
		imageUrl: git,
		name: "Git",
		type: "Version Control",
	},
	{
		imageUrl: github,
		name: "GitHub",
		type: "Version Control",
	},
	{
		imageUrl: html,
		name: "HTML",
		type: "Frontend",
	},
	{
		imageUrl: javascript,
		name: "JavaScript",
		type: "Frontend",
	},
	{
		imageUrl: mongodb,
		name: "MongoDB",
		type: "Database",
	},
	{
		imageUrl: mui,
		name: "Material-UI",
		type: "Frontend",
	},
	{
		imageUrl: nextjs,
		name: "Next.js",
		type: "Frontend",
	},
	{
		imageUrl: nodejs,
		name: "Node.js",
		type: "Backend",
	},
	{
		imageUrl: react,
		name: "React",
		type: "Frontend",
	},
	{
		imageUrl: redux,
		name: "Redux",
		type: "State Management",
	},
	{
		imageUrl: sass,
		name: "Sass",
		type: "Frontend",
	},
	{
		imageUrl: tailwindcss,
		name: "Tailwind CSS",
		type: "Frontend",
	},
	{
		imageUrl: typescript,
		name: "TypeScript",
		type: "Frontend",
	}
];

export const experiences = [
	{
		title: "Software Engineer",
		company_name: "Vineti",
		icon: vineti,
		iconBg: "#accbe1",
		date: "November 2020 - December 2022",
		points: [
			"Implemented complex data visualization features, enhancing data accuracy by 30%.",
      "Integrated third-party APIs for real-time data syncing, increasing data processing speed by 50%.",
      "Ensured compliance with healthcare regulations, reducing compliance issues by 25%.",
      "Conducted performance optimization for large datasets.",
      "Participated in code reviews, reducing code errors by 20%."
		],
	},
	{
		title: "Software Engineer and Technical Writer",
		company_name: "BigBinary Academy",
		icon: bba,
		iconBg: "#fbc3bc",
		date: "December 2022 - June 2024",
		points: [
      "Contributed to the development of the full-stack learning platform https://bigbinaryacademy.com/ -Designed courses, improving student performance by 30%.",
      "Launched new projects, increasing engagement by 35%.",
      "Integrated new features, reducing implementation time by 25%.",
      "Conducted user research to enhance platform usability.",
      "Tracked student progress using analytics to optimize learning pathways."
		],
	},
	{
		title: "Senior Frontend Engineer",
		company_name: "Automint",
		icon: automint,
		iconBg: "#ffffff",
		borderColor: "#b7e4c7",
		date: "January 2025 - December 2025",
		points: [
			"Sole frontend engineer — built the entire platform from scratch in Next.js, React 19, and TypeScript for a device-leasing (Device-as-a-Service) fintech product.",
			"Architected a Zustand slice-pattern state layer and a reusable library of 50+ components that served as an internal design system.",
			"Built a multi-step Razorpay payment workflow as a state machine, an eligibility-rules engine, and OTP/JWT authentication.",
			"Cut initial load time ~40% via SSR, code-splitting, and custom list virtualization for heavy data grids.",
			"Implemented end-to-end observability (OpenTelemetry + Grafana Faro), CI/CD (GitHub Actions), and ~90% E2E coverage with Playwright.",
		],
	},
	{
		title: "Software Engineer — AI Evaluation & Frontend",
		company_name: "Theta Software",
		icon: theta,
		iconBg: "#ffffff",
		borderColor: "#a2d2ff",
		date: "December 2025 - June 2026",
		points: [
			"Authored verifiable software-engineering benchmark tasks on the Harbor eval framework that defeated frontier models (Opus 4.7/4.8, GPT-5.5).",
			"Built contamination-proof single-container Docker environments with Fail-to-Pass / Pass-to-Pass Playwright tests and an LLM rubric judge.",
			"Built a Dynamics-365 CRM clone in Next.js + TypeScript with a Recharts visualization suite and Zustand state.",
			"Engineered an Advanced Report engine (~82 SQL filter builders), billing, and provider-settings modules for a healthcare EMR.",
			"Root-caused a data-integrity bug that had been inflating benchmark scores.",
		],
	}
];

export const socialLinks = [
	{
		name: "Contact",
		iconUrl: contact,
		link: "/contact",
	},
	{
		name: "GitHub",
		iconUrl: github,
		link: "https://github.com/yashjk",
	},
	{
		name: "LinkedIn",
		iconUrl: linkedin,
		link: "https://www.linkedin.com/in/yash-joshi-2834491a2/",
	},
];

// External social profiles rendered in the footer. `icon` matches a key in
// Footer's inline monochrome SVG set (keeps the footer cohesively muted rather
// than pulling in the brand-colored .svg assets).
export const socials = [
	{ name: "GitHub", icon: "github", link: "https://github.com/yashjk" },
	{
		name: "LinkedIn",
		icon: "linkedin",
		link: "https://www.linkedin.com/in/yash-joshi-2834491a2/",
	},
	{ name: "X", icon: "x", link: "https://x.com/joshiyash1206" },
	{
		name: "Instagram",
		icon: "instagram",
		link: "https://www.instagram.com/techy_vagabond/",
	},
];

export const projects = [
	{
		iconUrl: agastya,
		theme: "btn-back-blue",
		name: "Agastya Pharma",
		description:
			"Live client website for a pharmaceutical consultancy, built with Next.js (App Router), React, TypeScript, Tailwind CSS, and shadcn/ui — a multi-page marketing site with services, turnkey solutions, industries, a blog with dynamic routes, and a contact form.",
		live_link: "https://www.agastyapharma.com/",
	},
	{
		iconUrl: pricewise,
		theme: "btn-back-red",
		name: "BankEase",
		description:
			"Comprehensive banking application using TypeScript, Next.js, Chart.js, TailwindCSS, shadcn/ui, Appwrite, Plaid, and Dwolla.",
		source_code: "https://github.com/yashjk/bank-ease",
		live_link: "https://bank-ease.vercel.app/",
	},
	{
		iconUrl: apple,
		theme: "btn-back-green",
		name: "Apple website clone",
		description:
			"Developed with React, GSAP, Three.js, and Tailwind CSS, featuring dynamic animations and 3D models.",
		source_code: "https://github.com/yashjk/apple_website",
		live_link: "https://apple-website-gray.vercel.app/",
	},
	{
		iconUrl: snapgram,
		theme: "btn-back-pink",
		name: "SocialSphere",
		description:
			"Social networking platform with dynamic user profiles and rich media posts, built using React, GSAP, Tailwind CSS, React Hook Form, and SolidJS Dropzone.",
		source_code: "https://github.com/yashjk/SocialSphere",
		live_link: "https://social-sphere-lime.vercel.app/",
	}
];
