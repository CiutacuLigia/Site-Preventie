window.addEventListener('load', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  const allImages = Array.from(document.querySelectorAll('.carousel-item img'));
  let currentIndex = 0;

  allImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.style.display = 'flex';
      console.log('Click pe imagine:', img.src); // test
    });
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    lightboxImg.src = allImages[currentIndex].src;
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % allImages.length;
    lightboxImg.src = allImages[currentIndex].src;
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
});