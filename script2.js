const cards = document.querySelectorAll(".card");
const track = document.querySelector(".skill-cards");

let index = 2; // middle card initially

function updateCards() {
  const cardWidth = cards[0].offsetWidth + 40; // (width + gap)
  track.style.transform = `translateX(calc(50vw - ${index * cardWidth + cardWidth / 2}px))`;

  cards.forEach((c, i) => {
    if (i === index) c.classList.remove("small");
    else c.classList.add("small");
  });
}

updateCards();

// Arrow Buttons
document.querySelector(".right-arrow").onclick = () => {
  index = (index + 1) % cards.length;
  updateCards();
};

document.querySelector(".left-arrow").onclick = () => {
  index = (index - 1 + cards.length) % cards.length;
  updateCards();
};

// Swipe (mobile)
let startX = 0;

track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
  let diff = startX - e.changedTouches[0].clientX;

  if (diff > 50) {
    index = (index + 1) % cards.length;
  } else if (diff < -50) {
    index = (index - 1 + cards.length) % cards.length;
  }
  updateCards();
});
