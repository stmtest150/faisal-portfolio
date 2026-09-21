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
const preloader = document.getElementById("preloader");
const emailAddress = "faisalraheem432@gmail.com";
const Storage = {
    get(key, fallback = null) {
        try {
            const val = localStorage.getItem(key);
            return val !== null ? val : fallback;
        } catch (e) {
            console.warn("Storage blocked:", e.message);
            return fallback;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn("Storage blocked:", e.message);
        }
    }
};
window.addEventListener("load", () => {
    setTimeout(() => preloader?.classList.add("hide"), 800);
});


function getPreferredTheme() {
    const saved = localStorage.getItem("frb-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeIcon() {
    if (!themeIcon) return;
    const current = html.getAttribute("data-theme");
    if (current === "dark") {
        themeIcon.className = "bi bi-moon-stars-fill";
        themeToggle.setAttribute("aria-label", "Switch to light theme");
    } else {
        themeIcon.className = "bi bi-sun-fill";
        themeToggle.setAttribute("aria-label", "Switch to dark theme");
    }
}

function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("frb-theme", theme);
    updateThemeIcon();
}

setTheme(getPreferredTheme());

themeToggle?.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
});

function handleNavbarScroll() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();

function updateScrollProgress() {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = `${pct}%`;
}
window.addEventListener("scroll", updateScrollProgress);
updateScrollProgress();

function handleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 500);
}
window.addEventListener("scroll", handleBackToTop);
handleBackToTop();

backToTop?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const roles = [
    "scalable web apps",
    "clean architectures",
    "modern experiences",
    "useful software",
    "reliable APIs"
];

const roleText = document.getElementById("roleText");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    if (!roleText) return;
    const current = roles[roleIndex];
    if (isDeleting) {
        roleText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeRole, speed);
}

if (roleText && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTimeout(typeRole, 1200);
}

const collapseHeaders = document.querySelectorAll(".collapse-header");

function toggleSection(header, forceOpen = null) {
    const targetId = header.getAttribute("data-collapse");
    const body = document.getElementById(`${targetId}Body`);
    if (!body) return;

    const isOpen = forceOpen !== null ? forceOpen : !header.classList.contains("open");

    if (isOpen) {
        header.classList.add("open");
        body.classList.add("open");
    } else {
        header.classList.remove("open");
        body.classList.remove("open");
    }
}

collapseHeaders.forEach((header) => {
    header.addEventListener("click", (e) => {
        toggleSection(header);
    });

    header.setAttribute("tabindex", "0");
    header.setAttribute("role", "button");
    header.setAttribute("aria-expanded", "false");

    header.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleSection(header);
        }
    });
});

const navLinks = document.querySelectorAll(".nav-link");
const allSections = document.querySelectorAll("section[id], header[id]");

const sectionHeaderMap = {};
collapseHeaders.forEach(h => {
    const key = h.getAttribute("data-collapse");
    sectionHeaderMap[key] = h;
});

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        const targetId = href.slice(1);
        const header = sectionHeaderMap[targetId];
        const navbarCollapse = document.getElementById("navbarContent");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            const instance = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
            instance.hide();
        }

        if (header) {
            collapseHeaders.forEach(h => {
                if (h !== header) toggleSection(h, false);
            });

            setTimeout(() => toggleSection(header, true), 100);
            setTimeout(() => {
                const target = document.getElementById(targetId);
                if (target) {
                    const offset = target.offsetTop - 100;
                    window.scrollTo({ top: offset, behavior: "smooth" });
                }
            }, 300);
        } else if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
});

const sectionIds = ["home", "about", "skills", "projects", "services", "contact"];

function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    let current = "home";

    sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
            current = id;
        }
    });

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        current = "contact";
    }

    navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === `#${current}`) link.classList.add("active");
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        projectItems.forEach((item) => {
            const cat = item.getAttribute("data-category") || "";
            const show = filter === "all" || cat.includes(filter);
            if (show) {
                item.classList.remove("hidden");
                item.style.animation = "none";
                void item.offsetWidth;
                item.style.animation = "fadeSlideIn 0.5s ease forwards";
            } else {
                item.classList.add("hidden");
            }
        });
    });
});

const styleEl = document.createElement("style");
styleEl.textContent = `
    @keyframes fadeSlideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleEl);
copyEmailButton?.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(emailAddress);
        copyMessage.textContent = "✓ Email copied to clipboard!";
        copyEmailButton.classList.add("success");
        copyEmailButton.innerHTML = '<i class="bi bi-check2"></i>';
    } catch {
        copyMessage.textContent = `Email: ${emailAddress}`;
    }

    setTimeout(() => {
        copyMessage.textContent = "";
        copyEmailButton.classList.remove("success");
        copyEmailButton.innerHTML = '<i class="bi bi-copy"></i>';
    }, 2500);
});

function animateSkillBars() {
    document.querySelectorAll(".skill-panel").forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            panel.classList.add("active");
        }
    });
}
window.addEventListener("scroll", animateSkillBars);
const skillsHeader = document.querySelector('[data-collapse="skills"]');
skillsHeader?.addEventListener("click", () => {
    setTimeout(animateSkillBars, 400);
});

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorRing = document.querySelector("[data-cursor-ring]");

if (cursorDot && cursorRing && window.matchMedia("(min-width: 992px)").matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        cursorDot.style.left = mx + "px";
        cursorDot.style.top = my + "px";
    });

    function animateRing() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        cursorRing.style.left = rx + "px";
        cursorRing.style.top = ry + "px";
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = document.querySelectorAll(
        "a, button, .filter-btn, .collapse-header, .tech-pill, .info-tile, .contact-row"
    );
    hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", () => cursorRing.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursorRing.classList.remove("hover"));
    });
}

if (currentYear) currentYear.textContent = new Date().getFullYear();
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        collapseHeaders.forEach(h => toggleSection(h, false));
    }
});