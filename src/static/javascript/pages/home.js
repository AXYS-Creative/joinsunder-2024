import { mqMinLg } from "../utility.js";

// Dynamically determine Reel height.
const adjustImageReelHeight = () => {
  const imageReel = document.querySelector(".image-reel"),
    reelColumn2 = document.querySelector(".image-reel__column-2");

  if (imageReel && reelColumn2) {
    imageReel.style.height = window.getComputedStyle(reelColumn2).height;
  }
};

window.addEventListener("load", () => {
  adjustImageReelHeight();

  window.addEventListener("resize", adjustImageReelHeight);
});

// Auto scroll for LG+ screens
if (document.querySelector(".main-home")) {
  let scrollActive = false;

  const pageScroll = () => {
    if (!scrollActive) return;
    window.scrollBy(0, 1);
    setTimeout(pageScroll, 35);
  };

  const startScroll = () => {
    if (!scrollActive) {
      scrollActive = true;
      setTimeout(() => {
        pageScroll();
      }, 2600);
    }
  };

  const stopScroll = () => {
    scrollActive = false;
  };

  if (mqMinLg.matches) {
    startScroll();
  }

  mqMinLg.addEventListener("change", (e) => {
    if (e.matches) {
      startScroll();
    } else {
      stopScroll();
    }
  });
}
