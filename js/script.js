const root = document.documentElement;
const body = document.body;

/* =========================================
   ELEMENTS
========================================= */

const themeToggle = document.querySelector(".theme-toggle");

const menuToggle = document.querySelector(".menu-toggle");

const menuClose = document.querySelector(".menu-close");

const mobileMenu = document.querySelector("#mobile-menu");

const mobileLinks = document.querySelectorAll(".mobile-nav-link");

/* =========================================
   THEME
========================================= */

function setTheme(theme) {
  root.dataset.theme = theme;

  if (themeToggle) {
    const isDark = theme === "dark";

    themeToggle.setAttribute("aria-pressed", String(isDark));

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  }

  /*
    Keep browser UI color
    synchronized with theme.
  */

  const themeColor = getComputedStyle(root).getPropertyValue("--bg").trim();

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColor);
}

/* =========================================
   THEME TOGGLE
========================================= */

themeToggle?.addEventListener("click", () => {
  const currentTheme = root.dataset.theme;

  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  setTheme(nextTheme);
});

/* =========================================
   OPEN MOBILE MENU
========================================= */

function openMenu() {
  mobileMenu.classList.add("is-open");

  mobileMenu.setAttribute("aria-hidden", "false");

  menuToggle.setAttribute("aria-expanded", "true");

  menuToggle.setAttribute("aria-label", "Close navigation menu");

  body.classList.add("menu-open");

  /*
    Move keyboard focus into
    the opened menu.
  */

  requestAnimationFrame(() => {
    menuClose?.focus();
  });
}

/* =========================================
   CLOSE MOBILE MENU
========================================= */

function closeMenu() {
  mobileMenu.classList.remove("is-open");

  mobileMenu.setAttribute("aria-hidden", "true");

  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.setAttribute("aria-label", "Open navigation menu");

  body.classList.remove("menu-open");

  /*
    Return keyboard focus
    to menu trigger.
  */

  menuToggle?.focus();
}

/* =========================================
   MENU TOGGLE
========================================= */

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

/* =========================================
   CLOSE BUTTON
========================================= */

menuClose?.addEventListener("click", closeMenu);

/* =========================================
   MOBILE LINKS
========================================= */

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
    closeMenu();
  }
});

/* =========================================
   CLOSE MENU WHEN MOVING TO DESKTOP
========================================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 760 && mobileMenu.classList.contains("is-open")) {
    closeMenu();
  }
});

/* =========================================
   INITIAL STATE
========================================= */

/*
  Light mode is ALWAYS the
  initial/default mode.

  Nothing is stored in localStorage.
*/

setTheme("light");

/* =========================================
   WORK SECTION REVEAL
========================================= */

const workRevealElements = document.querySelectorAll(".work-reveal");

if (
  workRevealElements.length &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const workObserver = new IntersectionObserver(
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

  workRevealElements.forEach((element) => {
    workObserver.observe(element);
  });
} else {
  workRevealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

/* =========================================
   CAPABILITIES REVEAL
========================================= */

const capabilityRevealElements = document.querySelectorAll(
  ".capabilities-reveal",
);

if (
  capabilityRevealElements.length &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const capabilityObserver = new IntersectionObserver(
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

  capabilityRevealElements.forEach((element) => {
    capabilityObserver.observe(element);
  });
} else {
  capabilityRevealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

/* =========================================
   TOOLKIT REVEAL
========================================= */

const toolkitRevealElements = document.querySelectorAll(".toolkit-reveal");

if (
  toolkitRevealElements.length &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const toolkitObserver = new IntersectionObserver(
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

  toolkitRevealElements.forEach((element) => {
    toolkitObserver.observe(element);
  });
} else {
  toolkitRevealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}
