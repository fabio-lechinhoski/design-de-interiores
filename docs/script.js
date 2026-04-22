document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const mobileMenu = document.getElementById("mobile-menu");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll("nav a");

  function updateHeaderOnScroll() {
    if (!header) return;
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

  const lightboxTargets = document.querySelectorAll('.project-link-image img, .gallery-card img');

  if (lightboxTargets.length) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Fechar imagem');
    closeButton.innerHTML = '&times;';

    const lightboxImage = document.createElement('img');
    lightboxImage.alt = '';

    overlay.appendChild(closeButton);
    overlay.appendChild(lightboxImage);
    document.body.appendChild(overlay);

    function openLightbox(src, alt) {
      lightboxImage.src = src;
      lightboxImage.alt = alt || '';
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    }

    function closeLightbox() {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      lightboxImage.src = '';
      lightboxImage.alt = '';
      document.body.classList.remove('menu-open');
    }

    lightboxTargets.forEach((image) => {
      image.addEventListener('click', (event) => {
        event.preventDefault();
        openLightbox(image.currentSrc || image.src, image.alt);
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);
});
