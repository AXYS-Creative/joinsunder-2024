// // Select the loader element
// const loader = document.querySelector(".page-loader");

// // Minimum delay for loader (in milliseconds)
// const minDelay = 2000;

// // Create a promise that resolves when the page has loaded
// const pageLoaded = new Promise((resolve) => {
//   window.addEventListener("load", resolve);
// });

// // Create a promise that resolves after the minimum delay
// const delay = new Promise((resolve) => setTimeout(resolve, minDelay));

// // Use Promise.race to ensure loader disappears after both conditions
// Promise.all([pageLoaded, delay]).then(() => {
//   loader.classList.add("hidden"); // Hide the loader
// });
