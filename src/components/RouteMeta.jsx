import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Per-route <title> and meta description. The SPA renders one HTML shell, so
// without this every route would share the homepage title. Keeping the copy
// here (rather than react-helmet) avoids a dependency for four static routes.
const META = {
	"/": {
		title: "Yash Joshi | Software Engineer",
		description:
			"Yash Joshi is a Software Engineer building fast, thoughtful web apps across the full stack. Explore projects, experience, and ways to get in touch.",
	},
	"/about": {
		title: "About | Yash Joshi",
		description:
			"About Yash Joshi — a Software Engineer's background, skills, and experience across the full stack.",
	},
	"/projects": {
		title: "Projects | Yash Joshi",
		description:
			"Selected projects by Yash Joshi — full-stack web apps, experiments, and things built for the web.",
	},
	"/writing": {
		title: "Writing | Yash Joshi",
		description:
			"Articles by Yash Joshi on engineering and the craft of building software — published on Medium.",
	},
	"/contact": {
		title: "Contact | Yash Joshi",
		description: "Get in touch with Yash Joshi, Software Engineer.",
	},
};

const FALLBACK = META["/"];

const RouteMeta = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		const meta = META[pathname] || FALLBACK;
		document.title = meta.title;

		let tag = document.querySelector('meta[name="description"]');
		if (!tag) {
			tag = document.createElement("meta");
			tag.setAttribute("name", "description");
			document.head.appendChild(tag);
		}
		tag.setAttribute("content", meta.description);
	}, [pathname]);

	return null;
};

export default RouteMeta;
