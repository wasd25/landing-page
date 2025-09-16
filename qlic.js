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