import { Link, useHistory } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";
import gsap from "gsap";
import image from "./Assets/DSC00683.jpg";

function navigate(event, history, route) {
	const tl = gsap.timeline({
		defaults: { ease: "power2.inOut", duration: 0.4 },
	});

	tl.fromTo(".App-header", { opacity: 1 }, { opacity: 0 });

	event.preventDefault();
	setTimeout(() => {
		history.push(route);
	}, 300);
}

function App() {
	const glass = document.getElementById("glass");
	const history = useHistory();

	const tl = gsap.timeline({
		defaults: { ease: "power2.inOut", duration: 0.3 },
	});

	useEffect(() => {
		tl.fromTo(".App-header", { opacity: 0 }, { opacity: 1 })
			.from(".imagecontainer", { x: "-10%", opacity: 0 })
			.from(".container", { opacity: 0, delay: 0.5, duration: 1 }, "-=1.5")
			.from(".container", { x: "-20%", backdropFilter: "blur(0px)" })
			.from(".about_me", { opacity: 0, delay: 0.5, duration: 1 }, "-=1.5")
			.from(".about_me", { x: "25%", backdropFilter: "blur(0px)" })
			.from(".contact", { opacity: 0, delay: 0.5, duration: 1 }, "-=1.5")
			.from(".contact", { y: "30%", backdropFilter: "blur(0px)" })
			.from(".projects", { opacity: 0, delay: 0.5, duration: 1 }, "-=1.5")
			.from(".projects", { x: "-10%", backdropFilter: "blur(0px)" })
			.from(".seq", { y: -30, opacity: 0, stagger: 0.2, duration: 0.5 }, "-=.5")
			.from("h1", { y: 20, clipPath: "inset(0 0 100% 0)" }, "-=.8");
	}, []);

	return (
		<header className="App-header">
			<div className="imagecontainer">
				<img className="image" src={image} />
			</div>

			<div class="container" id="glass">
				<h2 class="seq">Felix Imhof</h2>
				<p class="seq">React Developer</p>
				<p class="seq">and Engineer</p>
			</div>

			<a class="button-hover">
				<div class="projects" id="glass">
					<Link
						onClick={(event) => navigate(event, history, "projects")}
						style={{ textDecoration: "none" }}
						to="/projects"
					>
						<h2 class="seq">Recent Projects</h2>
					</Link>
				</div>
			</a>
			<a class="button-hover">
				<div class="about_me" id="glass">
					<Link
						onClick={(event) => navigate(event, history, "about")}
						style={{ textDecoration: "none" }}
						to="/about"
					>
						<h2 class="seq">About Me</h2>
					</Link>
				</div>
			</a>
			<a class="button-hover">
				<div class="contact" id="glass">
					<Link
						onClick={(event) => navigate(event, history, "contact")}
						style={{ textDecoration: "none" }}
						to="/contact"
					>
						<h2 class="seq">Contact Me</h2>
					</Link>
				</div>
			</a>
		</header>
	);
}

export default App;
