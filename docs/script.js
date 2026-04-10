document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const mobileMenu = document.getElementById("mobile-menu");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll("nav a");

  function updateHeaderOnScroll() {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function closeMenu() {
    if (!mobileMenu || !nav) return;
    mobileMenu.classList.remove("active");
    nav.classList.remove("active");
    mobileMenu.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (mobileMenu && nav) {
    mobileMenu.addEventListener("click", () => {
      const isActive = mobileMenu.classList.toggle("active");
      nav.classList.toggle("active");
      mobileMenu.setAttribute("aria-expanded", String(isActive));
      document.body.classList.toggle("menu-open", isActive);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    }
  });

  const desktopLightboxMedia = window.matchMedia("(min-width: 861px)");
  const lightboxImages = document.querySelectorAll(".gallery-card img");

  function createLightbox() {
    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.setAttribute("aria-hidden", "true");

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "lightbox-close";
    closeButton.setAttribute("aria-label", "Fechar imagem");
    closeButton.innerHTML = "&times;";

    const image = document.createElement("img");
    image.alt = "";

    overlay.appendChild(closeButton);
    overlay.appendChild(image);
    document.body.appendChild(overlay);

    function closeLightbox() {
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");
      image.removeAttribute("src");
      image.removeAttribute("alt");
    }

    function openLightbox(sourceImage) {
      image.src = sourceImage.currentSrc || sourceImage.src;
      image.alt = sourceImage.alt || "";
      overlay.classList.add("active");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("menu-open");
    }

    closeButton.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && overlay.classList.contains("active")) {
        closeLightbox();
      }
    });

    desktopLightboxMedia.addEventListener("change", (event) => {
      if (!event.matches && overlay.classList.contains("active")) {
        closeLightbox();
      }
    });

    return { openLightbox };
  }

  if (lightboxImages.length) {
    const { openLightbox } = createLightbox();

    lightboxImages.forEach((image) => {
      image.classList.add("lightbox-enabled");
      image.addEventListener("click", (event) => {
        if (!desktopLightboxMedia.matches) return;
        event.preventDefault();
        openLightbox(image);
      });
    });
  }

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);
});
