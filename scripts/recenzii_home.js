const track = document.querySelector('.testimonial-track');
const cards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.arrow.left');
const nextBtn = document.querySelector('.arrow.right');

let index = 0;

function getCardsPerView() {
  return window.innerWidth <= 768 ? 1 : 2;
}

function updateDots(totalSlides) {
  dotsContainer.innerHTML = ''; // resetează dots
  for(let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if(i === index) dot.classList.add('active');
    dot.addEventListener('click', () => {
      index = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateSlider() {
  const cardsPerView = getCardsPerView();
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  
  // Ajustează transformarea pentru slider
  const translateX = -(index * (100 / cardsPerView));
  track.style.transform = `translateX(${translateX}%)`;

  // Actualizează dots
  updateDots(totalSlides);
}

// Butoane prev/next
prevBtn.addEventListener('click', () => {
  const cardsPerView = getCardsPerView();
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  const cardsPerView = getCardsPerView();
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  index = (index + 1) % totalSlides;
  updateSlider();
});

// Actualizare slider la resize
window.addEventListener('resize', () => {
  index = 0; // resetează indexul la resize pentru a evita problemele
  updateSlider();
});

// Inițializează slider-ul
updateSlider();
