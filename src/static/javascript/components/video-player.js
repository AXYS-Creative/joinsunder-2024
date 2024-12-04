import { tabElementsPage } from "../global/nav.js";

const videoPlayer = document.querySelector(".video-player"),
  videoCta = document.querySelector(".cta--video");

export let isVideoPlayerOpen = false;

export const openVideoPlayer = (embedCode) => {
  isVideoPlayerOpen = true;

  videoPlayer.setAttribute("aria-hidden", !isVideoPlayerOpen);
  videoPlayer.classList.remove("video-player--inactive");

  if (embedCode) {
    videoPlayer.innerHTML = embedCode; // Inject the embed code
  }

  // tabElementsPage.forEach((el) => el.setAttribute("tabindex", "-1"));

  // Notify other modules about the state change
  document.dispatchEvent(
    new CustomEvent("videoPlayerStateChange", {
      detail: isVideoPlayerOpen,
    })
  );
};

videoCta?.addEventListener("click", () => {
  openVideoPlayer(videoCta.getAttribute("data-embed"));
});

export const closeVideoPlayer = () => {
  isVideoPlayerOpen = false;

  videoPlayer.setAttribute("aria-hidden", "true");
  videoPlayer.classList.add("video-player--inactive");

  setTimeout(() => {
    videoPlayer.innerHTML = ""; // Remove embed to stop the video
  }, 300);

  tabElementsPage.forEach((el) => el.setAttribute("tabindex", "0"));

  // Notify other modules about the state change
  document.dispatchEvent(
    new CustomEvent("videoPlayerStateChange", {
      detail: isVideoPlayerOpen,
    })
  );
};

// Close the video player when clicking outside the embed
videoPlayer?.addEventListener("click", (e) => {
  if (e.target.classList.contains("video-player__embed")) return;

  closeVideoPlayer();
});
