function initPricingPlans() {
    const buttons = $$(".choose-plan");
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            console.log("Plan seleccionado:", btn.getAttribute("data-plan"));
        });
    });
}
