import { mqMouse, mqMaxXxl, mqMaxMd } from "../utility.js";
import {
  isvideoOverlayOpen,
  closevideoOverlay,
} from "../components/video-overlay.js";

export const siteNav = document.querySelector(".site-nav"),
  navBtn = document.querySelector(".nav-btn"),
  siteNavExtra = document.querySelector(".site-nav__extra"),
  mainContent = document.querySelector(".main-content"),
  siteHeader = document.querySelector(".site-header"),
  siteFooter = document.querySelector(".site-footer"),
  activeNavLink = document.querySelector(".nav-link--active-page");

export const tabElementsPage = document.querySelectorAll(".tab-element-page"),
  tabElementsNav = document.querySelectorAll(".tab-element-nav");

tabElementsNav.forEach((elem) => elem.setAttribute("tabIndex", "-1"));

export let isNavOpen = false;

const updateTabIndex = () => {
  const pageTabIndex = isNavOpen ? "-1" : "0";
  const navTabIndex = isNavOpen ? "0" : "-1";

  tabElementsPage.forEach((el) => el.setAttribute("tabindex", pageTabIndex));
  tabElementsNav.forEach((el) => el.setAttribute("tabindex", navTabIndex));
};

const updateNavBtnState = () => {
  if (isvideoOverlayOpen) {
    navBtn.setAttribute("aria-expanded", true);
    navBtn.setAttribute("aria-controls", "video-overlay");
    navBtn.setAttribute("aria-label", "Close video player");
  } else if (isNavOpen) {
    navBtn.setAttribute("aria-expanded", true);
    navBtn.setAttribute("aria-controls", "site-nav");
    navBtn.setAttribute("aria-label", "Close navigation menu");
  } else {
    navBtn.setAttribute("aria-expanded", false);
    navBtn.setAttribute("aria-controls", "site-nav");
    navBtn.setAttribute("aria-label", "Open navigation menu");
  }
};

const updateNavState = (state) => {
  isNavOpen = state;

  siteNav.classList.toggle("site-nav--active", isNavOpen);
  siteNavExtra.classList.toggle("site-nav__extra--nav-active", isNavOpen);
  siteHeader?.classList.toggle("site-header--nav-active", isNavOpen);
  siteFooter?.classList.toggle("site-footer--nav-active", isNavOpen);
  mainContent.classList.toggle("main-content--nav-active", isNavOpen);

  siteNav.setAttribute("aria-hidden", !isNavOpen);

  updateTabIndex();
  updateNavBtnState();

  if (isNavOpen) {
    mainContent.addEventListener("click", closeNav);
    siteFooter?.addEventListener("click", closeNav);
  } else {
    mainContent.removeEventListener("click", closeNav);
    siteFooter?.removeEventListener("click", closeNav);
  }

  // Notify other modules about the state change
  document.dispatchEvent(
    new CustomEvent("navStateChange", {
      detail: isNavOpen,
    })
  );
};

const toggleNav = () => {
  updateNavState(!isNavOpen);
};

// Screen reader use
const openNav = () => {
  if (!isNavOpen) {
    updateNavState(true);
  }
};

const handleNavBtnClick = () => {
  // Close video player
  if (isvideoOverlayOpen) {
    closevideoOverlay();
    updateNavBtnState();
    return;
  }
  toggleNav();
};

const closeNav = () => {
  isNavOpen = false;

  siteNav.setAttribute("aria-hidden", "true");
  siteNav.classList.remove("site-nav--active");
  siteNavExtra.classList.remove("site-nav__extra--nav-active");
  siteHeader?.classList.remove("site-header--nav-active");
  siteFooter?.classList.remove("site-footer--nav-active");
  mainContent.classList.remove("main-content--nav-active");

  updateTabIndex();
  updateNavBtnState();

  mainContent.removeEventListener("click", closeNav);
};

navBtn.addEventListener("click", handleNavBtnClick);

// Close nav vs refresh for active page
activeNavLink.addEventListener("click", (event) => {
  event.preventDefault();
  closeNav();
});

document.addEventListener("videoOverlayStateChange", updateNavBtnState);

// Nav Slider & Keyboard focus
if (mqMouse && window.innerWidth < 2712) {
  const navSlider = document.querySelector(".nav-slider");
  let viewportWidth = window.innerWidth;
  let sliderWidth = navSlider.offsetWidth;

  const updateTranslateX = (mouseX) => {
    const viewportCenter = viewportWidth / 2;
    const mouseOffsetFromCenter = mouseX - viewportCenter;

    const translateX = -(
      (mouseOffsetFromCenter / viewportWidth) *
      (sliderWidth - viewportWidth)
    );

    navSlider.style.translate = `${translateX}px 0`;
  };

  navSlider.addEventListener("mousemove", (e) => {
    updateTranslateX(e.pageX);
  });

  window.addEventListener("resize", () => {
    viewportWidth = window.innerWidth;
    sliderWidth = navSlider.offsetWidth;
  });

  // Keyboard focus
  const navLinks = document.querySelectorAll(".nav-link");

  let currentTranslateX = 0;
  let offsetTweak = mqMaxMd ? "60vw" : mqMaxXxl ? "25vw" : "20vw"; // for six links

  navLinks.forEach((link) => {
    link.addEventListener("focus", () => {
      if (link.matches(":focus-visible")) {
        const linkRect = link.getBoundingClientRect();
        const sliderRect = navSlider.getBoundingClientRect();

        const linkOffsetInSlider = linkRect.left - sliderRect.left;

        const centerOffset = viewportWidth / 2 - link.offsetWidth / 2;
        const newTranslateX = -linkOffsetInSlider + centerOffset;

        const maxTranslateX = 0;
        const minTranslateX = -(sliderWidth - viewportWidth);
        const clampedTranslateX = Math.max(
          minTranslateX,
          Math.min(maxTranslateX, newTranslateX)
        );

        currentTranslateX = clampedTranslateX;
        navSlider.style.translate = `calc(${clampedTranslateX}px + ${offsetTweak}) 0`;
      }
    });
  });

  // Screen Reader
  navLinks[0].addEventListener("focus", openNav);
}
