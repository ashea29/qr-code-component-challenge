import dtIconUrl from "./images/dark-theme-icon.svg";
import ltIconUrl from "./images/light-theme-icon.svg";
import qrCodeDarkUrl from "./images/image-qr-code-dark.png";
import qrCodeLightUrl from "./images/image-qr-code-light.png";

// Get DOM elements
const themeToggle = document.getElementById("theme-toggle");
const toggleImg = document.getElementById("theme-icon");
const qrCode = document.getElementById("qr-code");

// Attach event listeners
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggle.querySelector("span").textContent =
    document.body.classList.contains("dark-theme")
      ? "Switch to light theme"
      : "Switch to dark theme";

  qrCode.src = document.body.classList.contains("dark-theme")
    ? qrCodeDarkUrl
    : qrCodeLightUrl;
  toggleImg.src = document.body.classList.contains("dark-theme")
    ? ltIconUrl
    : dtIconUrl;
});
