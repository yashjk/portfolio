import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const LINKS = [
	{ to: "/about", label: "About" },
	{ to: "/projects", label: "Projects" },
	{ to: "/writing", label: "Writing" },
	{ to: "/contact", label: "Contact" },
];

const focusRing =
	"focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050813]";

const linkClass = ({ isActive }) =>
	`rounded transition ${focusRing} ${
		isActive ? "text-blue-400" : "text-slate-300 hover:text-white"
	}`;

const mobileLinkClass = ({ isActive }) =>
	`block rounded-lg px-4 py-3 text-lg font-medium transition ${focusRing} ${
		isActive ? "text-blue-400 bg-white/5" : "text-slate-200 hover:bg-white/5 hover:text-white"
	}`;

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const { pathname } = useLocation();

	// Close the menu after navigating.
	useEffect(() => setOpen(false), [pathname]);

	// Escape closes the menu.
	useEffect(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	return (
		<header className="header">
			<NavLink
				to="/"
				aria-label="Yash Joshi — home"
				className={`w-10 h-10 shrink-0 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm items-center justify-center flex font-bold text-white shadow-md ${focusRing}`}
			>
				<p aria-hidden="true">YJ</p>
			</NavLink>

			{/* Wide screens: inline links. Below `sm` these don't fit, so they're
			    swapped for the menu button below. */}
			<nav aria-label="Primary" className="hidden sm:flex text-lg gap-7 font-medium">
				{LINKS.map(({ to, label }) => (
					<NavLink key={to} to={to} className={linkClass}>
						{label}
					</NavLink>
				))}
			</nav>

			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				aria-controls="mobile-nav"
				aria-label={open ? "Close menu" : "Open menu"}
				className={`sm:hidden w-10 h-10 shrink-0 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-slate-100 transition hover:bg-white/15 ${focusRing}`}
			>
				<svg
					viewBox="0 0 24 24"
					className="w-5 h-5 stroke-current"
					fill="none"
					strokeWidth="2"
					strokeLinecap="round"
					aria-hidden="true"
				>
					{open ? (
						<path d="M6 6l12 12M18 6L6 18" />
					) : (
						<path d="M4 7h16M4 12h16M4 17h16" />
					)}
				</svg>
			</button>

			{open && (
				<nav
					id="mobile-nav"
					aria-label="Primary"
					className="sm:hidden absolute top-full left-8 right-8 mt-2 flex flex-col rounded-xl border border-white/15 bg-[#050813]/95 p-2 shadow-2xl backdrop-blur-md"
				>
					{LINKS.map(({ to, label }) => (
						<NavLink key={to} to={to} className={mobileLinkClass}>
							{label}
						</NavLink>
					))}
				</nav>
			)}
		</header>
	);
};

export default Navbar;
