(function () {
  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  const $ = (s, scope = document) => scope.querySelector(s);
  const $$ = (s, scope = document) => Array.from(scope.querySelectorAll(s));

  // ========================================
  // HEADER & NAVIGATION
  // ========================================

  // Mobile navigation toggle
  function initMobileNav() {
    const navToggle = $(".nav-toggle");
    const primaryNav = $("#primary-nav");

    if (navToggle && primaryNav) {
      navToggle.addEventListener("click", () => {
        const open = document.body.classList.toggle("nav-open");
        navToggle.setAttribute("aria-expanded", String(open));
      });
    }
  }

  // Smooth scroll for navigation links
  function initSmoothScroll() {
    $$(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const target = $(href);
          if (target) target.scrollIntoView({ behavior: "smooth" });
          document.body.classList.remove("nav-open");
          $(".nav-toggle")?.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Header scroll effect
  function initHeaderScroll() {
    const onScroll = () => {
      if (window.scrollY > 8) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Active section highlighting
  function initActiveSection() {
    const sections = [
      "#home",
      "#product",
      "#about",
      "#team",
      "#solutions",
      "#features",
      "#testimonials",
      "#pricing",
      "#faq",
      "#contact",
    ]
      .map((id) => $(id))
      .filter(Boolean);

    const links = Array.from($$(".nav-link"));
    const linkFor = (href) =>
      links.find((l) => l.getAttribute("href") === href);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = "#" + entry.target.id;
          const link = linkFor(id);
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-50% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
  }