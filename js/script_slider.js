const slider = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let index = 0;

function updateSliderPosition() {
    slider.style.transform = `translateX(-${index * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : slides.length - 1;
    updateSliderPosition();
});

nextBtn.addEventListener('click', () => {
    index = (index < slides.length - 1) ? index + 1 : 0;
    updateSliderPosition();
});
