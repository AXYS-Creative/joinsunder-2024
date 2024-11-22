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
};

const closeNav = () => {
  siteNav.setAttribute("aria-hidden", "true");
  navBtn.setAttribute("aria-expanded", "false");

  siteNav.classList.remove("site-nav--active");
  mainContent.classList.remove("main-content--nav-active");

  // Reset tabindex for tabElementsPage and tabElementsNav
  tabElementsPage.forEach((el) => el.setAttribute("tabindex", "0"));
  tabElementsNav.forEach((el) => el.setAttribute("tabindex", "-1"));
};

// Add or remove the event listener for closing nav by clicking on main content
if (!isNavOpen) {
  mainContent.addEventListener("click", closeNav);
} else {
  mainContent.removeEventListener("click", closeNav);
}

// navLinks.forEach((link) => {
//   if (!link.classList.contains("prevent-nav-close")) {
//     link.addEventListener("click", closeNav);
//   }
// });

navBtn.addEventListener("click", toggleNav);
