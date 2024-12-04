import { openVideoPlayer } from "../components/video-player.js";

if (document.querySelector(".main-compete")) {
  const videoBtns = document.querySelectorAll(".compete__video-btn");

  videoBtns.forEach((btn) => {
    let embedCode = btn.getAttribute("data-embed");

    btn.addEventListener("click", (e) => {
      openVideoPlayer(embedCode);
    });

    setTimeout(() => {
      btn.removeAttribute("role"); // Axe a11y didn't like this
    }, 500);
  });

  let swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 12,
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
}
