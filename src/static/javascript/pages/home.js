import { mqMouse, mqMaxLg } from "../utility.js";

// Dynamically determine Reel height. This needs special care to run at build time.
const adjustImageReelHeight = () => {
  const imageReel = document.querySelector(".image-reel"),
    reelColumn2 = document.querySelector(".image-reel__column-2");

  if (imageReel && reelColumn2) {
    // imageReel.style.height = `${reelColumn2.offsetHeight}px`;
    imageReel.style.height = window.getComputedStyle(reelColumn2).height;
  }
};

window.addEventListener("load", () => {
  adjustImageReelHeight();

  window.addEventListener("resize", adjustImageReelHeight);
});

// Image Reel

// if (mqMaxLg) {
//   const slowScrollDown = () => {
//     const scrollStep = 1; // Pixels to scroll each step
//     const delay = 14; // Delay in milliseconds between scroll steps

//     const intervalId = setInterval(() => {
//       const maxScrollTop =
//         document.documentElement.scrollHeight - window.innerHeight;
//       const currentScrollTop =
//         window.scrollY || document.documentElement.scrollTop;

//       if (currentScrollTop < maxScrollTop) {
//         window.scrollBy(0, scrollStep);
//       } else {
//         clearInterval(intervalId);
//       }
//     }, delay);
//   };

//   // Start scrolling down when the page loads
//   window.addEventListener("load", slowScrollDown);
// }
