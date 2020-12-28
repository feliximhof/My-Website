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

function Work() {
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
			.from(".seq", { y: -30, opacity: 0, stagger: 0.2, duration: 0.5 }, "-=.5")
			.from(
				".subseq",
				{ y: -30, opacity: 0, stagger: 0.2, duration: 0.5 },
				"-=.5"
			)
			.from(
				".description",
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
				<h2 class="seq">My Workexperience</h2>
				<p>
					<h3 class="seq">Software Developer </h3>
					<h5 class="subseq">Aurora Lifescience (1.5 years)</h5>
					<h4 class="description">
						- Frontend Development of a Healthcare Mobile App with React Native
						and Redux
					</h4>
				</p>
				<p>
					<h3 class="seq">Software Developer / Tester </h3>
					<h5 class="subseq">axxessio GmbH (1 year)</h5>
					<h4 class="description">- Front-End Development of Android Apps</h4>
					<h4 class="description">
						- Software-Testing and Evaluation for Smart Home Devices
					</h4>
				</p>
				<p>
					<h3 class="seq">Software Developer </h3>
					<h5 class="subseq">
						Technical University of Darmstadt, Germany (1.5 years)
					</h5>
					<h4 class="description">
						- Development of an Android App for reading and visualizing data
						from wearables
					</h4>
					<h4 class="description">
						- Development of a control interface in C# for an adaptive workshop
						table
					</h4>
				</p>
				<p>
					<h3 class="seq">Research and Development Assistant </h3>
					<h5 class="subseq">ZF Group (1.5 years)</h5>
					<h4 class="description">
						- Supporting the Core-Engineering Team of one of Europe’s biggest
						steering wheel suppliers in developing new Technologies in the
						mechanical, electrical and chemical sector
					</h4>
					<h4 class="description">
						- Laboratory work including tension testing with automated
						evaluation or adhesion experiments with full planning and evaluation
					</h4>
				</p>
			</div>
		</header>
	);
}

export default Work;
