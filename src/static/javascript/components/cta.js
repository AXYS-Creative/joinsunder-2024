import { mqMouse } from "../utility.js";

const ctaBtns = document.querySelectorAll(".cta");

if (mqMouse) {
  ctaBtns.forEach((btn) => {
    const hoverFill = btn.querySelector(".hover-fill");

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      hoverFill.style.setProperty("--mouse-x", `${y}px`);
      hoverFill.style.setProperty("--mouse-y", `${x}px`);
    });
  });
}
