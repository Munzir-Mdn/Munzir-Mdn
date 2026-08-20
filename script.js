const revealElements = document.querySelectorAll(".reveal");
const parallaxElements = document.querySelectorAll("[data-speed]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => observer.observe(element));

function updateParallax() {
  if (prefersReducedMotion) return;

  const scrollY = window.scrollY;

  parallaxElements.forEach((element) => {
    const speed = Number(element.dataset.speed || 0);
    const rect = element.parentElement.getBoundingClientRect();
    const relativeY = scrollY + rect.top;
    const movement = (scrollY - relativeY) * speed;

    element.style.transform = `translate3d(0, ${movement}px, 0)`;
  });
}

window.addEventListener("scroll", updateParallax, { passive: true });
updateParallax();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
