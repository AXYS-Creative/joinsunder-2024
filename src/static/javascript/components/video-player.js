import { tabElementsPage } from "../global/nav.js";

const videoPlayer = document.querySelector(".video-player"),
  videoPlayerEmbed = document.querySelector(".video-player iframe"),
  videoCta = document.querySelector(".cta--video");

export let isVideoPlayerOpen = false;

videoPlayerEmbed?.classList.add("video-player__embed");
const originalEmbedSrc = videoPlayerEmbed?.getAttribute("src");

videoCta?.addEventListener("click", () => {
  isVideoPlayerOpen = true;
  videoPlayer.classList.remove("visibility-hidden");

  videoPlayer.setAttribute("aria-hidden", !isVideoPlayerOpen);
  videoPlayer.classList.remove("video-player--inactive");

  // Restore the src if it was removed
  if (!videoPlayerEmbed.getAttribute("src")) {
    videoPlayerEmbed.setAttribute("src", originalEmbedSrc);
  }

  tabElementsPage.forEach((el) => el.setAttribute("tabindex", "-1"));

  // Notify other modules about the state change
  document.dispatchEvent(
    new CustomEvent("videoPlayerStateChange", {
      detail: isVideoPlayerOpen,
    })
  );
});

export const closeVideoPlayer = () => {
  isVideoPlayerOpen = false;

  videoPlayer.setAttribute("aria-hidden", "true");
  videoPlayer.classList.add("video-player--inactive");

  // Remove the src to stop the video
  videoPlayerEmbed.removeAttribute("src");

  tabElementsPage.forEach((el) => el.setAttribute("tabindex", "0"));

  // Notify other modules about the state change
  document.dispatchEvent(
    new CustomEvent("videoPlayerStateChange", {
      detail: isVideoPlayerOpen,
    })
  );

  setTimeout(() => {
    videoPlayer.classList.add("visibility-hidden");
  }, 1200);
};

// Close the video player when clicking outside the embed
videoPlayer.addEventListener("click", (e) => {
  if (e.target.classList.contains("video-player__embed")) return;

  closeVideoPlayer();
});
