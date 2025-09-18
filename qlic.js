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
