import { useHistory, Link } from "react-router-dom";
import "../App.css";
import React, { useEffect } from "react";
import gsap from "gsap";
import image from "../Assets/DSC00684.jpg";
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

function Personal() {
	const glass = document.getElementById("glass");
	const history = useHistory();

	const tl = gsap.timeline({
		defaults: { ease: "power2.inOut", duration: 0.5 },
	});

	useEffect(() => {
		tl.fromTo(".App-header", { opacity: 0 }, { opacity: 1 })

			.from(".imagecontainer", { x: "-10%", opacity: 0 })
			.from(
				".inside_container",
				{ opacity: 0, delay: 0.5, duration: 1 },
				"-=1.5"
			)
			.from(
				".second_imagecontainer",
				{ opacity: 0, delay: 0.5, duration: 1 },
				"-=1.5"
			)
			.from(".second_imagecontainer", { x: "40%", backdropFilter: "blur(0px)" })
			.from(
				".seq",
				{ y: -30, opacity: 0, stagger: 0.2, duration: 0.5 },
				"-=.5"
			);
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
			<div class="inside_container" id="glass">
				<h2 class="seq">About Me</h2>
				<h3 class="seq">This is a short section about myself.</h3>
				<h4 class="seq">
					Besides coding and studying I´m a passionate guitarist in 2 Bands
					which I´m very proud of and which takes a lot of my freetime.
					Otherwise I love to cook, spend time with my girlfriend or have a beer
					with my beloved friends. I love to do roadtrips even on rainy days,
					but I also love reading a book with a good cup of tea. I would
					describe myself as an open minded Person who loves to face new
					challenges and make new experiences :){" "}
				</h4>
			</div>
		</header>
	);
}

export default Personal;
