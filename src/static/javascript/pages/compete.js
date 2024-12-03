if (document.querySelector(".main-compete")) {
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: 2, // adjust below
    spaceBetween: 220,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 126,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 220,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 220,
      },
    },
  });
}
