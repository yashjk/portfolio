import { meta, shopify, vineti, bba } from "../assets/images";
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

export const projects = [
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
