const test = document.querySelector("div.test");
test.addEventListener("click", () => {
  if (test.textContent === "Click Me!") {
    test.textContent = "Hello Up-Skilling World!";
  } else {
    test.textContent = "Click Me!";
  }
});
