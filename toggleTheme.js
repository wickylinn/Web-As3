function applyTheme() {
  const theme = localStorage.getItem("theme") || "light";
  const logo = document.querySelector(".logo");

  if (theme === "dark") {
    document.body.classList.add("dark-theme");
    if (logo) logo.src = "Logos/logoBmini.png";
  } else {
    document.body.classList.remove("dark-theme");
    if (logo) logo.src = "Logos/logoWmini.png";
  }
}

function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme();
}

document.addEventListener("DOMContentLoaded", applyTheme);