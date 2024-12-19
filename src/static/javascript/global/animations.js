gsap.registerPlugin(ScrollTrigger);

let responsiveGsap = gsap.matchMedia();

responsiveGsap.add(
  {
    maxSm: "(max-width: 480px)",
    maxMd: "(max-width: 768px)",
    maxLg: "(max-width: 1024px)",
    maxXl: "(max-width: 1200px)",
    maxXxl: "(max-width: 1512px)",
    minMd: "(min-width: 769px)",
    minLg: "(min-width: 1025px)",
  },
  (context) => {
    let { maxSm, maxMd, maxLg, maxXl, maxXxl, minMd, minLg } =
      context.conditions;
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
        // Gague distance between two pins
        let multiplier = maxSm
          ? 4.9
          : maxMd
          ? 4.7
          : maxLg
          ? 4.75
          : maxXl
          ? 4.825
          : maxXxl
          ? 4.85
          : 4.9;
        const marker1 = document.querySelector(".marker-1");
        const marker2 = document.querySelector(".marker-2");
        const verticalDistance =
          Math.abs(
            marker1.getBoundingClientRect().top -
              marker2.getBoundingClientRect().top
          ) * multiplier;

        const pinDuration = "+=400%";
        const pinDurationExtended = "+=480%";
        const growthMarkers = document.querySelectorAll(
          ".sunder-growth__static-markers .growth-marker"
        );
        const startPoint = "-12px center";
        const endPoint = `${verticalDistance}px center`;

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

        // Fading in USA Map
        {
          gsap.fromTo(
            ".sunder-growth__map-map",
            {
              opacity: 0,
              y: "-50%",
            },
            {
              opacity: 1,
              y: "0%",
              scrollTrigger: {
                trigger: ".sunder-growth__pin",
                start: "-70% top",
                end: "top top",
                scrub: 0,
              },
            }
          );
        }

        // Display Growth Elements
        {
          const fadeElements = [
            ".sunder-growth__title",
            ".sunder-growth__links",
            ".sunder-growth__counter",
          ];

          fadeElements.forEach((selector) => {
            const element = document.querySelector(selector);

            ScrollTrigger.create({
              trigger: ".sunder-growth__pin",
              start: "top top",
              end: pinDurationExtended,
              toggleClass: { targets: element, className: "show-item" },
            });
          });
        }

        // Growth Link Highlight
        {
          const growthLinks = document.querySelectorAll(
            ".sunder-growth__links-link"
          );

          growthMarkers.forEach((marker, index) => {
            const link = growthLinks[index];

            ScrollTrigger.create({
              trigger: marker,
              start: startPoint,
              end: endPoint,
              onEnter: () => link.classList.add("active"),
              onEnterBack: () => link.classList.add("active"),
              onLeave: () => link.classList.remove("active"),
              onLeaveBack: () => link.classList.remove("active"),
              // markers: true,
            });
          });
        }

        // Number Ticker Animation
        {
          const numberCounter = document.querySelector(".number-counter");

          growthMarkers.forEach((marker, index) => {
            const targetValue = marker.getAttribute("data-counter-value");

            const isFirstMarker = index === 0;

            ScrollTrigger.create({
              trigger: marker,
              start: startPoint,
              end: endPoint,
              scrub: true,
              onEnter: () => updateCounter(numberCounter, targetValue),
              onEnterBack: () => updateCounter(numberCounter, targetValue),
              onLeaveBack: () => {
                if (isFirstMarker) updateCounter(numberCounter, "00");
              },
              // markers: true,
            });
          });

          const updateCounter = (counter, value) => {
            const digits = [...value.padStart(2, "0")].map(Number); // Ensure "07" is always [0, 7]
            const digitElements = counter.querySelectorAll(".digit");

            digits.forEach((digitValue, index) => {
              const sequence = digitElements[index]?.querySelector(".sequence");

              gsap.to(sequence, {
                y: `-${digitValue * 10}%`,
                duration: 0.5,
                ease: "ease",
              });
            });
          };
        }

        // State highlight
        {
          const highlightGroups = [
            {
              elements: document.querySelectorAll(".state-2019"),
              trigger: ".marker-1",
              start: startPoint,
              end: pinDurationExtended,
              toggleClass: "active",
            },
            {
              elements: document.querySelectorAll(".pending-2019"),
              trigger: ".marker-1",
              start: startPoint,
              end: endPoint,
              toggleClass: "active-pending",
            },
            {
              elements: document.querySelectorAll(".pending-2019"),
              trigger: ".marker-2",
              start: startPoint,
              end: pinDurationExtended,
              toggleClass: "active",
            },
            {
              elements: document.querySelectorAll(".pending-2020"),
              trigger: ".marker-2",
              start: startPoint,
              end: endPoint,
              toggleClass: "active-pending",
            },
            {
              elements: document.querySelectorAll(".pending-2020"),
              trigger: ".marker-3",
              start: startPoint,
              end: pinDurationExtended,
              toggleClass: "active",
            },
            {
              elements: document.querySelectorAll(".pending-2021"),
              trigger: ".marker-3",
              start: startPoint,
              end: endPoint,
              toggleClass: "active-pending",
            },
            {
              elements: document.querySelectorAll(".pending-2021"),
              trigger: ".marker-4",
              start: startPoint,
              end: pinDurationExtended,
              toggleClass: "active",
            },
            {
              elements: document.querySelectorAll(".pending-2022"),
              trigger: ".marker-4",
              start: startPoint,
              end: endPoint,
              toggleClass: "active-pending",
            },
            {
              elements: document.querySelectorAll(".pending-2022"),
              trigger: ".marker-5",
              start: startPoint,
              end: pinDurationExtended,
              toggleClass: "active",
            },
            {
              elements: document.querySelectorAll(".pending-2023"),
              trigger: ".marker-5",
              start: startPoint,
              end: endPoint,
              toggleClass: "active-pending",
            },
            {
              elements: document.querySelectorAll(".pending-2023"),
              trigger: ".marker-6",
              start: startPoint,
              end: pinDurationExtended,
              toggleClass: "active",
            },
          ];

          highlightGroups.forEach(
            ({ elements, trigger, start, end, toggleClass }) => {
              elements.forEach((element) => {
                ScrollTrigger.create({
                  trigger,
                  start,
                  end,
                  toggleClass: { targets: element, className: toggleClass },
                });
              });
            }
          );
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
