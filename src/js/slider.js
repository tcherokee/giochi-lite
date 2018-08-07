let slider = document.querySelector("#slider ul");
let slide = document.querySelector("#slider li");
let slides =  Array.prototype.slice.call(document.querySelectorAll("#slider li"));
let slidePrev = document.getElementById("slidePrev");
let slideNext = document.getElementById("slideNext");
let slideIndex = 0;
let activeSlide;
let currentIntervalTime;
let sliderInterval;


function slideTransition() {

  if (slideIndex === 0 && activeSlide == null) {
    slides[slideIndex].classList.add("active");
  } else {
    slides[activeSlide].classList.remove("active");
    slides[slideIndex].classList.add("active");
  }

  activeSlide = slideIndex;

  if (slideIndex < slides.length - 1) {
    slideIndex += 1;
  } else {
    slideIndex = 0;
  }
}

function IntervalPauseResume(callback, interval) {
  let timerId;
  let startTime;
  let timeRemaining = 0;
  let state = 0; //0 for not running, 1 for running, 2 for paused, 3 for resumed

  this.pause = function () {
    if (state != 1) {
      return;
    } else {
      timeRemaining = interval - (new Date() - startTime);
      window.clearInterval(timerId);
      state = 2;
    };
  }

  this.resume = function () {
    if (state != 2) {
      return;
    } else {
      state = 3;
      window.setTimeout(this.timeoutCallback, timeRemaining);
    }
  }

  this.stop = function() {
    window.clearInterval(timerId);
    state = 0;
  }

  this.timeoutCallback = function () {
      if (state != 3) {
        return;
      }

      callback();
      startTime = new Date();
      timerId = window.setInterval(callback, interval);
      state = 1;
  }

  startTime = new Date();
  timerId = window.setInterval(callback, interval);
  state = 1;
}

function startSlider() {
  slideTransition();

  sliderInterval =  new IntervalPauseResume(function () {
                          slideTransition();
                        }, 5000);
}

window.addEventListener("resize", function(){
  slider.setAttribute("style", "height:" + slide.offsetHeight + "px");
})

window.addEventListener("load", function(){
  slider.setAttribute("style", "height:" + slide.offsetHeight + "px");
})

slider.addEventListener("mouseenter", function(e){
  sliderInterval.pause();
})

slider.addEventListener("mouseleave", function(e){
  sliderInterval.resume();
})

document.addEventListener("click", function(e){
  if (e.target === slidePrev) {

    sliderInterval.stop();

    if (slideIndex-2 === -1) {
      slideIndex = slides.length - 1;
    } else if (slideIndex-2 === -2) {
      slideIndex = slides.length - 2;
    } else {
      slideIndex -= 2;
    }

    startSlider();

  } else if (e.target === slideNext) {

    sliderInterval.stop();
    startSlider();
  }
})

startSlider();
slider.setAttribute("style", "height:" + slide.offsetHeight + "px");
