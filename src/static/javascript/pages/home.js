import { root } from "../utility.js";

// Dynamically determine Reel height. This needs special care to run at build time.

let reelColumn2 = document.querySelector(".image-reel__column-2"),
  reelHeight = window.getComputedStyle(reelColumn2).height;

root.style.setProperty("--reel-height", reelHeight);
