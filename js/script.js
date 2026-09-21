"use strict";
        (function () {
            if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
            if (window.location.hash) history.replaceState(null, null, window.location.pathname);
            window.addEventListener('load', () => {
                window.scrollTo(0, 0);
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#home');
                });
            });
        })();

        const scrollProgress = document.getElementById("scrollProgress");
        window.addEventListener("scroll", () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
            scrollProgress.style.width = pct + "%";
        }, { passive: true });

        const navbar = document.getElementById("mainNavbar");
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 40);
        }, { passive: true });

        const backToTop = document.getElementById("backToTop");
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("show", window.scrollY > 500);
        }, { passive: true });
        backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

        const themeToggle = document.getElementById("themeToggle");
        const MOON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>';
        const SUN_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>';

        function getTheme() { try { return localStorage.getItem("frb-theme") || "light"; } catch { return "light"; } }
        function setTheme(t) {
            document.documentElement.setAttribute("data-bs-theme", t);
            try { localStorage.setItem("frb-theme", t); } catch {}
            themeToggle.innerHTML = t === "dark" ? SUN_SVG : MOON_SVG;
        }
        setTheme(getTheme());
        themeToggle.addEventListener("click", () => {
            setTheme(document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark");
        });

        const roles = ["scalable web apps", "clean architectures", "modern experiences", "reliable APIs"];
        const roleText = document.getElementById("roleText");
        let rIdx = 0, cIdx = 0, deleting = false;
        function typeRole() {
            const current = roles[rIdx];
            roleText.textContent = deleting ? current.substring(0, cIdx - 1) : current.substring(0, cIdx + 1);
            cIdx += deleting ? -1 : 1;
            let speed = deleting ? 40 : 80;
            if (!deleting && cIdx === current.length) { speed = 1800; deleting = true; }
            else if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; speed = 400; }
            setTimeout(typeRole, speed);
        }
        setTimeout(typeRole, 1200);

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const filter = btn.dataset.filter;
                document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                document.querySelectorAll(".project-item").forEach(item => {
                    const show = filter === "all" || item.dataset.category.includes(filter);
                    item.style.display = show ? "" : "none";
                });
            });
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add("show"); revealObserver.unobserve(e.target); }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

        const sections = document.querySelectorAll("section[id], header[id]");
        const navLinks = document.querySelectorAll(".nav-link");
        window.addEventListener("scroll", () => {
            let current = "home";
            sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
            navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + current));
        }, { passive: true });

        document.getElementById("currentYear").textContent = new Date().getFullYear();
        const successToast = document.getElementById("successToast");
        function showToast(title, message, type = "success") {
            if (!successToast) return;
            const titleEl = successToast.querySelector(".toast-title");
            const msgEl = successToast.querySelector(".toast-message");
            const iconEl = successToast.querySelector(".toast-icon");
            titleEl.textContent = title;
            msgEl.textContent = message;
            if (type === "warning") {
                iconEl.style.background = "linear-gradient(135deg, #ffc107, #fd7e14)";
            } else {
                iconEl.style.background = "linear-gradient(135deg, #198754, #20c997)";
            }
            successToast.classList.add("show");
            clearTimeout(window._toastTimer);
            window._toastTimer = setTimeout(() => successToast.classList.remove("show"), 5000);
        }
        successToast?.querySelector(".toast-close")?.addEventListener("click", () => {
            successToast.classList.remove("show");
            clearTimeout(window._toastTimer);
        });

        const MY_EMAIL = "faisalraheem432@gmail.com";  
        const FORMSUBMIT_URL = "https://formsubmit.co/ajax/b2f4b54bf180b0799d5e6a198d87a05f";
        const contactForm = document.getElementById("contactForm");
        const sendBtn = document.getElementById("sendBtn");
        const SEND_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="22" height="22"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/></svg>';
        const CHECK_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="22" height="22"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>';
        const LOADER = '<span class="spinner-loader"></span>';

function validateForm() {
    const nameInput = document.getElementById("cName");
    const emailInput = document.getElementById("cEmail");
    const subjectInput = document.getElementById("cSubject");
    const messageInput = document.getElementById("cMessage");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    clearFieldError(nameInput);
    clearFieldError(emailInput);
    clearFieldError(subjectInput);
    clearFieldError(messageInput);

    if (!name) {
        showFieldError(nameInput, "Please enter your name.");
        showToast("Name Required", "Please enter your name.", "warning");
        return null;
    }
    if (!email) {
        showFieldError(emailInput, "Please enter your email.");
        showToast("Email Required", "Please enter your email.", "warning");
        return null;
    }
    if (!subject) {
        showFieldError(subjectInput, "Please enter a subject.");
        showToast("Subject Required", "Please enter a subject.", "warning");
        return null;
    }
    if (!message) {
        showFieldError(messageInput, "Please enter a message.");
        showToast("Message Required", "Please enter a message.", "warning");
        return null;
    }

    // ---- 2. NAME VALIDATION (only letters, spaces, hyphens, apostrophes) ----
    // Allows: letters, spaces, dots, hyphens, apostrophes
    // Rejects: numbers, special chars like @#$%^&*()_+={}[]|<>?/\
    const nameRegex = /^[A-Za-z\u00C0-\u024F\u0600-\u06FF\s.'-]+$/;

    if (/\d/.test(name)) {
        showFieldError(nameInput, "Name cannot contain numbers.");
        showToast("Invalid Name", "Name cannot contain numbers.", "warning");
        return null;
    }

    if (!nameRegex.test(name)) {
        showFieldError(nameInput, "Name can only contain letters, spaces, and . ' -");
        showToast("Invalid Name", "Name can only contain letters, spaces, and . ' -", "warning");
        return null;
    }

    if (name.length < 2) {
        showFieldError(nameInput, "Name must be at least 2 characters.");
        showToast("Invalid Name", "Name must be at least 2 characters.", "warning");
        return null;
    }

    if (name.length > 60) {
        showFieldError(nameInput, "Name is too long (max 60 characters).");
        showToast("Invalid Name", "Name is too long.", "warning");
        return null;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        showFieldError(emailInput, "Please enter a valid email address.");
        showToast("Invalid Email", "Please enter a valid email address.", "warning");
        return null;
    }

    if (email.includes("..")) {
        showFieldError(emailInput, "Email cannot contain consecutive dots.");
        showToast("Invalid Email", "Email cannot contain consecutive dots.", "warning");
        return null;
    }
    if (email.startsWith(".") || email.split("@")[0].endsWith(".")) {
        showFieldError(emailInput, "Invalid email format.");
        showToast("Invalid Email", "Invalid email format.", "warning");
        return null;
    }
    if (email.length > 254) {
        showFieldError(emailInput, "Email is too long.");
        showToast("Invalid Email", "Email is too long.", "warning");
        return null;
    }

    if (message.length < 10) {
        showFieldError(messageInput, "Message must be at least 10 characters.");
        showToast("Message Too Short", "Please write at least 10 characters.", "warning");
        return null;
    }

    if (message.length > 2000) {
        showFieldError(messageInput, "Message is too long (max 2000 characters).");
        showToast("Message Too Long", "Message is too long.", "warning");
        return null;
    }

    return { name, email, subject, message };
}

function showFieldError(input, message) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    const existingError = input.parentElement.querySelector(".field-error");
    if (existingError) existingError.remove();
    const error = document.createElement("div");
    error.className = "field-error";
    error.textContent = message;
    input.parentElement.appendChild(error);

    input.focus();
    const wrapper = input.parentElement;
    wrapper.classList.remove("shake-error");
    void wrapper.offsetWidth; 
    wrapper.classList.add("shake-error");
    setTimeout(() => wrapper.classList.remove("shake-error"), 400);
}
function clearFieldError(input) {
    input.classList.remove("is-invalid");
    const error = input.parentElement.querySelector(".field-error");
    if (error) error.remove();
}

document.getElementById("cName")?.addEventListener("input", function () {
    if (this.value.trim()) {
        clearFieldError(this);
    }
});

document.getElementById("cEmail")?.addEventListener("input", function () {
    if (this.value.trim()) {
        clearFieldError(this);
    }
});

document.getElementById("cSubject")?.addEventListener("input", function () {
    if (this.value.trim()) {
        clearFieldError(this);
    }
});

document.getElementById("cMessage")?.addEventListener("input", function () {
    if (this.value.trim()) {
        clearFieldError(this);
    }
});
        contactForm?.addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = validateForm();
            if (!data) return;
            sendBtn.classList.add("loading");
            sendBtn.querySelector(".btn-send-icon-s").innerHTML = LOADER;
            sendBtn.querySelector(".btn-send-text strong").textContent = "Sending...";
            sendBtn.querySelector(".btn-send-text small").textContent = "Please wait";

            try {
                const response = await fetch(FORMSUBMIT_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        subject: data.subject,
                        message: data.message,
                        _subject: "Portfolio Contact: " + data.subject,
                        _template: "table",
                        _captcha: "false",
                        _replyto: data.email,
                        _autoresponse: "Hi " + data.name + ",\n\nThank you for contacting me! I received your message and will reply within 24 hours.\n\nBest regards,\nFaisal Raheem Baloch"
                    })
                });

                const result = await response.json();

                if (response.ok && result.success !== false) {
                    sendBtn.classList.remove("loading");
                    sendBtn.classList.add("success");
                    sendBtn.querySelector(".btn-send-icon-s").innerHTML = CHECK_ICON;
                    sendBtn.querySelector(".btn-send-text strong").textContent = "Sent Successfully!";
                    sendBtn.querySelector(".btn-send-text small").textContent = "I'll reply soon";

                    showToast(
                        "Message Sent Successfully!",
                        "Thanks for reaching out. I'll reply within 24 hours.",
                        "success"
                    );

                    contactForm.reset();

                    setTimeout(() => {
                        sendBtn.classList.remove("success");
                        sendBtn.querySelector(".btn-send-icon-s").innerHTML = SEND_ICON;
                        sendBtn.querySelector(".btn-send-text strong").textContent = "Send Message";
                        sendBtn.querySelector(".btn-send-text small").textContent = "Direct to my inbox";
                    }, 4000);
                } else {
                    throw new Error("Send failed");
                }
            } catch (err) {
                sendBtn.classList.remove("loading");
                sendBtn.querySelector(".btn-send-icon-s").innerHTML = SEND_ICON;
                sendBtn.querySelector(".btn-send-text strong").textContent = "Send Message";
                sendBtn.querySelector(".btn-send-text small").textContent = "Direct to my inbox";

                showToast(
                    "Something went wrong",
                    "Please try again or email me directly at " + MY_EMAIL,
                    "warning"
                );
            }
        });
        document.getElementById("copyEmail")?.addEventListener("click", async () => {
            const btn = document.getElementById("copyEmail");
            try {
                await navigator.clipboard.writeText(MY_EMAIL);
                btn.classList.add("success");
                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style="width:18px;height:18px;"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>';
                showToast("Email Copied!", "Email copied to clipboard.", "success");
            } catch {
                showToast("Copy Failed", "Email: " + MY_EMAIL, "warning");
            }
            setTimeout(() => {
                btn.classList.remove("success");
                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style="width:18px;height:18px;"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/></svg>';
            }, 2500);
        });