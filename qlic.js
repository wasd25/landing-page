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
