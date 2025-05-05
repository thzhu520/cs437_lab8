import { toHtmlElement } from "./toHtmlElement.mjs";

const headerHTML = `
  <header class="navbar">
    <h1>°˖✧ Theresa Zhu ✧˖°</h1>
    <label class="theme-switch">
      <input type="checkbox" id="theme-toggle" autocomplete="off" />
      Dark mode
    </label>
    <button class="menu-button" aria-label="Toggle navigation">☰</button>
    <nav class="nav-links">
      <a href="index.html">Home</a><span class="dot">•</span>
      <a href="projects.html">Projects</a><span class="dot">•</span>
      <a href="hobbies.html">Hobbies</a>
    </nav>
  </header>
`;

const headerFragment = toHtmlElement(headerHTML);
const body = document.body;

// Insert at the top of the overlay
const overlay = document.querySelector(".overlay");
overlay.prepend(headerFragment);

// Handle toggle button behavior
const menuBtn = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("show");
});

const themeToggle = document.getElementById("theme-toggle");

function applyTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark-mode");
    themeToggle.checked = false;
    localStorage.setItem("darkMode", "false");
  }
}

themeToggle.addEventListener("change", () => {
  applyTheme(themeToggle.checked);
});

// On load: restore dark mode if set
const savedMode = localStorage.getItem("darkMode");
if (savedMode === "true") {
  applyTheme(true);
}


// Close nav on outside click
document.body.addEventListener("click", (e) => {
  if (!document.querySelector("header").contains(e.target)) {
    navLinks.classList.remove("show");
  }
});
