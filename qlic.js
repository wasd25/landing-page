(function () {

    const $ = (s, scope = document) => scope.querySelector(s);
    const $$ = (s, scope = document) => Array.from(scope.querySelectorAll(s));


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


    // Learn More toggle
    function initLearnMore() {
        const learnMoreBtn = $("#btn-learn-more");
        const learnMorePanel = $("#learn-more-panel");

        if (learnMoreBtn && learnMorePanel) {
            learnMoreBtn.addEventListener("click", () => {
                const isHidden = learnMorePanel.hasAttribute("hidden");
                if (isHidden) {
                    learnMorePanel.removeAttribute("hidden");
                } else {
                    learnMorePanel.setAttribute("hidden", "");
                }
            });
        }
    }

    // Get Started modal
    function initSignupModal() {
        const modal = $("#modal");
        const openBtn = $("#btn-get-started");
        const mobileCta = $("#mobile-cta");
        const closeEls = $$("[data-close]", modal || undefined);

        function openModal() {
            modal?.removeAttribute("hidden");
            $("#signup-name")?.focus();
            document.body.style.overflow = "hidden";
        }

        function closeModal() {
            modal?.setAttribute("hidden", "");
            document.body.style.overflow = "";
        }

        // Event listeners
        openBtn?.addEventListener("click", openModal);
        mobileCta?.addEventListener("click", openModal);
        closeEls.forEach((el) => el.addEventListener("click", closeModal));

        // Close on backdrop click
        modal?.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !modal?.hasAttribute("hidden")) closeModal();
        });

        return { openModal, closeModal };
    }


    function initPricingPlans() {
        const toast = $("#plan-toast");

        $$(".choose-plan").forEach((btn) => {
            btn.addEventListener("click", () => {
                const plan = btn.getAttribute("data-plan") || "";
                const tr = translations[getCurrentLanguage()];

                if (!toast) return;
                toast.textContent = tr["toast.plan"].replace("{plan}", plan);
                toast.hidden = false;
                setTimeout(() => {
                    toast.hidden = true;
                }, 2000);
            });
        });
    }


    function initContactForm() {
        const contactForm = $("#contact-form");
        const contactStatus = $("#contact-status");

        contactForm?.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = $("#contact-name")?.value.trim();
            const email = $("#contact-email")?.value.trim();
            const message = $("#contact-message")?.value.trim();
            const tr = translations[getCurrentLanguage()];

            if (!name || !email || !message) {
                contactStatus &&
                (contactStatus.textContent = tr["status.contact.invalid"]);
                return;
            }

            if (contactStatus)
                contactStatus.textContent = tr["status.contact.success"];
            contactForm.reset();
        });
    }


    function initSignupForm() {
        const signupForm = $("#signup-form");
        const signupStatus = $("#signup-status");
        const { closeModal } = initSignupModal();

        signupForm?.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = $("#signup-name")?.value.trim();
            const email = $("#signup-email")?.value.trim();
            const password = $("#signup-password")?.value || "";
            const tr = translations[getCurrentLanguage()];

            if (!name || !email || password.length < 6) {
                signupStatus &&
                (signupStatus.textContent = tr["status.signup.invalid"]);
                return;
            }

            if (signupStatus) signupStatus.textContent = tr["status.signup.success"];
            setTimeout(closeModal, 900);
        });
    }


    const translations = {
        en: {
            // Navigation
            "nav.product": "Product",
            "nav.about": "About Us",
            "nav.team": "Team",
            "nav.solutions": "Solutions",
            "nav.features": "Features",
            "nav.testimonials": "Testimonials",
            "nav.pricing": "Pricing",
            "nav.faq": "FAQ",
            "nav.contact": "Contact Sales",

            // Hero Section
            "hero.title": "Smart liquid monitoring for homes and businesses",
            "hero.subtitle":
                "Track volume, pressure, density and temperature in real time with clear alerts and reports.",
            "cta.getStarted": "Get Started",
            "cta.learnMore": "Learn More",
            "hero.more":
                "Qlic integrates high-precision sensors with a cloud platform to give you full visibility of your tanks and lines. Configure alerts, share access, and export data for audits.",
            "hero.badge": "Real-Time Monitoring",

            // Trust indicators
            "trust.sensors": "Certified sensors",
            "trust.uptime": "99.9% uptime",
            "trust.cloud": "Cloud dashboard",

            // Device readouts
            "readout.volume": "Volume",
            "readout.pressure": "Pressure",
            "readout.temperature": "Temperature",
            "readout.density": "Density",

            // Product Section
            "product.title": "Full visibility of your liquids",
            "product.desc":
                "Monitor liquid tanks and pipelines, measuring volume, pressure and temperature with clear dashboards and configurable alerts.",
            "cards.volumeTitle": "Volume Management",
            "cards.volumeText":
                "Record levels, calculate consumption and predict replenishments.",
            "cards.pressureTitle": "Pressure Tracking",
            "cards.pressureText":
                "Detect pressure variations to prevent line damage.",
            "cards.temperatureTitle": "Temperature Control",
            "cards.temperatureText": "Ensure ideal ranges with smart alerts.",

            // About Section
            "about.title": "About Us",
            "about.desc":
                "At Qlic we build sensor and software technology to provide total visibility of liquid usage. We believe in precise data, useful alerts and operational simplicity.",
            "about.missionTitle": "Mission",
            "about.missionText": "Make liquid management predictable and efficient.",
            "about.reliabilityTitle": "Reliability",
            "about.reliabilityText":
                "Certified sensors and a platform with 99.9% uptime.",
            "about.closenessTitle": "Customer focus",
            "about.closenessText":
                "Human support, guided onboarding and continuous improvements.",

            // Team Section
            "team.title": "Our team",
            "team.desc": "Five pillars powering Qlic:",

            // Solutions Section
            "solutions.title": "Solutions by segment",
            "solutions.homeTitle": "Residences",
            "solutions.homeText":
                "Monitor liquid tanks, receive low-level alerts and prevent leaks.",
            "solutions.businessTitle": "Businesses",
            "solutions.businessText":
                "Control liquid inventories, audits and compliance in industries.",

            // Features Section
            "features.title": "Key features",
            "features.pressureTitle": "Pressure Tracking",
            "features.pressureText":
                "Trends and safety thresholds with notifications.",
            "features.temperatureTitle": "Temperature Control",
            "features.temperatureText":
                "Custom ranges and thermal control for quality.",
            "features.volumeTitle": "Volume Management",
            "features.volumeText":
                "Consumption projections and replenishment logistics.",

            // Testimonials Section
            "testimonials.title": "What our customers say",
            "testimonials.desc": "Real stories from teams using Qlic for liquids.",
            "testimonials.1.quote":
                "We finally have full visibility of our liquid tanks. Alerts prevented two outages last month.",
            "testimonials.1.name": "Laura P.",
            "testimonials.1.role": "Facilities Lead",
            "testimonials.2.quote":
                "Setup was simple and the dashboards are clear. Great support as well.",
            "testimonials.2.name": "Daniel R.",
            "testimonials.2.role": "Operations Manager",
            "testimonials.3.quote":
                "We reduced liquid waste by 18% after a quarter using Qlic.",
            "testimonials.3.name": "María G.",
            "testimonials.3.role": "Plant Supervisor",

            // Pricing Section
            "pricing.title": "Subscription plans",
            "pricing.perMonth": "/mo",
            "pricing.recommended": "Recommended",
            "pricing.choose": "Choose Plan",
            "pricing.custom": "Custom",
            "pricing.basic.f1": "1 tank",
            "pricing.basic.f2": "Update every 15 min",
            "pricing.basic.f3": "Basic alerts",
            "pricing.basic.f4": "Email support",
            "pricing.pro.f1": "Up to 5 tanks",
            "pricing.pro.f2": "Update every 5 min",
            "pricing.pro.f3": "Advanced alerts",
            "pricing.pro.f4": "Shared dashboards",
            "pricing.pro.f5": "Priority support",
            "pricing.ent.f1": "Unlimited tanks and sites",
            "pricing.ent.f2": "Integrations and SLAs",
            "pricing.ent.f3": "Exports and audits",
            "pricing.ent.f4": "24/7 support",

            // FAQ Section
            "faq.title": "Frequently asked questions",
            "faq.q1": "What liquids can I monitor?",
            "faq.a1":
                "Water, beer, fuels and other liquids compatible with our sensors.",
            "faq.q2": "Do I need constant internet?",
            "faq.a2":
                "Connectivity is required to send data to the cloud; the device stores readings during temporary outages.",
            "faq.q3": "How do alerts work?",
            "faq.a3":
                "Set thresholds by volume, pressure or temperature and receive alerts via email or notifications.",

            // Contact Section
            "contact.title": "Contact Sales",
            "contact.desc":
                "Tell us about your operation and a specialist will contact you.",
            "contact.name": "Name",
            "contact.email": "Email",
            "contact.message": "Message",
            "contact.send": "Send",

            // Footer
            "footer.company": "Company",
            "footer.help": "Get Help",
            "footer.community": "Community",
            "footer.follow": "Follow Us",
            "footer.company.about": "About Us",
            "footer.company.services": "Our Services",
            "footer.company.privacy": "Privacy Policy",
            "footer.company.affiliates": "Affiliate Institutions",
            "footer.help.faq": "FAQ",
            "footer.help.progress": "Progress",
            "footer.help.advisors": "Advisors",
            "footer.help.payments": "Payment Options",
            "footer.community.story": "Our Story",
            "footer.community.developers": "Developers",
            "footer.community.events": "Events",
            "footer.rights": "All rights reserved.",

            // Modal/Signup
            "signup.title": "Create your account",
            "signup.name": "Name",
            "signup.email": "Email",
            "signup.password": "Password",
            "signup.submit": "Create account",

            // Status messages
            "status.signup.invalid":
                "Fill name, email and a password of at least 6 characters.",
            "status.signup.success": "Account created! Check your email to confirm.",
            "status.contact.invalid": "Complete all fields to continue.",
            "status.contact.success": "Message sent. We will reply shortly.",
            "toast.plan": "Plan {plan} selected. Our team will contact you.",
        },

        es: {
            // Navigation
            "nav.product": "Producto",
            "nav.about": "Nosotros",
            "nav.team": "Equipo",
            "nav.solutions": "Soluciones",
            "nav.features": "Funcionalidades",
            "nav.testimonials": "Testimonios",
            "nav.pricing": "Precios",
            "nav.faq": "FAQ",
            "nav.contact": "Contactar Ventas",

            // Hero Section
            "hero.title": "Monitoreo inteligente de líquidos para hogares y empresas",
            "hero.subtitle":
                "Controla volumen, presión, densidad y temperatura en tiempo real con alertas y reportes claros.",
            "cta.getStarted": "Comenzar",
            "cta.learnMore": "Más información",
            "hero.more":
                "Qlic integra sensores de alta precisión con una plataforma en la nube para brindar visibilidad total de tus tanques y líneas. Configura alertas, comparte accesos y exporta datos para auditorías.",
            "hero.badge": "Monitoreo en tiempo real",

            // Trust indicators
            "trust.sensors": "Sensores certificados",
            "trust.uptime": "99.9% disponibilidad",
            "trust.cloud": "Dashboard en la nube",

            // Device readouts
            "readout.volume": "Volumen",
            "readout.pressure": "Presión",
            "readout.temperature": "Temperatura",
            "readout.density": "Densidad",

            // Product Section
            "product.title": "Visibilidad completa de tus líquidos",
            "product.desc":
                "Monitorea tanques y tuberías de líquidos, midiendo volumen, presión y temperatura con paneles claros y alertas configurables.",
            "cards.volumeTitle": "Gestión de Volumen",
            "cards.volumeText":
                "Registra niveles, calcula consumos y predice reabastecimientos.",
            "cards.pressureTitle": "Seguimiento de Presión",
            "cards.pressureText":
                "Detecta variaciones de presión para evitar daños en líneas.",
            "cards.temperatureTitle": "Control de Temperatura",
            "cards.temperatureText":
                "Asegura rangos ideales con alertas inteligentes.",

            // About Section
            "about.title": "Nosotros",
            "about.desc":
                "En Qlic construimos tecnología de sensores y software para brindar visibilidad total del uso de líquidos. Creemos en datos precisos, alertas útiles y simplicidad operativa.",
            "about.missionTitle": "Misión",
            "about.missionText":
                "Hacer que la gestión de líquidos sea predecible y eficiente.",
            "about.reliabilityTitle": "Confiabilidad",
            "about.reliabilityText":
                "Sensores certificados y plataforma con 99.9% de disponibilidad.",
            "about.closenessTitle": "Cercanía",
            "about.closenessText":
                "Soporte humano, implementación guiada y mejoras continuas.",

            // Team Section
            "team.title": "Nuestro equipo",
            "team.desc": "Cinco pilares que impulsan Qlic:",

            // Solutions Section
            "solutions.title": "Soluciones por segmento",
            "solutions.homeTitle": "Residencias",
            "solutions.homeText":
                "Monitorea tanques de líquidos, recibe alertas de bajo nivel y evita fugas.",
            "solutions.businessTitle": "Negocios",
            "solutions.businessText":
                "Controla inventarios de líquidos, auditorías y cumplimiento en industrias.",

            // Features Section
            "features.title": "Funcionalidades clave",
            "features.pressureTitle": "Seguimiento de Presión",
            "features.pressureText":
                "Tendencias y umbrales de seguridad con notificaciones.",
            "features.temperatureTitle": "Control de Temperatura",
            "features.temperatureText":
                "Rangos personalizados y control térmico para calidad.",
            "features.volumeTitle": "Gestión de Volumen",
            "features.volumeText":
                "Proyecciones de consumo y logística de reabastecimiento.",

            // Testimonials Section
            "testimonials.title": "Lo que dicen nuestros clientes",
            "testimonials.desc":
                "Historias reales de equipos que usan Qlic para líquidos.",
            "testimonials.1.quote":
                "Por fin tenemos visibilidad total de nuestros tanques de líquidos. Las alertas evitaron dos cortes el mes pasado.",
            "testimonials.1.name": "Laura P.",
            "testimonials.1.role": "Jefa de instalaciones",
            "testimonials.2.quote":
                "La implementación fue sencilla y los paneles son claros. El soporte también es excelente.",
            "testimonials.2.name": "Daniel R.",
            "testimonials.2.role": "Gerente de Operaciones",
            "testimonials.3.quote":
                "Reducimos el desperdicio de líquidos en 18% tras un trimestre usando Qlic.",
            "testimonials.3.name": "María G.",
            "testimonials.3.role": "Supervisora de planta",

            // Pricing Section
            "pricing.title": "Planes de suscripción",
            "pricing.perMonth": "/mes",
            "pricing.recommended": "Recomendado",
            "pricing.choose": "Elegir plan",
            "pricing.custom": "Personalizado",
            "pricing.basic.f1": "1 tanque",
            "pricing.basic.f2": "Actualización cada 15 min",
            "pricing.basic.f3": "Alertas básicas",
            "pricing.basic.f4": "Soporte por email",
            "pricing.pro.f1": "Hasta 5 tanques",
            "pricing.pro.f2": "Actualización cada 5 min",
            "pricing.pro.f3": "Alertas avanzadas",
            "pricing.pro.f4": "Dashboards compartidos",
            "pricing.pro.f5": "Soporte prioritario",
            "pricing.ent.f1": "Tanques y sitios ilimitados",
            "pricing.ent.f2": "Integraciones y SLAs",
            "pricing.ent.f3": "Exportaciones y auditorías",
            "pricing.ent.f4": "Soporte 24/7",

            // FAQ Section
            "faq.title": "Preguntas frecuentes",
            "faq.q1": "¿Qué líquidos puedo monitorear?",
            "faq.a1":
                "Agua, cerveza, combustibles y otros líquidos compatibles con nuestros sensores.",
            "faq.q2": "¿Necesito internet constante?",
            "faq.a2":
                "Se requiere conectividad para enviar datos a la nube; el dispositivo almacena lecturas si hay cortes temporales.",
            "faq.q3": "¿Cómo funcionan las alertas?",
            "faq.a3":
                "Configura umbrales por volumen, presión o temperatura y recibe alertas por email o notificaciones.",

            // Contact Section
            "contact.title": "Contactar Ventas",
            "contact.desc":
                "Cuéntanos sobre tu operación y un especialista te contactará.",
            "contact.name": "Nombre",
            "contact.email": "Email",
            "contact.message": "Mensaje",
            "contact.send": "Enviar",

            // Footer
            "footer.company": "Compañía",
            "footer.help": "Ayuda",
            "footer.community": "Comunidad",
            "footer.follow": "Síguenos",
            "footer.company.about": "Nosotros",
            "footer.company.services": "Nuestros servicios",
            "footer.company.privacy": "Política de privacidad",
            "footer.company.affiliates": "Instituciones afiliadas",
            "footer.help.faq": "FAQ",
            "footer.help.progress": "Progreso",
            "footer.help.advisors": "Asesores",
            "footer.help.payments": "Opciones de pago",
            "footer.community.story": "Nuestra historia",
            "footer.community.developers": "Desarrolladores",
            "footer.community.events": "Eventos",
            "footer.rights": "Todos los derechos reservados.",

            // Modal/Signup
            "signup.title": "Crea tu cuenta",
            "signup.name": "Nombre",
            "signup.email": "Email",
            "signup.password": "Contraseña",
            "signup.submit": "Crear cuenta",

            // Status messages
            "status.signup.invalid":
                "Completa nombre, email y una contraseña de al menos 6 caracteres.",
            "status.signup.success":
                "¡Cuenta creada! Revisa tu email para confirmar.",
            "status.contact.invalid": "Completa todos los campos para continuar.",
            "status.contact.success": "Mensaje enviado. Te responderemos en breve.",
            "toast.plan": "Plan {plan} seleccionado. Nuestro equipo te contactará.",
        },
    };

    // Language utilities
    function getCurrentLanguage() {
        return localStorage.getItem("qlic_lang") || "en";
    }

    function setText(selector, text) {
        const el = document.querySelector(selector);
        if (el && typeof text === "string") el.textContent = text;
    }

    // Apply translations to all page elements
    function applyLanguage(lang) {
        const tr = translations[lang];
        if (!tr) return;

        // Header/Navigation
        setText('a[href="#product"]', tr["nav.product"]);
        setText('a[href="#about"]', tr["nav.about"]);
        setText('a[href="#team"]', tr["nav.team"]);
        setText('a[href="#solutions"]', tr["nav.solutions"]);
        setText('a[href="#features"]', tr["nav.features"]);
        setText('a[href="#testimonials"]', tr["nav.testimonials"]);
        setText('a[href="#pricing"]', tr["nav.pricing"]);
        setText('a[href="#faq"]', tr["nav.faq"]);
        setText('a[href="#contact"].btn', tr["nav.contact"]);

        // Hero Section
        setText(".hero-title", tr["hero.title"]);
        setText(".hero-subtitle", tr["hero.subtitle"]);
        setText("#btn-get-started", tr["cta.getStarted"]);
        setText("#btn-learn-more", tr["cta.learnMore"]);
        const learnP = document.querySelector("#learn-more-panel p");
        if (learnP) learnP.textContent = tr["hero.more"];
        setText(".badge-live", tr["hero.badge"]);

        // Trust indicators - CORREGIDO CON MÚLTIPLES SELECTORES
        // Intenta diferentes selectores comunes para los trust indicators
        setText(".trust-row li:nth-child(1)", tr["trust.sensors"]);
        setText(".trust-row li:nth-child(2)", tr["trust.uptime"]);
        setText(".trust-row li:nth-child(3)", tr["trust.cloud"]);

        // Selectores alternativos en caso de que la estructura sea diferente
        setText(".trust-indicators li:nth-child(1)", tr["trust.sensors"]);
        setText(".trust-indicators li:nth-child(2)", tr["trust.uptime"]);
        setText(".trust-indicators li:nth-child(3)", tr["trust.cloud"]);

        // Más selectores alternativos
        setText(".trust-list li:nth-child(1)", tr["trust.sensors"]);
        setText(".trust-list li:nth-child(2)", tr["trust.uptime"]);
        setText(".trust-list li:nth-child(3)", tr["trust.cloud"]);

        // Por clases específicas si las tienes
        setText(".trust-sensors", tr["trust.sensors"]);
        setText(".trust-uptime", tr["trust.uptime"]);
        setText(".trust-cloud", tr["trust.cloud"]);

        // Por contenido específico (más agresivo)
        const trustItems = document.querySelectorAll('.trust-row li, .trust-indicators li, .trust-list li, .hero-stats li');
        trustItems.forEach(item => {
            const text = item.textContent?.trim();
            if (text?.includes('Certified') || text?.includes('sensors')) {
                item.textContent = tr["trust.sensors"];
            } else if (text?.includes('99.9%') || text?.includes('uptime')) {
                item.textContent = tr["trust.uptime"];
            } else if (text?.includes('Cloud') || text?.includes('dashboard')) {
                item.textContent = tr["trust.cloud"];
            }
        });

        // Device readouts
        setText(
            ".device-readouts .readout:nth-child(1) span",
            tr["readout.volume"]
        );
        setText(
            ".device-readouts .readout:nth-child(2) span",
            tr["readout.pressure"]
        );
        setText(
            ".device-readouts .readout:nth-child(3) span",
            tr["readout.temperature"]
        );
        setText(
            ".device-readouts .readout:nth-child(4) span",
            tr["readout.density"]
        );

        // Product Section
        setText("#product .section-title", tr["product.title"]);
        setText("#product .section-desc", tr["product.desc"]);
        setText(
            "#product .metric-card:nth-child(1) .metric-title",
            tr["cards.volumeTitle"]
        );
        setText(
            "#product .metric-card:nth-child(1) .metric-text",
            tr["cards.volumeText"]
        );
        setText(
            "#product .metric-card:nth-child(2) .metric-title",
            tr["cards.pressureTitle"]
        );
        setText(
            "#product .metric-card:nth-child(2) .metric-text",
            tr["cards.pressureText"]
        );
        setText(
            "#product .metric-card:nth-child(3) .metric-title",
            tr["cards.temperatureTitle"]
        );
        setText(
            "#product .metric-card:nth-child(3) .metric-text",
            tr["cards.temperatureText"]
        );

        // About Section
        setText("#about .section-title", tr["about.title"]);
        setText("#about .section-desc", tr["about.desc"]);
        setText(
            "#about .points-grid .point-card:nth-child(1) .point-title",
            tr["about.missionTitle"]
        );
        setText(
            "#about .points-grid .point-card:nth-child(1) .point-text",
            tr["about.missionText"]
        );
        setText(
            "#about .points-grid .point-card:nth-child(2) .point-title",
            tr["about.reliabilityTitle"]
        );
        setText(
            "#about .points-grid .point-card:nth-child(2) .point-text",
            tr["about.reliabilityText"]
        );
        setText(
            "#about .points-grid .point-card:nth-child(3) .point-title",
            tr["about.closenessTitle"]
        );
        setText(
            "#about .points-grid .point-card:nth-child(3) .point-text",
            tr["about.closenessText"]
        );

        // Team Section
        setText("#team .section-title", tr["team.title"]);
        setText("#team .section-desc", tr["team.desc"]);

        // Solutions Section
        setText("#solutions .section-title", tr["solutions.title"]);
        setText(
            "#solutions .solution-card:nth-child(1) .solution-title",
            tr["solutions.homeTitle"]
        );
        setText(
            "#solutions .solution-card:nth-child(1) .solution-text",
            tr["solutions.homeText"]
        );
        setText(
            "#solutions .solution-card:nth-child(2) .solution-title",
            tr["solutions.businessTitle"]
        );
        setText(
            "#solutions .solution-card:nth-child(2) .solution-text",
            tr["solutions.businessText"]
        );

        // Features Section
        setText("#features .section-title", tr["features.title"]);
        setText(
            "#features .feature-card:nth-child(1) .feature-title",
            tr["features.pressureTitle"]
        );
        setText(
            "#features .feature-card:nth-child(1) .feature-text",
            tr["features.pressureText"]
        );
        setText(
            "#features .feature-card:nth-child(2) .feature-title",
            tr["features.temperatureTitle"]
        );
        setText(
            "#features .feature-card:nth-child(2) .feature-text",
            tr["features.temperatureText"]
        );
        setText(
            "#features .feature-card:nth-child(3) .feature-title",
            tr["features.volumeTitle"]
        );
        setText(
            "#features .feature-card:nth-child(3) .feature-text",
            tr["features.volumeText"]
        );

        // Testimonials Section
        setText("#testimonials .section-title", tr["testimonials.title"]);
        setText("#testimonials .section-desc", tr["testimonials.desc"]);
        setText(
            "#testimonials .testimonial-card:nth-child(1) .quote",
            tr["testimonials.1.quote"]
        );
        setText(
            "#testimonials .testimonial-card:nth-child(1) .author",
            tr["testimonials.1.name"]
        );
        setText(
            "#testimonials .testimonial-card:nth-child(1) .role",
            tr["testimonials.1.role"]
        );
        setText(
            "#testimonials .testimonial-card:nth-child(2) .quote",
            tr["testimonials.2.quote"]
        );
        setText(
            "#testimonials .testimonial-card:nth-child(2) .author",
            tr["testimonials.2.name"]
        );
        setText(
            "#testimonials .testimonial-card:nth-child(2) .role",
            tr["testimonials.2.role"]
        );
        setText(
            "#testimonials .testimonial-card:nth-child(3) .quote",
            tr["testimonials.3.quote"]
        );
        setText(
            "#testimonials .testimonial-card:nth-child(3) .author",
            tr["testimonials.3.name"]
        );
        setText(
            "#testimonials .testimonial-card:nth-child(3) .role",
            tr["testimonials.3.role"]
        );

        // Pricing Section
        setText("#pricing .section-title", tr["pricing.title"]);
        setText(
            "#pricing .price-card:nth-child(1) .price-period",
            tr["pricing.perMonth"]
        );
        setText(
            "#pricing .price-card:nth-child(1) .price-features li:nth-child(1)",
            tr["pricing.basic.f1"]
        );
        setText(
            "#pricing .price-card:nth-child(1) .price-features li:nth-child(2)",
            tr["pricing.basic.f2"]
        );
        setText(
            "#pricing .price-card:nth-child(1) .price-features li:nth-child(3)",
            tr["pricing.basic.f3"]
        );
        setText(
            "#pricing .price-card:nth-child(1) .price-features li:nth-child(4)",
            tr["pricing.basic.f4"]
        );
        setText(
            "#pricing .price-card:nth-child(1) .choose-plan",
            tr["pricing.choose"]
        );

        setText(
            "#pricing .price-card:nth-child(2) .ribbon",
            tr["pricing.recommended"]
        );
        setText(
            "#pricing .price-card:nth-child(2) .price-period",
            tr["pricing.perMonth"]
        );
        setText(
            "#pricing .price-card:nth-child(2) .price-features li:nth-child(1)",
            tr["pricing.pro.f1"]
        );
        setText(
            "#pricing .price-card:nth-child(2) .price-features li:nth-child(2)",
            tr["pricing.pro.f2"]
        );
        setText(
            "#pricing .price-card:nth-child(2) .price-features li:nth-child(3)",
            tr["pricing.pro.f3"]
        );
        setText(
            "#pricing .price-card:nth-child(2) .price-features li:nth-child(4)",
            tr["pricing.pro.f4"]
        );
        setText(
            "#pricing .price-card:nth-child(2) .price-features li:nth-child(5)",
            tr["pricing.pro.f5"]
        );
        setText(
            "#pricing .price-card:nth-child(2) .choose-plan",
            tr["pricing.choose"]
        );

        setText(
            "#pricing .price-card:nth-child(3) .price-amount",
            tr["pricing.custom"]
        );
        setText(
            "#pricing .price-card:nth-child(3) .price-features li:nth-child(1)",
            tr["pricing.ent.f1"]
        );
        setText(
            "#pricing .price-card:nth-child(3) .price-features li:nth-child(2)",
            tr["pricing.ent.f2"]
        );
        setText(
            "#pricing .price-card:nth-child(3) .price-features li:nth-child(3)",
            tr["pricing.ent.f3"]
        );
        setText(
            "#pricing .price-card:nth-child(3) .price-features li:nth-child(4)",
            tr["pricing.ent.f4"]
        );
        setText(
            "#pricing .price-card:nth-child(3) .choose-plan",
            tr["pricing.choose"]
        );

        // FAQ Section
        setText("#faq .section-title", tr["faq.title"]);
        setText("#faq .faq-item:nth-child(1) summary", tr["faq.q1"]);
        setText("#faq .faq-item:nth-child(1) .faq-answer", tr["faq.a1"]);
        setText("#faq .faq-item:nth-child(2) summary", tr["faq.q2"]);
        setText("#faq .faq-item:nth-child(2) .faq-answer", tr["faq.a2"]);
        setText("#faq .faq-item:nth-child(3) summary", tr["faq.q3"]);
        setText("#faq .faq-item:nth-child(3) .faq-answer", tr["faq.a3"]);

        // Contact Section
        setText("#contact .section-title", tr["contact.title"]);
        setText("#contact .section-desc", tr["contact.desc"]);
        setText('label[for="contact-name"]', tr["contact.name"]);
        setText('label[for="contact-email"]', tr["contact.email"]);
        setText('label[for="contact-message"]', tr["contact.message"]);
        setText('#contact button[type="submit"]', tr["contact.send"]);

        // Footer
        setText(
            ".footer-grid .footer-col:nth-child(1) .footer-title",
            tr["footer.company"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(2) .footer-title",
            tr["footer.help"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(3) .footer-title",
            tr["footer.community"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(4) .footer-title",
            tr["footer.follow"]
        );

        setText(
            ".footer-grid .footer-col:nth-child(1) .footer-links li:nth-child(1) a",
            tr["footer.company.about"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(2) .footer-links li:nth-child(2) a",
            tr["footer.company.services"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(1) .footer-links li:nth-child(3) a",
            tr["footer.company.privacy"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(1) .footer-links li:nth-child(4) a",
            tr["footer.company.affiliates"]
        );

        setText(
            ".footer-grid .footer-col:nth-child(2) .footer-links li:nth-child(1) a",
            tr["footer.help.faq"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(2) .footer-links li:nth-child(2) a",
            tr["footer.help.progress"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(2) .footer-links li:nth-child(3) a",
            tr["footer.help.advisors"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(2) .footer-links li:nth-child(4) a",
            tr["footer.help.payments"]
        );

        setText(
            ".footer-grid .footer-col:nth-child(3) .footer-links li:nth-child(1) a",
            tr["footer.community.story"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(3) .footer-links li:nth-child(2) a",
            tr["footer.community.developers"]
        );
        setText(
            ".footer-grid .footer-col:nth-child(3) .footer-links li:nth-child(3) a",
            tr["footer.community.events"]
        );

        const rights = document.querySelector(".footer-copy");
        if (rights)
            rights.innerHTML = `© <span id="year"></span> Qlic. ${tr["footer.rights"]}`;

        // Modal/Signup
        setText("#modal-title", tr["signup.title"]);
        setText('label[for="signup-name"]', tr["signup.name"]);
        setText('label[for="signup-email"]', tr["signup.email"]);
        setText('label[for="signup-password"]', tr["signup.password"]);
        setText('#signup-form button[type="submit"]', tr["signup.submit"]);

        // Mobile CTA
        setText("#mobile-cta", tr["cta.getStarted"]);

        // Update language button
        const langBtn = $("#lang-toggle");
        if (langBtn) langBtn.textContent = lang.toUpperCase();

        // Save language preference
        localStorage.setItem("qlic_lang", lang);
        document.documentElement.setAttribute("lang", lang);
    }

    // Language toggle functionality
    function initLanguageToggle() {
        const langBtn = $("#lang-toggle");
        const currentLang = getCurrentLanguage();

        // Apply initial language
        applyLanguage(currentLang);

        langBtn?.addEventListener("click", () => {
            const nextLang = getCurrentLanguage() === "en" ? "es" : "en";
            applyLanguage(nextLang);

            // Update year in footer
            const yearEl = $("#year");
            if (yearEl) yearEl.textContent = String(new Date().getFullYear());
        });
    }


    function initFooter() {
        const yearEl = $("#year");
        if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    }

    function init() {
        // Header & Navigation
        initMobileNav();
        initSmoothScroll();
        initHeaderScroll();
        initActiveSection();

        // Hero Section
        initLearnMore();
        initSignupModal();

        // Forms
        initSignupForm();
        initContactForm();

        // Pricing
        initPricingPlans();

        // Language & Footer
        initLanguageToggle();
        initFooter();
    }

    // Start everything when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();