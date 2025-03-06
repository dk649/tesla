window.onload = function () {
  const topBar = document.getElementById("top-bar");
  const exteriorColorSection = document.getElementById("exterior-buttons");
  const interiorColorSection = document.getElementById("interior-buttons");
  const exteriorImage = document.getElementById("exterior-image");
  const interiorImage = document.getElementById("interior-image");

  const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle("visible-bar", atTop);
    topBar.classList.toggle("hidden-bar", !atTop);
  };

  const exteriorImages = {
    "Stealth Grey": "/images/model-y-stealth-grey.jpg",
    "Pearl White": "/images/model-y-pearl-white.jpg",
    "Deep Blue": "/images/model-y-deep-blue-metallic.jpg",
    "Solid Black": "/images/model-y-solid-black.jpg",
    "Ultra Red": "/images/model-y-ultra-red.jpg",
    Quicksilver: "/images/model-y-quicksilver.jpg",
  };

  const interiorImages = {
    Dark: "./images/model-y-interior-dark.jpg",
    Light: "./images/model-y-interior-light.jpg",
  };

  const handleColorButtonClick = (event) => {
    let button;
    if (event.target.tagName === "IMG") {
      button = event.target.closest("button");
    } else if (event.target.tagName === "BUTTON") {
      button = event.target;
    }

    if (button) {
      const buttons = event.currentTarget.querySelectorAll("button");
      buttons.forEach((btn) => btn.classList.remove("btn-selected"));
      button.classList.add("btn-selected");
      if (event.currentTarget === exteriorColorSection) {
        const color = button.querySelector("img").alt;
        console.log(color);
        exteriorImage.src = exteriorImages[color];
      }
    }
  };

  interiorColorSection.addEventListener("click", handleColorButtonClick);
  exteriorColorSection.addEventListener("click", handleColorButtonClick);

  window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
};
