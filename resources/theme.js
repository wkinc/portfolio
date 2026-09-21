(function () {
  var root = document.documentElement;
  var saved = null;

  try { saved = localStorage.getItem("theme"); } catch (e) {}

  // Use saved choice, otherwise fall back to the system setting
  var theme = saved ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.setAttribute("data-theme", theme);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function render() {
      var isDark = root.getAttribute("data-theme") === "dark";
      btn.textContent = isDark ? "☀️ Light" : "🌙 Dark";
      btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    }

    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      render();
    });

    render();
  });
})();
