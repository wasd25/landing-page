function initPricingPlans() {
    const toast = $("#plan-toast");

    $$(".choose-plan").forEach((btn) => {
        btn.addEventListener("click", () => {
            const plan = btn.getAttribute("data-plan") || "";

            if (!toast) return;
            toast.textContent = `Has elegido el plan ${plan}`;
            toast.hidden = false;

            setTimeout(() => {
                toast.hidden = true;
            }, 2000);
        });
    });
}
