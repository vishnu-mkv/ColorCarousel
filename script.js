const colors = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];

const totalSlides = colors.length;
const slider = document.querySelector("#slider");
const colorPicker = document.querySelector("#color-picker");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const slides = document.querySelectorAll(".slide");

function render() {}

// Initialize the current slide index
let currentSlide = 0;
let currentActiveSlide = document.querySelector(".active-slide");

function setActiveSlide() {
  // Remove the active-slide class from all slides
  currentActiveSlide.classList.remove("active-slide");
  // Add the active-slide class to the current slide
  currentActiveSlide = slides[currentSlide];
  currentActiveSlide.classList.add("active-slide");

  //   Update the color picker value
  colorPicker.value = colors[currentSlide];
}

// Function to animate the carousel to the next slide
function goToSlide(index) {
  // Increment the current slide index
  currentSlide = index;

  // Update the slider style to animate the transition
  setActiveSlide();
  currentActiveSlide.scrollIntoView({ behavior: "smooth" });
}

nextBtn.addEventListener("click", () =>
  goToSlide((currentSlide + 1) % totalSlides)
);

prevBtn.addEventListener("click", () =>
  goToSlide((currentSlide + totalSlides - 1) % totalSlides)
);

colorPicker.addEventListener("input", (e) => {
  const color = e.target.value.toUpperCase();
  colors[currentSlide] = color;
  currentActiveSlide.style.backgroundColor = color;
  //   update hex inside span
  currentActiveSlide.querySelector("span").textContent = color;
  // set text color to black or white depending on background color

  const textColor = getTextColorFromBackground(color);
  currentActiveSlide.style.color = textColor;
});
