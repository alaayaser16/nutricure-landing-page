/* =========================================================
    NutriCure — script.js
    Smooth interactions, scroll effects, mobile menu
    ========================================================= */

(function () {
  "use strict";

  /* ─── DOM References ─── */
  const header = document.getElementById("header");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("section[id]");
  const backToTop = document.getElementById("backToTop");
  const submitBtn = document.getElementById("submitBtn");
  const toast = document.getElementById("toast");
  const fadeEls = document.querySelectorAll(".fade-up");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");

  /* ══════════════════════════════
        STICKY HEADER ON SCROLL
    ══════════════════════════════ */
  function handleScroll() {
    const scrollY = window.scrollY;

    /* Sticky header */
    if (scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    /* Back to top button */
    if (scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    /* Active nav link */
    highlightNavLink();

    /* Reveal animations */
    revealOnScroll();
  }

  /* ══════════════════════════════
        ACTIVE NAV LINK ON SCROLL
    ══════════════════════════════ */
  function highlightNavLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  /* ══════════════════════════════
        SCROLL REVEAL ANIMATION
    ══════════════════════════════ */
  function revealOnScroll() {
    const windowBottom = window.scrollY + window.innerHeight;

    fadeEls.forEach((el) => {
      const elTop = el.getBoundingClientRect().top + window.scrollY;

      if (windowBottom > elTop + 60) {
        el.classList.add("visible");
      }
    });
  }

  /* Initial reveal for elements already in viewport */
  revealOnScroll();

  /* ══════════════════════════════
        MOBILE MENU TOGGLE
    ══════════════════════════════ */
  function openMobileMenu() {
    hamburger.classList.add("open");
    mobileMenu.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  function toggleMobileMenu() {
    if (hamburger.classList.contains("open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  hamburger.addEventListener("click", toggleMobileMenu);

  /* Close menu when a mobile link is clicked */
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* Close menu on outside click */
  document.addEventListener("click", (e) => {
    if (
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target) &&
      mobileMenu.classList.contains("open")
    ) {
      closeMobileMenu();
    }
  });

  /* ══════════════════════════════
        SMOOTH SCROLL FOR NAV LINKS
    ══════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = header.offsetHeight;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
    });
  });

  /* ══════════════════════════════
        BACK TO TOP
    ══════════════════════════════ */
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ══════════════════════════════
        FORM SUBMIT — FRONTEND ONLY
    ══════════════════════════════ */
  function showToast(msg) {
    toast.innerHTML = `<span>✅</span> ${msg}`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }

  function validateForm() {
    const name = document.querySelector('.form__input[placeholder*="اسمك"]');
    const phone = document.querySelector('.form__input[placeholder*="01X"]');
    const email = document.querySelector('.form__input[placeholder*="email"]');

    if (!name || name.value.trim().length < 2) {
      shakeField(name);
      return false;
    }
    if (!phone || phone.value.trim().length < 8) {
      shakeField(phone);
      return false;
    }
    if (!email || !email.value.includes("@")) {
      shakeField(email);
      return false;
    }
    return true;
  }

  function shakeField(input) {
    if (!input) return;
    input.style.borderColor = "#e05a5a";
    input.style.boxShadow = "0 0 0 3px rgba(224,90,90,0.15)";
    input.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(-4px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 320, easing: "ease" },
    );

    setTimeout(() => {
      input.style.borderColor = "";
      input.style.boxShadow = "";
    }, 1800);
  }

  submitBtn.addEventListener("click", () => {
    if (!validateForm()) return;

    /* Simulate sending */
    submitBtn.classList.add("loading");
    submitBtn.textContent = "جارٍ الإرسال...";

    setTimeout(() => {
      submitBtn.classList.remove("loading");
      submitBtn.innerHTML = `
            احجز استشارتك الآن
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

      /* Clear form */
      document
        .querySelectorAll(".form__input, .form__textarea")
        .forEach((el) => {
          el.value = "";
        });

      showToast("تم إرسال طلبك بنجاح! سنتواصل معك في أقرب وقت.");
    }, 1600);
  });

  /* ══════════════════════════════
        CARD HOVER GLOW (subtle)
    ══════════════════════════════ */
  document
    .querySelectorAll(".service-card, .testimonial-card")
    .forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
        const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
        card.style.setProperty("--mouse-x", `${x}%`);
        card.style.setProperty("--mouse-y", `${y}%`);
      });
    });

  /* ══════════════════════════════
        STAT COUNTER ANIMATION
    ══════════════════════════════ */
  function animateCounter(el, target, suffix) {
    let count = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      el.textContent = suffix ? `+${count}` : `${count}%`;
    }, 28);
  }

  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      countersStarted = true;

      const statNums = document.querySelectorAll(".stat-card__num");
      const data = [
        { value: 500, suffix: true },
        { value: 98, suffix: false },
        { value: 5, suffix: true },
      ];

      statNums.forEach((el, i) => {
        const d = data[i];
        if (d) animateCounter(el, d.value, d.suffix);
      });
    }
  }

  /* ══════════════════════════════
        SCROLL EVENT LISTENER
    ══════════════════════════════ */
  window.addEventListener(
    "scroll",
    () => {
      handleScroll();
      startCounters();
    },
    { passive: true },
  );

  /* Initial call */
  handleScroll();

  /* ══════════════════════════════
        RESIZE — Close mobile menu
    ══════════════════════════════ */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
})();
