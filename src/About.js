import * as THREE from "three";
import { Link, useHistory } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function navigate(event, history, route) {
	const tl = gsap.timeline({
		defaults: { ease: "power2.inOut", duration: 0.4 },
	});

	tl.fromTo(".App-header", { opacity: 1 }, { opacity: 0 });

	if (route === "goBack") {
		history.goBack();
	} else {
		event.preventDefault();
		setTimeout(() => {
			history.push(route);
		}, 300);
	}
}

function About() {
	const glass = document.getElementById("glass");
	const history = useHistory();

	const tl = gsap.timeline({
		defaults: { ease: "power2.inOut", duration: 0.3 },
	});

	useEffect(() => {
		tl.fromTo(".App-header", { opacity: 0 }, { opacity: 1 })

			.from(".imagecontainer", { x: "-10%", opacity: 0 })
			.from(".container", { opacity: 0, delay: 0.5, duration: 1 }, "-=1.5")
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
			<a class="button-hover">
				<div class="back_button" id="glass">
					<Link
						onClick={(event) => navigate(event, history, "goBack")}
						style={{ textDecoration: "none" }}
					>
						<FontAwesomeIcon
							icon={faArrowLeft}
							color="white"
							size={40}
							style={{ alignSelf: "center", paddingTop: 10, paddingLeft: 10 }}
						/>
					</Link>
				</div>
			</a>

			<div class="header_container" id="glass">
				<h2 class="seq">About Me</h2>
			</div>
			<a class="button-hover">
				<div class="projects" id="glass">
					<Link
						onClick={(event) => navigate(event, history, "work")}
						style={{ textDecoration: "none" }}
						to="/work"
					>
						<h2 class="seq">Workexperience</h2>
					</Link>
				</div>
			</a>
			<a class="button-hover">
				<div class="about_me" id="glass">
					<Link
						onClick={(event) => navigate(event, history, "studies")}
						style={{ textDecoration: "none" }}
						to="/studies"
					>
						<h2 class="seq">Studies</h2>
					</Link>
				</div>
			</a>
			<a class="button-hover">
				<div class="contact" id="glass">
					<Link
						onClick={(event) => navigate(event, history, "myself")}
						style={{ textDecoration: "none" }}
						to="/myself"
					>
						<h2 class="seq">Personal</h2>
					</Link>
				</div>
			</a>
		</header>
	);
}

export default About;
