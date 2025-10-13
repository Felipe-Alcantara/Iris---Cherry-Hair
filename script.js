const WHATSAPP_NUMBER = "5524998341801"; // Altere aqui caso o número do WhatsApp mude no futuro.
const WHATSAPP_MESSAGE_TEMPLATE =
  "Olá, sou cliente do site e quero agendar: [SERVIÇO]. Meu nome: [NOME]. Data preferida: [DATA].";

const servicesGrid = document.getElementById("services-grid");
const testimonialsList = document.getElementById("testimonials-list");
const yearDisplay = document.getElementById("year");
let animationObserver;

function buildWhatsappLink(serviceTitle = "") {
  const message = WHATSAPP_MESSAGE_TEMPLATE.replace("[SERVIÇO]", serviceTitle || "[SERVIÇO]");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

async function loadServices() {
  try {
    const response = await fetch("services.json");
    if (!response.ok) {
      throw new Error("Não foi possível carregar os serviços");
    }
    const services = await response.json();
    renderServices(services);
  } catch (error) {
    console.error(error);
    servicesGrid.innerHTML = "<p class=\"error\">Ops! Não foi possível carregar os serviços agora.</p>";
  }
}

function renderServices(services) {
  servicesGrid.innerHTML = services
    .map(
      (service) => `
        <article class="service-card" data-animate="fade-up">
          <div class="service-card__badge">${service.title === "Coloração" ? "🍒" : service.title === "Tratamentos" ? "✨" : "✂️"}</div>
          <h3>${service.title}</h3>
          <p>${service.desc}</p>
          <span class="service-card__price">${service.price}</span>
          <a class="button button--ghost" href="${buildWhatsappLink(service.title)}" target="_blank" rel="noopener noreferrer">
            Agendar no WhatsApp 💕
          </a>
        </article>
      `
    )
    .join("");

  observeAnimatedElements(servicesGrid);
}

async function loadTestimonials() {
  try {
    const response = await fetch("testimonials.json");
    if (!response.ok) {
      throw new Error("Não foi possível carregar os depoimentos");
    }
    const testimonials = await response.json();
    renderTestimonials(testimonials);
  } catch (error) {
    console.error(error);
    testimonialsList.innerHTML = "<p class=\"error\">Volte em breve para ler os depoimentos das clientes.</p>";
  }
}

function renderTestimonials(testimonials) {
  testimonialsList.innerHTML = testimonials
    .map(
      (testimonial) => `
        <article class="testimonial-card" data-animate="fade-up">
          <div class="testimonial-card__avatar">
            <img src="${testimonial.avatar}" alt="Cliente ${testimonial.name}" />
          </div>
          <blockquote>“${testimonial.text}”</blockquote>
          <p class="testimonial-card__name">${testimonial.name}</p>
        </article>
      `
    )
    .join("");

  observeAnimatedElements(testimonialsList);
}

function setupAnimations() {
  animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          animationObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  observeAnimatedElements(document);
}

function observeAnimatedElements(scope) {
  if (!animationObserver) return;
  const animatedElements = scope.querySelectorAll("[data-animate]:not(.is-visible)");
  animatedElements.forEach((element) => animationObserver.observe(element));
}

function updateYear() {
  const now = new Date();
  if (yearDisplay) {
    yearDisplay.textContent = now.getFullYear();
  }
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Ignora links vazios ou apenas "#"
      if (!href || href === '#') return;
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        e.preventDefault();
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1200; // Duração em milissegundos (1.2 segundos)
        let start = null;
        
        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Função de easing para suavizar o movimento
        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
      }
    });
  });
}

function init() {
  setupAnimations();
  loadServices();
  loadTestimonials();
  updateYear();
  setupConsultationCarousel();
  setupSmoothScroll();
}

// Consultation Carousel
function setupConsultationCarousel() {
  const slides = document.querySelectorAll('.consultation__slide');
  const navButtons = document.querySelectorAll('.consultation__nav-btn');
  
  if (!slides.length || !navButtons.length) return;
  
  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const slideNumber = button.getAttribute('data-slide-btn');
      
      // Remove active classes
      slides.forEach((slide) => slide.classList.remove('consultation__slide--active'));
      navButtons.forEach((btn) => btn.classList.remove('consultation__nav-btn--active'));
      
      // Add active classes
      const targetSlide = document.querySelector(`[data-slide="${slideNumber}"]`);
      if (targetSlide) {
        targetSlide.classList.add('consultation__slide--active');
        button.classList.add('consultation__nav-btn--active');
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
