import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";

const Contact = () => {
	const formRef = useRef(null);
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [isLoading, setIsLoading] = useState(false);
	const { alert, showAlert, hideAlert } = useAlert();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		emailjs
			.send(
				import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
				{
					from_name: form.name,
					to_name: "Yash",
					from_email: form.email,
					to_email: "injose.joshi@gmail.com",
					message: form.message,
				},
				import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
			)
			.then(() => {
				setIsLoading(false);
				showAlert({ show: true, text: "Message sent successfully", type: "success" });
				setTimeout(() => {
					hideAlert();
					setForm({ name: "", email: "", message: "" });
				}, 3000);
			})
			.catch(() => {
				setIsLoading(false);
				showAlert({ show: true, text: "I didn't receive your message", type: "danger" });
			});
	};

	return (
		<section className="relative min-h-screen flex items-center max-container">
			{alert.show && <Alert {...alert} />}

			<div className="w-full max-w-xl lg:ml-auto rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md p-8 md:p-10 shadow-2xl">
				<h1 className="head-text">Get In Touch</h1>
				<p className="mt-3 text-slate-400">
					Have a role or a project in mind? Send me a message.
				</p>

				<form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-6 mt-8">
					<label className="text-slate-300 font-semibold">
						Name
						<input
							type="text"
							name="name"
							className="input"
							placeholder="John"
							required
							value={form.name}
							onChange={handleChange}
						/>
					</label>
					<label className="text-slate-300 font-semibold">
						Email
						<input
							type="email"
							name="email"
							className="input"
							placeholder="john@gmail.com"
							required
							value={form.email}
							onChange={handleChange}
						/>
					</label>
					<label className="text-slate-300 font-semibold">
						Your Message
						<textarea
							name="message"
							className="textarea"
							placeholder="Let me know how I can help you?"
							rows={4}
							required
							value={form.message}
							onChange={handleChange}
						/>
					</label>
					<button type="submit" className="btn" disabled={isLoading}>
						{isLoading ? "Sending..." : "Send Message"}
					</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
