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

  document.addEventListener("click", (event) => {
    if (
      nav &&
      mobileMenu &&
      nav.classList.contains("active") &&
      !nav.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav && nav.classList.contains("active")) {
      closeMenu();
    }
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

  const projectSections = Array.from(document.querySelectorAll(".project-detail-section"));
  const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const quickNavContainer = document.getElementById("quick-nav-links");

  if (projectSections.length && (filterButtons.length || quickNavContainer)) {
    // Garante que qualquer nova seção de projeto tenha link na barra rápida automaticamente
    if (quickNavContainer) {
      projectSections.forEach((section) => {
        const id = section.id;
        if (!id) return;
        const existingLink = quickNavContainer.querySelector(`[data-project-target="${id}"], a[href="#${id}"]`);
        if (!existingLink) {
          const heading = section.querySelector(".project-header-title h2, h2");
          const title = section.dataset.title || (heading ? heading.textContent.trim() : id);
          const category = section.dataset.category || "";
          const link = document.createElement("a");
          link.href = `#${id}`;
          link.className = "quick-nav-link";
          link.dataset.projectTarget = id;
          link.dataset.category = category;
          link.textContent = title;
          quickNavContainer.appendChild(link);
        }
      });
    }

    const quickNavLinks = Array.from(document.querySelectorAll(".quick-nav-link"));

    // Atualiza contadores das categorias dinamicamente
    const countBadges = document.querySelectorAll("[data-count-for]");
    countBadges.forEach((badge) => {
      const cat = badge.dataset.countFor;
      if (cat === "all") {
        badge.textContent = String(projectSections.length);
      } else {
        const count = projectSections.filter((sec) => sec.dataset.category === cat).length;
        badge.textContent = String(count);
      }
    });

    function applyFilter(filterValue) {
      filterButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === filterValue);
      });

      let visibleIndex = 0;
      projectSections.forEach((section) => {
        const category = section.dataset.category || "";
        const matches = filterValue === "all" || category === filterValue;
        section.classList.toggle("is-hidden", !matches);

        if (matches) {
          // Alterna fundo suave (.section-soft) automaticamente entre os projetos visíveis
          section.classList.toggle("section-soft", visibleIndex % 2 === 1);
          visibleIndex++;
        }
      });

      quickNavLinks.forEach((link) => {
        const linkCategory = link.dataset.category || "";
        const matches = filterValue === "all" || linkCategory === filterValue;
        link.classList.toggle("is-hidden", !matches);
      });

      updateActiveQuickNavOnScroll();
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filterValue = button.dataset.filter || "all";
        applyFilter(filterValue);
      });
    });

    quickNavLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.dataset.projectTarget || (link.getAttribute("href") || "").replace("#", "");
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        if (targetSection.classList.contains("is-hidden")) {
          applyFilter("all");
        }

        event.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${targetId}`);
      });
    });

    function updateActiveQuickNavOnScroll() {
      if (!quickNavLinks.length) return;
      const scrollPosition = window.scrollY + 220;
      let currentId = "";

      projectSections.forEach((section) => {
        if (section.classList.contains("is-hidden")) return;
        if (section.offsetTop <= scrollPosition) {
          currentId = section.id;
        }
      });

      if (!currentId) {
        const firstVisible = projectSections.find((sec) => !sec.classList.contains("is-hidden"));
        if (firstVisible) currentId = firstVisible.id;
      }

      quickNavLinks.forEach((link) => {
        const targetId = link.dataset.projectTarget || (link.getAttribute("href") || "").replace("#", "");
        link.classList.toggle("active", targetId === currentId);
      });
    }

    window.addEventListener("scroll", updateActiveQuickNavOnScroll);
    updateActiveQuickNavOnScroll();
  }

  const lightboxTargets = Array.from(document.querySelectorAll(".gallery-card img"));

  if (lightboxTargets.length) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const closeButton = document.createElement("button");
    closeButton.className = "lightbox-close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Fechar galeria");
    closeButton.innerHTML = "&times;";

    const prevButton = document.createElement("button");
    prevButton.className = "lightbox-nav lightbox-prev";
    prevButton.type = "button";
    prevButton.setAttribute("aria-label", "Imagem anterior");
    prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    const nextButton = document.createElement("button");
    nextButton.className = "lightbox-nav lightbox-next";
    nextButton.type = "button";
    nextButton.setAttribute("aria-label", "Próxima imagem");
    nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

    const stage = document.createElement("div");
    stage.className = "lightbox-stage";

    const lightboxImage = document.createElement("img");
    lightboxImage.alt = "";

    const infoBar = document.createElement("div");
    infoBar.className = "lightbox-bar";

    const captionBox = document.createElement("div");
    captionBox.className = "lightbox-caption";

    const counterBox = document.createElement("span");
    counterBox.className = "lightbox-counter";

    infoBar.appendChild(captionBox);
    infoBar.appendChild(counterBox);

    stage.appendChild(lightboxImage);
    stage.appendChild(infoBar);

    overlay.appendChild(closeButton);
    overlay.appendChild(prevButton);
    overlay.appendChild(stage);
    overlay.appendChild(nextButton);
    document.body.appendChild(overlay);

    let currentGroup = [];
    let currentIndex = 0;
    let touchStartX = 0;

    function getCaptionForImage(img) {
      const card = img.closest(".gallery-card");
      const section = img.closest(".project-detail-section");
      const projectTitleEl = section ? section.querySelector(".project-header-title h2, h2") : null;
      const projectTitle = projectTitleEl ? projectTitleEl.textContent.trim() : "";

      if (card) {
        const captionTitleEl = card.querySelector(".gallery-caption h3");
        if (captionTitleEl) {
          const subtitle = captionTitleEl.textContent.trim();
          return projectTitle ? `${projectTitle} — ${subtitle}` : subtitle;
        }
      }
      return img.alt || projectTitle || "";
    }

    function renderLightboxSlide(index) {
      if (!currentGroup.length) return;
      currentIndex = (index + currentGroup.length) % currentGroup.length;
      const targetImg = currentGroup[currentIndex];
      lightboxImage.src = targetImg.currentSrc || targetImg.src;
      lightboxImage.alt = targetImg.alt || "";
      captionBox.textContent = getCaptionForImage(targetImg);
      counterBox.textContent = `${currentIndex + 1} / ${currentGroup.length}`;

      const hasMultiple = currentGroup.length > 1;
      prevButton.style.display = hasMultiple ? "grid" : "none";
      nextButton.style.display = hasMultiple ? "grid" : "none";
    }

    function openLightboxFromImage(clickedImg) {
      const parentProject = clickedImg.closest(".project-detail-section");
      currentGroup = parentProject
        ? Array.from(parentProject.querySelectorAll(".gallery-card img"))
        : lightboxTargets;

      const startIndex = Math.max(0, currentGroup.indexOf(clickedImg));
      renderLightboxSlide(startIndex);
      overlay.classList.add("active");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("menu-open");
    }

    function closeLightbox() {
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
      lightboxImage.src = "";
      lightboxImage.alt = "";
      document.body.classList.remove("menu-open");
    }

    lightboxTargets.forEach((image) => {
      image.addEventListener("click", (event) => {
        event.preventDefault();
        openLightboxFromImage(image);
      });
    });

    prevButton.addEventListener("click", (event) => {
      event.stopPropagation();
      renderLightboxSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", (event) => {
      event.stopPropagation();
      renderLightboxSlide(currentIndex + 1);
    });

    closeButton.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay || event.target === stage) {
        closeLightbox();
      }
    });

    overlay.addEventListener(
      "touchstart",
      (event) => {
        if (event.changedTouches && event.changedTouches.length) {
          touchStartX = event.changedTouches[0].screenX;
        }
      },
      { passive: true }
    );

    overlay.addEventListener(
      "touchend",
      (event) => {
        if (!overlay.classList.contains("active") || currentGroup.length <= 1) return;
        if (event.changedTouches && event.changedTouches.length) {
          const deltaX = event.changedTouches[0].screenX - touchStartX;
          if (Math.abs(deltaX) > 45) {
            if (deltaX < 0) {
              renderLightboxSlide(currentIndex + 1);
            } else {
              renderLightboxSlide(currentIndex - 1);
            }
          }
        }
      },
      { passive: true }
    );

    document.addEventListener("keydown", (event) => {
      if (!overlay.classList.contains("active")) return;
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        renderLightboxSlide(currentIndex + 1);
      } else if (event.key === "ArrowLeft") {
        renderLightboxSlide(currentIndex - 1);
      }
    });
  }

  // Máscara e Envio Funcional do Formulário de Contato
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const phoneInput = contactForm.querySelector('input[name="telefone"]');
    const submitBtn = document.getElementById("contact-submit-btn");
    const feedbackBox = document.getElementById("form-feedback");

    if (phoneInput) {
      phoneInput.addEventListener("input", (event) => {
        let digits = event.target.value.replace(/\D/g, "").slice(0, 11);
        if (digits.length > 6) {
          const part1 = digits.slice(0, 2);
          const isNineDigit = digits.length === 11;
          const part2 = digits.slice(2, isNineDigit ? 7 : 6);
          const part3 = digits.slice(isNineDigit ? 7 : 6);
          event.target.value = `(${part1}) ${part2}-${part3}`;
        } else if (digits.length > 2) {
          event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        } else if (digits.length > 0) {
          event.target.value = `(${digits}`;
        }
      });
    }

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const nome = (formData.get("nome") || "").toString().trim();
      const email = (formData.get("email") || "").toString().trim();
      const telefone = (formData.get("telefone") || "Não informado").toString().trim();
      const assunto = (formData.get("assunto") || "Atendimento geral").toString().trim();
      const mensagem = (formData.get("mensagem") || "").toString().trim();

      const originalBtnText = submitBtn ? submitBtn.innerHTML : "Enviar mensagem";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Enviando...";
      }
      if (feedbackBox) {
        feedbackBox.className = "form-feedback";
        feedbackBox.textContent = "";
      }

      try {
        const response = await fetch("https://formsubmit.co/ajax/fabio.lechinhoski@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            Nome: nome,
            Email: email,
            Telefone: telefone,
            Assunto: assunto,
            Mensagem: mensagem,
            _subject: `Contato Portfólio: ${assunto} — ${nome}`,
          }),
        });

        const result = await response.json();
        if (response.ok && (result.success === "true" || result.success === true)) {
          if (feedbackBox) {
            feedbackBox.className = "form-feedback is-success";
            feedbackBox.innerHTML =
              "<strong>Mensagem enviada com sucesso!</strong> Retornarei o seu contato em breve.";
          }
          contactForm.reset();
        } else {
          throw new Error("Fallback para cliente de e-mail");
        }
      } catch (_err) {
        const mailSubject = encodeURIComponent(`Projeto de Interiores (${assunto}) — ${nome}`);
        const mailBody = encodeURIComponent(
          `Olá, Fábio!\n\nNome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nAssunto: ${assunto}\n\nMensagem:\n${mensagem}`
        );
        window.location.href = `mailto:fabio.lechinhoski@gmail.com?subject=${mailSubject}&body=${mailBody}`;

        if (feedbackBox) {
          feedbackBox.className = "form-feedback is-success";
          feedbackBox.innerHTML =
            'Preparamos sua mensagem no seu aplicativo de e-mail! Se preferir atendimento imediato, <a href="https://bit.ly/3cHmS3p" target="_blank" rel="noopener">clique aqui para chamar no WhatsApp</a>.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  // Animação suave de entrada ao rolar a página (Scroll Reveal)
  const revealCandidates = document.querySelectorAll(
    ".project-card, .service-card, .process-card, .gallery-card, .project-detail-header, .cta-banner, .contact-info-box, .contact-form-box, .split-layout > div"
  );

  if ("IntersectionObserver" in window && revealCandidates.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    revealCandidates.forEach((el, index) => {
      el.classList.add("reveal-item");
      el.style.transitionDelay = `${(index % 4) * 60}ms`;
      revealObserver.observe(el);
    });
  }

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);
});
