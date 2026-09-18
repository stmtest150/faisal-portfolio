"use strict";

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector("i");

const navbar = document.getElementById("mainNavbar");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

const copyEmailButton = document.getElementById("copyEmail");
const copyMessage = document.getElementById("copyMessage");

const currentYear = document.getElementById("currentYear");

const emailAddress = "faisalraheem432@gmail.com";

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return prefersDark ? "dark" : "light";
}

function updateThemeIcon() {
  if (!themeIcon) return;

  const currentTheme = html.getAttribute("data-theme");

  if (currentTheme === "dark") {
    themeIcon.className = "bi bi-sun-fill";
    themeToggle.setAttribute(
      "aria-label",
      "Switch to light theme"
    );
  } else {
    themeIcon.className = "bi bi-moon-stars-fill";
    themeToggle.setAttribute(
      "aria-label",
      "Switch to dark theme"
    );
  }
}

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  updateThemeIcon();
}

setTheme(getPreferredTheme());

themeToggle?.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");

  const nextTheme =
    currentTheme === "dark" ? "light" : "dark";

  setTheme(nextTheme);
});

function handleNavbarScroll() {
  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();

function updateScrollProgress() {
  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress =
    documentHeight > 0
      ? (scrollTop / documentHeight) * 100
      : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }
}

window.addEventListener("scroll", updateScrollProgress);
updateScrollProgress();

function handleBackToTop() {
  if (!backToTop) return;

  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", handleBackToTop);

backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

handleBackToTop();
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);

updateActiveNavLink();

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.getElementById("mainNav");

    if (
      navbarCollapse &&
      navbarCollapse.classList.contains("show")
    ) {
      const collapseInstance =
        bootstrap.Collapse.getInstance(navbarCollapse) ||
        new bootstrap.Collapse(navbarCollapse);

      collapseInstance.hide();
    }
  });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    projectItems.forEach((project) => {
      const categories =
        project.getAttribute("data-category") || "";

      const shouldShow =
        filter === "all" ||
        categories.includes(filter);

      if (shouldShow) {
        project.classList.remove("d-none");
      } else {
        project.classList.add("d-none");
      }
    });
  });
});

copyEmailButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailAddress);

    copyMessage.textContent =
      "Email copied successfully.";

    copyEmailButton.innerHTML =
      '<i class="bi bi-check2 me-2"></i>Copied';

  } catch (error) {
    copyMessage.textContent =
      `Email: ${emailAddress}`;
  }

  setTimeout(() => {
    copyMessage.textContent = "";

    copyEmailButton.innerHTML =
      '<i class="bi bi-copy me-2"></i>Copy Email';
  }, 3000);
});



if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}