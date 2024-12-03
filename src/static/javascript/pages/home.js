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

//
// Image Reel Logic
//

if (document.querySelector(".main-home")) {
  let isPlaying = false;
  let shouldScroll = false;
  let wasSmallerScreen = false;
  const mediaQuery = window.matchMedia("(min-width: 1025px)");

  const handleSmallerScreens = (e) => {
    if (e.matches) {
      if (!isPlaying) {
        isPlaying = true;
        shouldScroll = true;
        const pageScroll = () => {
          if (shouldScroll) {
            window.scrollBy(0, 1);
            // setTimeout(pageScroll, 32);
            setTimeout(pageScroll, 35);
          }
        };
        setTimeout(() => {
          pageScroll();
        }, 1200);
      }
      wasSmallerScreen = false;
    } else {
      if (isPlaying) {
        isPlaying = false;
        shouldScroll = false;
        wasSmallerScreen = true;
        mediaQuery.removeEventListener("change", handleSmallerScreens);
      }
    }
  };

  mediaQuery.addEventListener("change", () => {
    if (wasSmallerScreen && mediaQuery.matches) {
      location.reload();
    }
    handleSmallerScreens(mediaQuery);
  });

  handleSmallerScreens(mediaQuery);
}
