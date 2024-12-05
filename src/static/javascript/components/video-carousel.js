import { isVideoPlayerOpen, openVideoPlayer } from "./video-player.js";
import { isNavOpen } from "../global/nav.js";

const videoBtns = document.querySelectorAll(".compete__video-btn");
const paginationWrapper = document.querySelector(".swiper-pagination");

videoBtns?.forEach((btn) => {
  let embedCode = btn.getAttribute("data-embed");

  btn.addEventListener("click", () => {
    openVideoPlayer(embedCode);
  });

  setTimeout(() => {
    btn.removeAttribute("role"); // Axe a11y didn't like this
  }, 500);
});

if (document.querySelector(".swiper")) {
  let swiper = new Swiper(".mySwiper", {
    loop: window.innerWidth < 768,
    slidesPerView: 2,
    spaceBetween: 8,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1201: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1513: {
        slidesPerView: 4,
        spaceBetween: 48,
      },
    },
  });

  // Removing pagination tabbing when the nav or video player are open
  document.addEventListener("navStateChange", () => {
    paginationWrapper.style.visibility = isNavOpen ? "hidden" : "visible";
  });

  document.addEventListener("videoPlayerStateChange", () => {
    paginationWrapper.style.visibility = isVideoPlayerOpen
      ? "hidden"
      : "visible";
  });
}
