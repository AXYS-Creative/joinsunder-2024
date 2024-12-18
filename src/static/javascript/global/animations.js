gsap.registerPlugin(ScrollTrigger);

let responsiveGsap = gsap.matchMedia();

responsiveGsap.add(
  {
    maxSm: "(max-width: 480px)",
    maxMd: "(max-width: 768px)",
    maxXl: "(max-width: 1200px)",
    maxXxl: "(max-width: 1512px)",
    minMd: "(min-width: 769px)",
    minLg: "(min-width: 1025px)",
  },
  (context) => {
    let { maxSm, maxMd, maxXl, maxXxl, minMd, minLg } = context.conditions;
    let navyMarkers = {
      startColor: "navy",
      endColor: "navy",
      indent: 148,
    };
    let whiteMarkers = {
      startColor: "white",
      endColor: "white",
      indent: 320,
    };

    const sunderMidnight = "#000014";

    // Image Reel, home and experience
    if (document.querySelector(".image-reel")) {
      const yValHome = maxSm ? "-20.5%" : "-21.05%";
      const yValExperience = maxMd ? "-8.5%" : maxXxl ? "-8.7%" : "-8.8%";

      const reelSlide = (el, distance) => {
        const element = document.querySelector(el);
        if (element) {
          gsap.to(el, {
            y: distance,
            ease: "none",
            scrollTrigger: {
              trigger: ".image-reel",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.2,
            },
          });
        }
      };

      reelSlide(".image-reel__column-1--home", yValHome);
      reelSlide(".image-reel__column-1--experience", yValExperience);
      reelSlide(".image-reel__column-3--experience", yValExperience);
    }

    // Opportunity Page
    if (document.querySelector(".main-opportunity")) {
      // Background color change
      {
        gsap.to(".main-opportunity", {
          backgroundColor: sunderMidnight,
          scrollTrigger: {
            trigger: ".sunder-definition",
            start: "25% bottom",
            end: "75% top",
            scrub: true,
          },
        });
      }

      // Sunder Definition Video
      {
        let pinDuration = "+=180%";
        let delayChildren = "0%"; // Smaller = greater delay (don't drop below 0)

        gsap.from(".sunder-definition__pin", {
          scrollTrigger: {
            trigger: ".sunder-definition__pin",
            start: maxMd ? "top 25%" : "top top",
            end: pinDuration,
            pin: true,
          },
        });
        gsap.to(".sunder-definition__title-scrub-1", {
          top: "10%",
          left: "10%",
          opacity: 0,
          scrollTrigger: {
            trigger: ".sunder-definition__title-scrub-1",
            start: maxMd ? "top 25%" : `top ${delayChildren}`,
            end: "+=100%",
            scrub: 1,
          },
        });
        gsap.to(".sunder-definition__title-scrub-2", {
          bottom: "10%",
          right: "10%",
          opacity: 0,
          scrollTrigger: {
            trigger: ".sunder-definition__title-scrub-1",
            start: maxMd ? "top 25%" : `top ${delayChildren}`,
            end: "+=100%",
            scrub: 1,
          },
        });
        gsap.from(".sunder-definition__video", {
          scale: 0.25,
          opacity: 0,
          scrollTrigger: {
            trigger: ".sunder-definition__title-scrub-1",
            start: maxMd ? "top 25%" : `top ${delayChildren}`,
            end: "+=100%",
            scrub: 1,
          },
        });
      }

      // Growth History (USA map)
      {
        const pinDuration = "+=400%";
        const growthMarkers = document.querySelectorAll(
          ".sunder-growth__static-markers .growth-marker"
        );

        // Pinning the Growth Section
        {
          gsap.to(".sunder-growth__pin", {
            scrollTrigger: {
              trigger: ".sunder-growth__pin",
              start: "top top",
              end: pinDuration,
              pin: true,
            },
          });
        }

        // Growth Link Highlight
        {
          const growthLinks = document.querySelectorAll(
            ".sunder-growth__links-link"
          );

          growthMarkers.forEach((marker, index) => {
            const nextMarker = growthMarkers[index + 1]; // Get the next marker
            const link = growthLinks[index]; // Corresponding link for this marker

            ScrollTrigger.create({
              trigger: marker,
              start: "-12px center", // Trigger when this marker crosses the center
              end: nextMarker
                ? `400px center` // End when the next marker crosses the center
                : "400px center", // Last marker ends when it leaves the viewport
              onEnter: () => link.classList.add("active"),
              onEnterBack: () => link.classList.add("active"),
              onLeave: () => link.classList.remove("active"),
              onLeaveBack: () => link.classList.remove("active"),
            });
          });
        }

        // Number Ticker Animation
        {
          const numberCounter = document.querySelector(".number-counter");

          growthMarkers.forEach((marker, index) => {
            const targetValue = marker.getAttribute("data-counter-value");

            // If it's the first marker, reset counter to 00 on leaveBack
            const isFirstMarker = index === 0;

            ScrollTrigger.create({
              trigger: marker,
              start: "-12px center", // Trigger when this marker crosses the center
              end: "400px center", // End when leaving the center
              scrub: true,
              onEnter: () => updateCounter(numberCounter, targetValue),
              onEnterBack: () => updateCounter(numberCounter, targetValue),
              onLeaveBack: () => {
                if (isFirstMarker) updateCounter(numberCounter, "00");
              },
            });
          });

          const updateCounter = (counter, value) => {
            const digits = [...value.padStart(2, "0")].map(Number); // Ensure "07" is always [0, 7]
            const digitElements = counter.querySelectorAll(".digit");

            digits.forEach((digitValue, index) => {
              const sequence = digitElements[index]?.querySelector(".sequence");

              if (!sequence) return;

              // Animate to the desired number
              gsap.to(sequence, {
                y: `-${digitValue * 10}%`, // Move vertically to the correct position
                duration: 0.5,
                ease: "ease",
              });
            });
          };
        }
      }
    }

    // Resources Page
    if (document.querySelector(".main-resources")) {
      // Hero - Floating Text
      if (minLg) {
        let floatingText = [
          {
            el: ".floating-text-1",
            trigger: ".image-group__image-2",
          },
          {
            el: ".floating-text-2",
            trigger: ".image-group__image-3",
          },
        ];

        floatingText.forEach(({ el, trigger }) => {
          const element = document.querySelector(el);

          if (element) {
            gsap.from(el, {
              y: "100vh",
              ease: "none",
              scrollTrigger: {
                trigger: trigger,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 0.25,
              },
            });
          }
        });
      }

      // Meet the Team - Pinned
      {
        gsap.from(".pinned", {
          scrollTrigger: {
            trigger: ".pinned",
            start: maxMd ? "top 25%" : "top top",
            end: "+=100%",
            pin: true,
          },
        });

        let animStart = "80% 20%";
        let animEnd = "+=50%";

        gsap.fromTo(
          ".slot-text__slider",
          {
            width: "6.5ch",
          },
          {
            width: "8.5ch",
            scrollTrigger: {
              trigger: ".slot-text",
              start: animStart,
              end: animEnd,
              scrub: true,
            },
          }
        );

        let sliderDistance = maxSm ? "3px" : "23px"; // tie with scss (minus 1px)

        gsap.to(".slot-text__slider-inner", {
          translate: `0 calc(-100% - ${sliderDistance})`,
          scrollTrigger: {
            trigger: ".slot-text",
            start: animStart,
            end: animEnd,
            scrub: true,
          },
        });
      }
    }

    // GLOBAL - Easily toggle an 'animate' class on any element with '.gsap-animate' class
    const globalGenerateAnimate = (() => {
      const targetElements = document.querySelectorAll(".gsap-animate");

      targetElements.forEach((targetElem) => {
        gsap.to(targetElem, {
          scrollTrigger: {
            trigger: targetElem,
            start: "top 98%",
            end: "bottom top",
            onEnter: () => targetElem.classList.add("animate"),
            onLeave: () => targetElem.classList.remove("animate"),
            onEnterBack: () => targetElem.classList.add("animate"),
            onLeaveBack: () => targetElem.classList.remove("animate"),
          },
        });
      });
    })();

    // Refresh ScrollTrigger instances on page load and resize
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });

    // Greater than 520 so it doesn't refresh on  mobile(dvh)
    if (window.innerWidth > 520) {
      window.addEventListener("resize", () => {
        ScrollTrigger.refresh();
      });
    }
  }
);
