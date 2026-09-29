export function inicializarMenu() {
  document.querySelectorAll(".navegacao").forEach((nav) => {
    const menuButton = nav.querySelector(".menu-toggle");
    const submenuButtons = nav.querySelectorAll(".submenu-toggle");

    const fecharSubmenus = () => {
      submenuButtons.forEach((button) => {
        button.setAttribute("aria-expanded", "false");
        button.closest(".tem-submenu")?.classList.remove("submenu-aberto");
      });
    };

    const fecharMenu = () => {
      nav.classList.remove("menu-aberto");
      menuButton?.setAttribute("aria-expanded", "false");
      fecharSubmenus();
    };

    menuButton?.addEventListener("click", () => {
      const aberto = nav.classList.toggle("menu-aberto");
      menuButton.setAttribute("aria-expanded", String(aberto));

      if (!aberto) {
        fecharSubmenus();
      }
    });

    submenuButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.closest(".tem-submenu");
        const aberto = !item.classList.contains("submenu-aberto");

        fecharSubmenus();

        if (aberto) {
          item.classList.add("submenu-aberto");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
          fecharMenu();
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        fecharMenu();
        menuButton?.focus();
      }
    });

    window.matchMedia("(min-width: 768px)").addEventListener("change", fecharMenu);
  });
}
