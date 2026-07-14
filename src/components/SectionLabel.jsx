// Editorial section marker — a numbered, uppercase label used to structure the
// About and Projects pages (e.g. "01 — Skills"). Typography-forward, no box.
const SectionLabel = ({ number, children }) => (
	<div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
		<span className="text-blue-300 font-semibold">{number}</span>
		<span aria-hidden="true" className="h-px w-8 bg-white/20" />
		<span>{children}</span>
	</div>
);

export default SectionLabel;
