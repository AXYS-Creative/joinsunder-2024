if (document.querySelector(".main-opportunity")) {
  const sunderDefinitionVideoBtn = document.querySelector(
      ".sunder-definition__video"
    ),
    sunderDefinitionVideo = document.querySelector(
      ".sunder-definition__video-actual"
    );

  let videoPlayState = false;

  const toggleVideo = () => {
    if (videoPlayState) {
      sunderDefinitionVideo.pause();
    } else {
      sunderDefinitionVideo.play();
    }

    videoPlayState = !videoPlayState;
    sunderDefinitionVideoBtn.classList.toggle(
      "sunder-definition__video--active",
      videoPlayState
    );
    sunderDefinitionVideoBtn.setAttribute("aria-pressed", videoPlayState);
  };

  sunderDefinitionVideoBtn?.addEventListener("click", toggleVideo);

  //
  // Pause video when it leaves the viewport
  //

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && videoPlayState) {
          sunderDefinitionVideo.pause();
          videoPlayState = false;
          sunderDefinitionVideoBtn.classList.remove(
            "sunder-definition__video--active"
          );
          sunderDefinitionVideoBtn.setAttribute("aria-pressed", "false");
        }
      });
    },
    { threshold: 0.25 } // Trigger when 25% of the video is visible
  );

  observer.observe(sunderDefinitionVideo);

  //
  // Keyboard tabbing
  //
  const sunderGrowthSection = document.querySelector(".sunder-growth");

  sunderDefinitionVideoBtn?.addEventListener("focus", () => {
    // This might be here for production mouse click, which might be read as 'focus'
    if (sunderDefinitionVideoBtn.matches(":focus-visible")) {
      const topPoint = sunderGrowthSection.getBoundingClientRect().top;

      window.scrollTo({
        top: window.scrollY + topPoint - window.innerHeight,
      });
    }
  });
}

const growthLinks = document.querySelectorAll(".sunder-growth__links-link");
const growthMarkers = document.querySelectorAll(".growth-marker");

growthLinks.forEach((link, index) => {
  link.addEventListener("focus", () => {
    growthMarkers[index].scrollIntoView();
  });

  link.addEventListener("click", (event) => {
    event.preventDefault();
    growthMarkers[index].scrollIntoView();
  });
});
