import * as THREE from "three";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import React, {
  Suspense,
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import gsap from "gsap";

function Projects() {

  const glass = document.getElementById("glass");

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut", duration: 0.3 },
  });

  useEffect(() => {

    tl.fromTo('.App-header', {opacity: 0}, {opacity: 1})

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
      <div class="header_container" id="glass">
          <h2 class="seq">Projects</h2>
          
        </div>
        </header>

   
  );
}

export default Projects;
