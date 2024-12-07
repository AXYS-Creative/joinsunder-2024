import { tabElementsPage, navBtn } from "../global/nav.js";

const videoOverlay = document.querySelector(".video-overlay");
const videoCta = document.querySelectorAll(".cta--video");

export let isvideoOverlayOpen = false;

export const openvideoOverlay = (embedCode) => {
  isvideoOverlayOpen = true;

  videoOverlay.setAttribute("aria-hidden", !isvideoOverlayOpen);
  videoOverlay.classList.remove("video-overlay--inactive");

  if (embedCode) {
    videoOverlay.innerHTML = embedCode; // Inject the embed code
  }

  tabElementsPage.forEach((el) => el.setAttribute("tabindex", "-1"));

  navBtn.focus();

  // Notify other modules about the state change
  document.dispatchEvent(
    new CustomEvent("videoOverlayStateChange", {
      detail: isvideoOverlayOpen,
    })
  );
};

videoCta?.forEach((btn) => {
  btn.addEventListener("click", () => {
    openvideoOverlay(btn.getAttribute("data-embed"));
  });
});

export const closevideoOverlay = () => {
  isvideoOverlayOpen = false;

  videoOverlay.setAttribute("aria-hidden", "true");
  videoOverlay.classList.add("video-overlay--inactive");

  setTimeout(() => {
    videoOverlay.innerHTML = ""; // Remove embed to stop the video
  }, 300);

  tabElementsPage.forEach((el) => el.setAttribute("tabindex", "0"));

  // Notify other modules about the state change
  document.dispatchEvent(
    new CustomEvent("videoOverlayStateChange", {
      detail: isvideoOverlayOpen,
    })
  );
};

// Close the video player when clicking outside the embed
videoOverlay?.addEventListener("click", (e) => {
  if (e.target.classList.contains("video-overlay__embed")) return;

  closevideoOverlay();
});
