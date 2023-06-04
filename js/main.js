'use strict';

// =================SLIDER===================

const slides = document.querySelectorAll('.slider__slide');
const btnRight = document.querySelector('.slider__button--right');
const btnLeft = document.querySelector('.slider__button--left');
const dotContainer = document.querySelector('.slider__dots');

let currentSlide = 0;
const slidesNumber = slides.length;

const moveToSlide = function(slide) {
    slides.forEach((s, index) => {
        s.style.transform = `translateX(${(index - slide) * 100}% )`;
    });
}

moveToSlide(0);

const nextSlide = function() {
    if(currentSlide === slidesNumber - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }

    activateCurrentDot(currentSlide);
    moveToSlide(currentSlide);
}

const previousSlide = function() {
    if(currentSlide === 0) {
        currentSlide = slidesNumber - 1;
    } else {
        currentSlide--;
    }

    activateCurrentDot(currentSlide);
    moveToSlide(currentSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

const createDots = function() {
    slides.forEach((_, index) => {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="slider__dot" data-slide="${index}"></button>`
        )
    });
}

createDots();

const activateCurrentDot = function(slide) {
    document.querySelectorAll('.slider__dot').forEach(dot => dot.classList.remove('slider__dot--active'));
    document.querySelector(`.slider__dot[data-slide="${slide}"]`).classList.add('slider__dot--active');
}

activateCurrentDot(0);

document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowRight') nextSlide();
    if(e.key === 'ArrowLeft') previousSlide();
});

dotContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('slider__dot')) {
        const slide = e.target.dataset.slide;
        moveToSlide(slide);
        activateCurrentDot(slide);
    }
});