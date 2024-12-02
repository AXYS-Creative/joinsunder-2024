export const videoPlayer = document.querySelector(".video-player"),
  videoCta = document.querySelector(".cta--video");

export let isVideoPlayerOpen = false;

videoCta.addEventListener("click", () => {
  isVideoPlayerOpen = true;

  videoPlayer.setAttribute("aria-hidden", !isVideoPlayerOpen);
  videoPlayer.classList.remove("video-player--inactive");

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

  // Notify other modules about the state change
  document.dispatchEvent(
    new CustomEvent("videoPlayerStateChange", {
      detail: isVideoPlayerOpen,
    })
  );
};
