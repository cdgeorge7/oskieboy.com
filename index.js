import config from "./config.js";

(function () {
  const usedFNKey = "usedFileNames";
  const usedBTNKey = "usedButtonNames";
  const button = document.getElementById("anotherButton");

  const image1Id = "firstImage";
  const image2Id = "secondImage";
  const image = document.getElementById(image1Id);
  const image2 = document.getElementById(image2Id);
  var currentImage = image1Id;
  var init = true;
  image.src = getImageSource();
  image.classList.add("fade-in");
  image2.classList.add("fade-out");
  image.addEventListener("load", imageLoadHandler);
  image2.addEventListener("load", imageLoadHandler);

  button.innerHTML = chooseButtonName();
  button.addEventListener("click", (e) => {
    button.disabled = true;
    if (currentImage === image1Id) {
      image.classList.remove("fade-in");
      image.classList.add("fade-out");
      currentImage = image2Id;
      image2.src = getImageSource();
    } else {
      image2.classList.remove("fade-in");
      image2.classList.add("fade-out");
      currentImage = image1Id;
      image.src = getImageSource();
    }
    e.target.innerHTML = chooseButtonName();
  });

  function randomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getImageSource() {
    return `./images/${chooseFileName()}`;
  }

  function imageLoadHandler() {
    button.disabled = false;
    if (init) {
      init = false;
      return;
    }
    if (currentImage === image1Id) {
      image.classList.remove("fade-out");
      image.classList.add("fade-in");
    } else {
      image2.classList.remove("fade-out");
      image2.classList.add("fade-in");
    }
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
