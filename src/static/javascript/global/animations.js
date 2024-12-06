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

    // Image Reel, home and experience
    if (document.querySelector(".image-reel")) {
      const yValHome = maxSm ? "-20.5%" : "-21.1%";
      // const yValExperience = maxMd ? "-9.65%" : maxXxl ? "-9.675%" : "-9.85%";
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

    // Experience Page
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
            start: "top top",
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

        window.addEventListener("load", () => {
          ScrollTrigger.refresh();
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
