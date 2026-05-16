const menuButton = document.querySelector(".nav-right");
const menuOverlay = document.querySelector(".menu-overlay");

menuButton.addEventListener("click", () => {
  menuOverlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
  document.documentElement.classList.toggle("no-scroll");
});

const arrows = document.querySelector('.timeline-arrows');
const dots = document.querySelectorAll('.dot');
const years = document.querySelectorAll('.timeline-years p');
let currentIndex = 0;
const totalSlides = 3;
const track = document.querySelector('.story-wrapper');

arrows.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const direction = e.target.dataset.direction;
    if (direction === 'right' && currentIndex < totalSlides - 1) {
      currentIndex++;
    } else if (direction === 'left' && currentIndex > 0) {
      currentIndex--;
    }
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
    years.forEach(year => year.classList.remove('active'));
    years[currentIndex].classList.add('active');
    const cardWidth = document.querySelector('.story-card').offsetWidth + 50;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }
});

const banner = document.querySelector('.banner-img-wrapper');
const bannerImg = banner.querySelector('img');

window.addEventListener('scroll', () => {
  const rect = banner.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.bottom > 0 && rect.top < windowHeight) {
    const progress = (windowHeight - rect.top) / (windowHeight + banner.offsetHeight);
    const imgExtraHeight = bannerImg.offsetHeight - banner.offsetHeight;
    const yOffset = -(progress * imgExtraHeight);
    bannerImg.style.transform = `translateY(${yOffset}px)`;
  }
});