/** */
const fadeInElements = document.querySelectorAll('.fade-in');
const fadeLeftElements = document.querySelectorAll('.fade-in-left');
const fadeRightElements = document.querySelectorAll('.fade-in-right');

function createObserver(threshold) {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('show');
        }, delay);
        entry.target.observer.unobserve(entry.target);
      }
    });
  }, { threshold });
}

const fadeObserver = createObserver(0.8);
const slideObserver = createObserver(0.15);

function setupElements(elements, observer) {
  elements.forEach(el => {
    if (el.dataset.duration) {
      el.style.transitionDuration = el.dataset.duration + 's';
    }
    el.observer = observer;
    observer.observe(el);
  });
}

setupElements(fadeInElements, fadeObserver);
setupElements(fadeLeftElements, slideObserver);
setupElements(fadeRightElements, slideObserver);

const cookieBanner = document.getElementById("cookie-banner");
const acceptBtn = document.getElementById("accept");
const rejectBtn = document.getElementById("reject");

if (!localStorage.getItem("cookieConsent")) {
  cookieBanner.style.display = "flex";
}

acceptBtn.addEventListener("click", function () {
  localStorage.setItem("cookieConsent", "accepted");
  cookieBanner.style.display = "none";
  loadGA4();
});

function loadGA4() {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-XYV7K4MBLD";
  document.head.appendChild(script);

  script.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XYV7K4MBLD');
  };
}

rejectBtn.addEventListener("click", function () {
  localStorage.setItem("cookieConsent", "rejected");
  cookieBanner.style.display = "none";
});
if (localStorage.getItem("cookieConsent") === "accepted") {
  loadGA4();
}