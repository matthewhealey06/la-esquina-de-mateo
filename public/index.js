const menuButton = document.querySelector(".nav-right");
const menuOverlay = document.querySelector(".menu-overlay");

menuButton.addEventListener("click", () => {
  menuOverlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
  document.documentElement.classList.toggle("no-scroll");
});

const arrows = document.querySelector(".timeline-arrows");
const dots = document.querySelectorAll(".dot");
const years = document.querySelectorAll(".timeline-years p");
let currentIndex = 0;
const totalSlides = 3;
const track = document.querySelector(".story-wrapper");

arrows.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const direction = e.target.dataset.direction;
    if (direction === "right" && currentIndex < totalSlides - 1) {
      currentIndex++;
    } else if (direction === "left" && currentIndex > 0) {
      currentIndex--;
    }
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
    years.forEach((year) => year.classList.remove("active"));
    years[currentIndex].classList.add("active");
    const cardWidth = document.querySelector(".story-card").offsetWidth + 50;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }
});

const banner = document.querySelector(".banner-img-wrapper");
const bannerImg = banner.querySelector("img");

window.addEventListener("scroll", () => {
  const rect = banner.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.bottom > 0 && rect.top < windowHeight) {
    const progress =
      (windowHeight - rect.top) / (windowHeight + banner.offsetHeight);
    const imgExtraHeight = bannerImg.offsetHeight - banner.offsetHeight;
    const yOffset = -(progress * imgExtraHeight);
    bannerImg.style.transform = `translateY(${yOffset}px)`;
  }
});

const dishes = document.getElementById("signature-dishes");
const leftDish = document.querySelector(".dish-left");
const rightDish = document.querySelector(".dish-right");

window.addEventListener("scroll", () => {
  if (window.innerWidth <= 768) return;

  const rect = dishes.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.bottom > 0 && rect.top < windowHeight) {
    const progress =
      (windowHeight - rect.top) / (windowHeight + dishes.offsetHeight);
    const offset = progress * 120;
    leftDish.style.transform = `translateY(-${offset}px)`;
    rightDish.style.transform = `translateY(${offset}px)`;
  }
});

const today = new Date();
const endDate = new Date();
endDate.setMonth(endDate.getMonth() + 3);

const dates = [];

while (today < endDate) {
  dates.push(
    today.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }),
  );
  today.setDate(today.getDate() + 1);
}

const dateSelect = document.getElementById("date-select");
const dateLabel = document.querySelector("#date-select span");
const dateOptions = document.querySelector("#date-select .dropdown-options");

dates.forEach((date) => {
  const option = document.createElement("span");
  option.textContent = date;
  option.addEventListener("click", function (e) {
    e.stopPropagation();
    dateLabel.textContent = date;
    dateOptions.style.display = "none";
  });
  dateOptions.appendChild(option);
});

dateSelect.addEventListener("click", function () {
  dateOptions.style.display =
    dateOptions.style.display === "block" ? "none" : "block";
});

const timeSelect = document.getElementById("time-select");
const timeLabel = document.querySelector("#time-select span");
const timeOptions = document.querySelector("#time-select .dropdown-options");

for (let hour = 12; hour <= 21; hour++) {
  const slots = hour === 21 ? ["00", "30"] : ["00", "30"];
  slots.forEach((min) => {
    const time = `${hour}:${min}`;
    const option = document.createElement("span");
    option.textContent = time;
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      timeLabel.textContent = time;
      timeOptions.style.display = "none";
    });
    timeOptions.appendChild(option);
  });
}

timeSelect.addEventListener("click", function () {
  timeOptions.style.display =
    timeOptions.style.display === "block" ? "none" : "block";
});

const partySelect = document.getElementById("party-select");
const partyLabel = document.querySelector("#party-select span");
const partyOptions = document.querySelector("#party-select .dropdown-options");

for (let party = 1; party <= 8; party++) {
  const option = document.createElement("span");
  option.textContent = party;
  option.addEventListener("click", function (e) {
    e.stopPropagation();
    partyLabel.textContent = party;
    partyOptions.style.display = "none";
  });
  partyOptions.appendChild(option);
}

partySelect.addEventListener("click", function () {
  partyOptions.style.display =
    partyOptions.style.display === "block" ? "none" : "block";
});
document.addEventListener("click", function (e) {
  if (!e.target.closest("#date-select")) {
    dateOptions.style.display = "none";
  }
  if (!e.target.closest("#time-select")) {
    timeOptions.style.display = "none";
  }
  if (!e.target.closest("#party-select")) {
    partyOptions.style.display = "none";
  }
});
const reserveBtn = document.getElementById("reserveBtn");

reserveBtn.addEventListener("click", function () {
  if (
    dateLabel.textContent === "Date" ||
    timeLabel.textContent === "Time" ||
    partyLabel.textContent === "Party Size"
  ) {
    reserveBtn.textContent = "Please fill all fields";
    setTimeout(() => {
      reserveBtn.textContent = "RESERVE NOW";
    }, 3000);
    return;
  }

  reserveBtn.textContent = "Reserved!";
  dateLabel.textContent = "Date";
  timeLabel.textContent = "Time";
  partyLabel.textContent = "Party Size";

  setTimeout(() => {
    reserveBtn.textContent = "RESERVE NOW";
  }, 5000);
});