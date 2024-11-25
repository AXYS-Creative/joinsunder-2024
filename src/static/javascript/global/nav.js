import { isMouseDevice, mqMaxXxl } from "../utility.js";

const siteNav = document.querySelector(".site-nav"),
  navBtn = document.querySelector(".nav-btn"),
  mainContent = document.querySelector(".main-content");

const navLinks = document.querySelectorAll(".nav-link"),
  tabElementsPage = document.querySelectorAll(".tab-element-page"),
  tabElementsNav = document.querySelectorAll(".tab-element-nav");

tabElementsNav.forEach((elem) => elem.setAttribute("tabIndex", "-1"));

let isNavOpen;

const toggleNav = () => {
  isNavOpen = siteNav.classList.contains("site-nav--active");

  siteNav.classList.toggle("site-nav--active");
  mainContent.classList.toggle("main-content--nav-active");

  // Set aria-hidden based on the new state of the navigation
  siteNav.setAttribute("aria-hidden", isNavOpen ? "true" : "false");

  // Update aria-expanded, aria-pressed, and aria-label on the nav button
  navBtn.setAttribute("aria-expanded", isNavOpen ? "false" : "true");
  navBtn.setAttribute(
    "aria-label",
    isNavOpen ? "Open navigation menu" : "Close navigation menu"
  );

  // Update tabindex for tabElementsPage and tabElementsNav
  tabElementsPage.forEach((el) =>
    el.setAttribute("tabindex", isNavOpen ? "0" : "-1")
  );
  tabElementsNav.forEach((el) =>
    el.setAttribute("tabindex", isNavOpen ? "-1" : "0")
  );

  mainContent.addEventListener("click", closeNav); // Cleaned up in closeNav()
};

const closeNav = () => {
  siteNav.setAttribute("aria-hidden", "true");
  navBtn.setAttribute("aria-expanded", "false");

  siteNav.classList.remove("site-nav--active");
  mainContent.classList.remove("main-content--nav-active");

  // Reset tabindex for tabElementsPage and tabElementsNav
  tabElementsPage.forEach((el) => el.setAttribute("tabindex", "0"));
  tabElementsNav.forEach((el) => el.setAttribute("tabindex", "-1"));

  mainContent.removeEventListener("click", closeNav);
};

// Maybe play with some ideas to close the nav if the current page is active page
// navLinks.forEach((link) => {
//   if (!link.classList.contains("prevent-nav-close")) {
//     link.addEventListener("click", closeNav);
//   }
// });

navBtn.addEventListener("click", toggleNav);

// Nav Slider
if (isMouseDevice) {
  const navSlider = document.querySelector(".nav-slider");

  // Biggest
  // sensitivity = 2.75;
  // offset = 7.25;

  // Laptop
  // sensitivity = 2.75;
  // offset = 6.25;

  // 1024px
  // sensitivity = 2.75;
  // offset = 10;

  let sensitivity = 2.75; // The higher the number, the less sensitive.
  let offset = 6.25; // The higher the number, the more intense the slider moves to the left

  // Will need to use vw on nav linkes and nav height.
  // The sensitivity isn't matching up for the mouse for different viewports

  navSlider.addEventListener("mousemove", (e) => {
    navSlider.style.translate = `calc(${offset}vw - calc(${
      e.pageX / sensitivity
    }px) * 1.4)`;
    //
  });
}

//
// Responsive navSlider
//

if (isMouseDevice) {
  const navSlider = document.querySelector(".nav-slider");
  let viewportWidth = window.innerWidth;
  let sliderWidth = navSlider.offsetWidth;

  navSlider.addEventListener("mousemove", (e) => {
    const mouseXPercentage = e.pageX / viewportWidth;

    // Adjust translateX to account for the slider's larger width
    const translateX =
      (0.5 - mouseXPercentage) * (viewportWidth / sliderWidth) * 100;

    navSlider.style.transform = `translateX(${translateX}px)`;
  });

  window.addEventListener("resize", () => {
    viewportWidth = window.innerWidth;
  });
}
