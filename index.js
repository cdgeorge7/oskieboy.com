import config from "./config.js";

(function () {
  const usedFNKey = "usedFileNames";
  const usedBTNKey = "usedButtonNames";
  const button = document.getElementById("anotherButton");

  const imageId = "firstImage";
  const image = document.getElementById(imageId);
  image.src = getImageSource();
  image.classList.add("fade-in");
  image.addEventListener("load", imageLoadHandler);

  button.innerHTML = chooseButtonName();
  button.addEventListener("click", (e) => {
    button.disabled = true;
    image.classList.remove("fade-in");
    image.classList.add("fade-out");
    e.target.innerHTML = chooseButtonName();
  });

  image.addEventListener("transitionend", (e) => {
    if (image.classList.contains("fade-out")) {
      image.src = getImageSource();
    }
  });

  function randomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getImageSource() {
    return `./images/${chooseFileName()}`;
  }

  function imageLoadHandler() {
    button.disabled = false;
    image.classList.remove("fade-out");
    image.classList.add("fade-in");
  }

  function chooseFileName() {
    const fileNames = config.FILE_NAMES;
    let usedFileNames = JSON.parse(localStorage.getItem(usedFNKey));
    if (!usedFileNames || fileNames.length === usedFileNames.length) {
      usedFileNames = [];
    }
    const inputArray = filterArray(usedFileNames, fileNames);
    const choice = randomArrayElement(inputArray);
    saveChoice(choice, usedFileNames, usedFNKey);
    return choice;
  }

  function chooseButtonName() {
    const buttonNames = config.BUTTON_NAMES;
    let usedButtonNames = JSON.parse(localStorage.getItem(usedBTNKey));
    if (!usedButtonNames || buttonNames.length === usedButtonNames.length) {
      usedButtonNames = [];
    }
    const inputArray = filterArray(usedButtonNames, buttonNames);
    const choice = randomArrayElement(inputArray);
    saveChoice(choice, usedButtonNames, usedBTNKey);
    return choice;
  }

  function filterArray(used, source) {
    return source.filter((item) => !used.includes(item));
  }

  function saveChoice(choice, used, key) {
    used.push(choice);
    localStorage.setItem(key, JSON.stringify(used));
  }
})();
