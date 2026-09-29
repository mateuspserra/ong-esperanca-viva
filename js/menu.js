document.querySelectorAll(".navegacao").forEach((nav) => {
  const menuButton = nav.querySelector(".menu-toggle");
  const submenuButtons = nav.querySelectorAll(".submenu-toggle");

  const closeSubmenus = () => {
    submenuButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.closest(".tem-submenu")?.classList.remove("submenu-aberto");
    });
  };

  const closeMenu = () => {
    nav.classList.remove("menu-aberto");
    menuButton?.setAttribute("aria-expanded", "false");
    closeSubmenus();
  };

  menuButton?.addEventListener("click", () => {
    const open = nav.classList.toggle("menu-aberto");
    menuButton.setAttribute("aria-expanded", String(open));

    if (!open) {
      closeSubmenus();
    }
  });

  submenuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".tem-submenu");
      const open = !item.classList.contains("submenu-aberto");

      closeSubmenus();

      if (open) {
        item.classList.add("submenu-aberto");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton?.focus();
    }
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", closeMenu);
});
