document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const hamburger = document.querySelector(".hamburger");
  const dropdownItems = document.querySelectorAll(".has-dropdown");

  /* Mobile menu open/close */
  if (hamburger && menu) {
    hamburger.setAttribute("aria-expanded", "false");

    hamburger.addEventListener("click", () => {
      menu.classList.toggle("open");

      const isOpen = menu.classList.contains("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* Mobile dropdown menu */
  dropdownItems.forEach((item) => {
    const parentLink = item.querySelector("a");

    if (parentLink) {
      parentLink.addEventListener("click", (e) => {
        if (window.innerWidth <= 980) {
          e.preventDefault();

          dropdownItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("open");
            }
          });

          item.classList.toggle("open");
        }
      });
    }
  });

  /* Active page link */
  const currentPage = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".menu a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");

      const parentDropdown = link.closest(".has-dropdown");
      if (parentDropdown) {
        const parentMainLink = parentDropdown.querySelector(":scope > a");
        parentMainLink?.classList.add("active");
      }
    }
  });

  /* Close mobile menu when normal link is clicked */
  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      const isDropdownParent = link.parentElement?.classList.contains("has-dropdown");

      if (window.innerWidth <= 980 && !isDropdownParent) {
        menu?.classList.remove("open");
        hamburger?.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* Tabs */
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      document.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.remove("active");
      });

      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.remove("active");
      });

      btn.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.closest(".faq-item");

      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("open");
        }
      });

      faqItem?.classList.toggle("open");
    });
  });

  /* Course search and filter */
  const courseSearch = document.getElementById("courseSearch");
  const courseFilter = document.getElementById("courseFilter");

  const filterCourses = () => {
    const searchTerm = (courseSearch?.value || "").toLowerCase();
    const selectedCategory = courseFilter?.value || "all";

    document.querySelectorAll(".course-item").forEach((item) => {
      const courseText = item.textContent.toLowerCase();
      const courseCategory = item.dataset.category;

      const matchesSearch = courseText.includes(searchTerm);
      const matchesCategory =
        selectedCategory === "all" || courseCategory === selectedCategory;

      item.style.display = matchesSearch && matchesCategory ? "" : "none";
    });
  };

  courseSearch?.addEventListener("input", filterCourses);
  courseFilter?.addEventListener("change", filterCourses);

  /* Contact form message */
  const contactForm = document.getElementById("contactForm");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const formMessage = document.querySelector(".form-message");

    if (formMessage) {
      formMessage.textContent =
        "Thank you. Your enquiry is ready to be sent. Please connect this form to your email or booking system when publishing.";
      formMessage.style.color = "#111";
    }

    contactForm.reset();
  });

  /* Back to top button */
  const backTop = document.querySelector(".back-top");

  window.addEventListener("scroll", () => {
    backTop?.classList.toggle("show", window.scrollY > 500);
  });

  backTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* Reveal animation */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* Reset dropdowns when resizing back to desktop */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      menu?.classList.remove("open");
      hamburger?.setAttribute("aria-expanded", "false");

      dropdownItems.forEach((item) => {
        item.classList.remove("open");
      });
    }
  });
});
