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