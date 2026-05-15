const menuButton = document.querySelector(".nav-right");
const menuOverlay = document.querySelector(".menu-overlay");

menuButton.addEventListener("click", () => {
  menuOverlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});
