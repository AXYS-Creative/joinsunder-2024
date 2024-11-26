export const isMouseDevice = window.matchMedia("(pointer: fine)").matches;
export const mqMaxXxl = window.matchMedia("(max-width: 1512px)").matches;
export const mqMaxMd = window.matchMedia("(max-width: 768px)").matches;

export const root = document.documentElement;

// Lenis
export const lenis = new Lenis();

const handleLenis = (() => {
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
})();

// export const isSafari = () => {
//   let ua = navigator.userAgent.toLowerCase();
//   return ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1;
// };

/**
 * Custom classes for Safari. Add any element’s class to the array below.
 * This class will now have a customizable 'safari-styles' class you can target.
 */
// const safariClasses = (() => {
//   const elementList = [".magnet", ".social-media-link", ".header-logo"];

//   if (isSafari()) {
//     elementList.forEach((element) => {
//       const elements = document.querySelectorAll(element);

//       elements.forEach((el) => {
//         el.classList.add("safari-styles");
//       });
//     });
//   }
// })();
