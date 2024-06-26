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
	threads,
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
			"Developing and maintaining web applications using React.js and other related technologies.",
			"Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
			"Implementing responsive design and ensuring cross-browser compatibility.",
			"Participating in code reviews and providing constructive feedback to other developers.",
		],
	},
	{
		title: "Software Engineer and Technical Writer",
		company_name: "BigBinary Academy",
		icon: bba,
		iconBg: "#fbc3bc",
		date: "December 2022 - Present",
		points: [
			"Contributed to the development and maintenance of the full-stack learning platform bigbinaryacademy.com.",
			"Designed and developed courses and exercises to enhance student learning experiences.",
			"Built and launched new projects aimed at improving student engagement and learning outcomes.",
			"Collaborated with cross-functional teams to ensure seamless integration of new features and tools.",
			"Conducted user research and feedback sessions to continuously improve course content and platform usability.",
			"Implemented responsive design principles to ensure a consistent experience across devices.",
			"Utilized analytics to track student progress and optimize learning pathways.",
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
		name: "Banking App",
		description:
			"Developed a web application that tracks and notifies users of price changes for products on Amazon, helping users find the best deals.",
		link: "https://github.com/adrianhajdin/pricewise",
	},
	{
		iconUrl: threads,
		theme: "btn-back-green",
		name: "Full Stack Threads Clone",
		description:
			'Created a full-stack replica of the popular discussion platform "Threads," enabling users to post and engage in threaded conversations.',
		link: "https://github.com/adrianhajdin/threads",
	},
	{
		iconUrl: car,
		theme: "btn-back-blue",
		name: "Car Finding App",
		description:
			"Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.",
		link: "https://github.com/adrianhajdin/project_next13_car_showcase",
	},
	{
		iconUrl: snapgram,
		theme: "btn-back-pink",
		name: "Full Stack Instagram Clone",
		description:
			"Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.",
		link: "https://github.com/yashjk/insta_clone",
	},
	{
		iconUrl: estate,
		theme: "btn-back-black",
		name: "Real-Estate Application",
		description:
			"Developed a web application for real estate listings, facilitating property searches and connecting buyers with sellers.",
		link: "https://github.com/adrianhajdin/projects_realestate",
	},
	{
		iconUrl: summiz,
		theme: "btn-back-yellow",
		name: "AI Summarizer Application",
		description:
			"App that leverages AI to automatically generate concise & informative summaries from lengthy text content, or blogs.",
		link: "https://github.com/adrianhajdin/project_ai_summarizer",
	},
];
