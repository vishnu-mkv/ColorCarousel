// read from local storage
const colors = JSON.parse(localStorage.getItem("colors")) || [
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
];

const totalSlides = colors.length;
const slider = document.querySelector("#slider");
const colorPicker = document.querySelector("#color-picker");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
let slides = document.querySelectorAll(".slide");

// Initialize the current slide index
let currentSlide = 0;
let currentActiveSlide = document.querySelector(".active-slide");
let dummySlide = null;

// Set the initial color picker value
colorPicker.value = colors[currentSlide];

// Set the all slide background color
slides.forEach((slide, index) => {
  slide.style.backgroundColor = colors[index];
  // set text color to black or white depending on background color
  const textColor = getTextColorFromBackground(colors[index]);
  slide.style.color = textColor;
  //   update hex inside span
  slide.querySelector("span").textContent = colors[index];
});

function setActiveSlide(index) {
  let nextActive = index;
  let updateDom = false;
  if (index === 0 && currentSlide === totalSlides - 1) {
    // clone the last slide
    dummySlide = slides[index].cloneNode(true);
    // add the dummy slide to the beginning of the slider
    slider.append(dummySlide);
    nextActive = totalSlides;
    updateDom = true;

    // update colors
    colors.push(colors[0]);
  }

  if (index === totalSlides - 1 && currentSlide === 0) {
    // clone the first slide
    dummySlide = slides[index].cloneNode(true);
    // add the dummy slide to the beginning of the slider
    slider.prepend(dummySlide);
    nextActive = 0;
    updateDom = true;
  }

  if (updateDom) {
    // update the slides NodeList
    slider.children = slides;
    slides = document.querySelectorAll(".slide");
  }

  handleChange(nextActive);

  if (dummySlide) {
    setTimeout(() => {
      // remove the dummy slide
      dummySlide.remove();
      dummySlide = null;
      slides = document.querySelectorAll(".slide");
      // update the slides NodeList
      slider.children = slides;
      handleChange(index, false);

      // update colors
      if (colors.length > totalSlides) colors.pop();
    }, 500);
  }
}

function handleChange(nextActive, smooth = true) {
  currentSlide = nextActive;
  // Remove the active-slide class from all slides
  currentActiveSlide.classList.remove("active-slide");
  // Add the active-slide class to the current slide

  currentActiveSlide = slides[currentSlide];
  currentActiveSlide.classList.add("active-slide");

  //   Update the color picker value
  colorPicker.value = colors[currentSlide];
  currentActiveSlide.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
}

// Function to animate the carousel to the next slide
function goToSlide(index, type = "next") {
  // Update the slider style to animate the transition
  setActiveSlide(index, type);
}

nextBtn.addEventListener("click", () =>
  goToSlide((currentSlide + 1) % totalSlides)
);

prevBtn.addEventListener("click", () =>
  goToSlide((currentSlide + totalSlides - 1) % totalSlides, "prev")
);

colorPicker.addEventListener("input", (e) => {
  const color = e.target.value.toUpperCase();
  colors[currentSlide] = color;

  //   write to local storage
  localStorage.setItem("colors", JSON.stringify(colors));

  currentActiveSlide.style.backgroundColor = color;
  //   update hex inside span
  currentActiveSlide.querySelector("span").textContent = color;
  // set text color to black or white depending on background color

  const textColor = getTextColorFromBackground(color);
  currentActiveSlide.style.color = textColor;
});
