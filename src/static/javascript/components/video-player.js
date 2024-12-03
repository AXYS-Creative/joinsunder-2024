const videoPlayer = document.querySelector(".video-player"),
  videoPlayerEmbed = document.querySelector(".video-player iframe"),
  videoCta = document.querySelector(".cta--video");

export let isVideoPlayerOpen = false;

// Store the original src for restoring later
const originalEmbedSrc = videoPlayerEmbed.getAttribute("src");

videoCta?.addEventListener("click", () => {
  isVideoPlayerOpen = true;

  videoPlayer.setAttribute("aria-hidden", !isVideoPlayerOpen);
  videoPlayer.classList.remove("video-player--inactive");

  // Restore the src if it was removed
  if (!videoPlayerEmbed.getAttribute("src")) {
    videoPlayerEmbed.setAttribute("src", originalEmbedSrc);
  }

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

  // Notify other modules about the state change
  document.dispatchEvent(
    new CustomEvent("videoPlayerStateChange", {
      detail: isVideoPlayerOpen,
    })
  );
};

// Close the video player when clicking outside the embed
videoPlayer.addEventListener("click", (e) => {
  if (e.target.classList.contains("video-player__embed")) return;

  closeVideoPlayer();
});
