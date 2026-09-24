export function initSlider() {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const controls = document.querySelectorAll('.control');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!track) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider(index) {
    currentIndex = index;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    controls.forEach((control, idx) => {
      if (idx === currentIndex) {
        control.classList.add('active');
        control.setAttribute('aria-selected', 'true');
      } else {
        control.classList.remove('active');
        control.setAttribute('aria-selected', 'false');
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateSlider(currentIndex + 1 < totalSlides ? currentIndex + 1 : 0);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateSlider(currentIndex > 0 ? currentIndex - 1 : totalSlides - 1);
    });
  }

  controls.forEach((control) => {
    control.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
      updateSlider(targetIndex);
    });
  });
}
