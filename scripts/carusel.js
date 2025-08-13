const track       = document.querySelector('.carousel-track');
const slides      = Array.from(track.children);
const prevBtn     = document.querySelector('.carousel-btn.prev');
const nextBtn     = document.querySelector('.carousel-btn.next');

const visible     = 3; // numărul de imagini vizibile
let slideWidth;

window.addEventListener('load', () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(${-slideWidth * index}px)`;
});

// Clonează ultimele 3 slide-uri și le prepapend
slides.slice(-visible).forEach(slide => {
  const clone = slide.cloneNode(true);
  clone.classList.add('clone');
  track.insertBefore(clone, track.firstChild);
});

// Clonează primele 3 slide-uri și le append
slides.slice(0, visible).forEach(slide => {
  const clone = slide.cloneNode(true);
  clone.classList.add('clone');
  track.appendChild(clone);
});

// Reia lista de slide-uri după clonare
const allSlides = Array.from(track.children);

// Setează poziția inițială
let index = visible;
track.style.transform = `translateX(${-slideWidth * index}px)`;

let isSliding = false;

// Funcție pentru mutare
function moveTo(idx) {
  track.style.transition = 'transform 0.4s ease-in-out';
  track.style.transform = `translateX(${-slideWidth * idx}px)`;
}

// Autoplay la fiecare 3 secunde
let autoplay = setInterval(() => {
  if (!isSliding) {
    index++;
    moveTo(index);
    isSliding = true;
  }
}, 3000);

// Oprește autoplay-ul la interacțiune
function stopAutoplay() {
  if (autoplay) {
    clearInterval(autoplay);
    autoplay = null;
  }
}

// Navigare manuală
nextBtn.addEventListener('click', () => {
  stopAutoplay();
  if (isSliding) return;
  isSliding = true;
  index++;
  moveTo(index);
});

prevBtn.addEventListener('click', () => {
  stopAutoplay();
  if (isSliding) return;
  isSliding = true;
  index--;
  moveTo(index);
});

// Reset infinit la capete
track.addEventListener('transitionend', () => {
  // dacă e clone de început
  if (allSlides[index].classList.contains('clone') && index < visible) {
    track.style.transition = 'none';
    index = allSlides.length - (2 * visible);
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  // dacă e clone de final
  if (allSlides[index].classList.contains('clone') && index >= allSlides.length - visible) {
    track.style.transition = 'none';
    index = visible;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  isSliding = false;
});

let restartTimeout;

function stopAutoplay() {
  if (autoplay) {
    clearInterval(autoplay);
    autoplay = null;
  }

  clearTimeout(restartTimeout);
  restartTimeout = setTimeout(() => {
    autoplay = setInterval(() => {
      if (!isSliding) {
        index++;
        moveTo(index);
        isSliding = true;
      }
    }, 3000);
  }, 10000); // repornește după 10 secunde
}

window.addEventListener('resize', () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(${-slideWidth * index}px)`;
});