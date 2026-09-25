/* =========================================
   WORK PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     THEME
  ========================================== */

  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");

  let isDark = false;

  function updateTheme() {
    root.dataset.theme = isDark ? "dark" : "light";

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      isDark = !isDark;
      updateTheme();
    });
  }

  updateTheme();

  /* =========================================
     MOBILE MENU
  ========================================== */

  const menu = document.querySelector(".mobile-menu");
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const menuClose = document.querySelector(".mobile-menu-close");
  const mobileLinks = document.querySelectorAll(".mobile-nav a");

  function openMenu() {
    if (!menu || !menuToggle) {
      return;
    }

    menu.classList.add("is-open");
    document.body.classList.add("menu-open");

    menu.setAttribute("aria-hidden", "false");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute("aria-label", "Close menu");
  }

  function closeMenu() {
    if (!menu || !menuToggle) {
      return;
    }

    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    menu.setAttribute("aria-hidden", "true");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open menu");
  }

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

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* =========================================
     PROJECT FILTERS
  ========================================== */

  const filterButtons = document.querySelectorAll(".project-filter");

  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      /* Update active button */

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;

        filterButton.classList.toggle("is-active", isActive);

        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      /* Filter projects */

      projectCards.forEach((card) => {
        const categories = card.dataset.category
          ? card.dataset.category.split(" ")
          : [];

        const shouldShow =
          selectedFilter === "all" || categories.includes(selectedFilter);

        if (shouldShow) {
          card.classList.remove("is-hidden");

          requestAnimationFrame(() => {
            card.classList.add("is-visible");
          });
        } else {
          card.classList.remove("is-visible");

          card.classList.add("is-hidden");
        }
      });
    });
  });

  /* =========================================
     SCROLL REVEALS
  ========================================== */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* =========================================
     INITIAL PROJECT VISIBILITY
  ========================================== */

  /*
    The filter system uses display:none for
    hidden projects. The remaining cards still
    receive their normal reveal animation.
  */
});
