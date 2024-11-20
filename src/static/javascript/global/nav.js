const siteNav = document.querySelector(".site-nav"),
  navBtn = document.querySelector(".nav-btn"),
  mainContent = document.querySelector(".main-content");

const navLinks = document.querySelectorAll(".nav-link"),
  navFooterLinks = document.querySelectorAll(".nav-footer-link"),
  tabElementsPage = document.querySelectorAll(".tab-element-page"),
  tabElementsNav = document.querySelectorAll(".tab-element-nav");

tabElementsNav.forEach((elem) => elem.setAttribute("tabIndex", "-1"));

const toggleNav = () => {
  const isNavOpen = siteNav.getAttribute("aria-hidden") === "true";

  siteNav.classList.toggle("site-nav--active");
  mainContent.classList.toggle("main-content--nav-active");

  siteNav.setAttribute("aria-hidden", !isNavOpen);
  navBtn.setAttribute("aria-expanded", isNavOpen);
  navBtn.setAttribute(
    "aria-label",
    isNavOpen ? "Close navigation menu" : "Open navigation menu"
  );

  // Update tabindex for tabElementsPage and tabElementsNav
  tabElementsPage.forEach((el) =>
    el.setAttribute("tabindex", isNavOpen ? "-1" : "0")
  );
  tabElementsNav.forEach((el) =>
    el.setAttribute("tabindex", isNavOpen ? "0" : "-1")
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

[...navLinks, ...navFooterLinks].forEach((link) => {
  if (!link.classList.contains("prevent-nav-close")) {
    link.addEventListener("click", closeNav);
  }
});

navBtn.addEventListener("click", toggleNav);
