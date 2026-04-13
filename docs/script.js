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

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);
});
