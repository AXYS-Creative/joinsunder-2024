import { mqMouse } from "../utility.js";

// Dynamically determine Reel height. This needs special care to run at build time.
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

// console.log(mqMouse ? "mouse device" : "touch device");
