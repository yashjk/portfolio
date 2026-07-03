import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
	`rounded transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050813] ${
		isActive ? "text-blue-400" : "text-slate-300 hover:text-white"
	}`;

const Navbar = () => {
	return (
		<header className="header">
			<NavLink
				to="/"
				aria-label="Yash Joshi — home"
				className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm items-center justify-center flex font-bold text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050813]"
			>
				<p aria-hidden="true">YJ</p>
			</NavLink>
			<nav aria-label="Primary" className="flex text-lg gap-7 font-medium">
				<NavLink to="/about" className={linkClass}>
					About
				</NavLink>
				<NavLink to="/projects" className={linkClass}>
					Projects
				</NavLink>
				<NavLink to="/contact" className={linkClass}>
					Contact
				</NavLink>
			</nav>
		</header>
	);
};

export default Navbar;
