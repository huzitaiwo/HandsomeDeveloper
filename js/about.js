/* ==========================================================
   ABOUT PAGE JAVASCRIPT
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ======================================================
       ELEMENTS
       ====================================================== */

  const body = document.body;

  const themeToggle = document.querySelector(".theme-toggle");

  const menuToggle = document.querySelector(".menu-toggle");

  const mobileMenu = document.querySelector("#mobile-menu");

  const mobileLinks = document.querySelectorAll(".mobile-nav a");

  /* ======================================================
       THEME
       Light mode is the default.
       ====================================================== */

  const setTheme = (isDark) => {
    body.classList.toggle("dark", isDark);

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  };

  setTheme(false);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.contains("dark");

      setTheme(!isDark);
    });
  }

  /* ======================================================
       MOBILE MENU
       ====================================================== */

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) {
      return;
    }

    menuToggle.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open menu");

    mobileMenu.classList.remove("is-open");

    mobileMenu.setAttribute("aria-hidden", "true");

    body.style.overflow = "";
  };

  const openMenu = () => {
    if (!menuToggle || !mobileMenu) {
      return;
    }

    menuToggle.classList.add("is-open");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute("aria-label", "Close menu");

    mobileMenu.classList.add("is-open");

    mobileMenu.setAttribute("aria-hidden", "false");

    body.style.overflow = "hidden";
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* ======================================================
       SCROLL REVEALS
       ====================================================== */

  const revealTargets = [
    ".context-title",
    ".context-intro",
    ".portrait",
    ".story-content",

    ".philosophy-heading",
    ".philosophy-copy",

    ".capabilities-heading",
    ".capability",

    ".approach-heading",
    ".approach-list",

    ".connect-heading",
    ".connect-links",
  ];

  const revealElements = document.querySelectorAll(revealTargets.join(", "));

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,

      rootMargin: "0px 0px -60px 0px",
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
});
