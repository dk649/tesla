window.onload = function () {
  const topBar = document.getElementById("top-bar");
  const exteriorColorSection = document.getElementById("exterior-buttons");
  const interiorColorSection = document.getElementById("interior-buttons");
  const exteriorImage = document.getElementById("exterior-image");
  const interiorImage = document.getElementById("interior-image");
  const wheelButtonsSection = document.getElementById("wheel-buttons");
  const performanceBtn = document.getElementById("performance-upgrade-btn");
  const totalPrice = document.getElementById("total-price");
  const fullSelfDriving = document.getElementById("full-self-driving-checkbox");
  const accessoryCheckboxes = document.querySelectorAll(
    ".accessory-form-checkbox"
  );
  const downPaymentElement = document.getElementById("down-payment");
  const monthlyPaymentEl = document.getElementById("monthly-payment");

  const basePrice = 52490;

  let currentPrice = basePrice;

  let selectedColor = "Stelth Gray";
  const selectedOptions = {
    "Performance Wheels": false,
    "Performance Package": false,
    "Full Self-Driving": false,
  };

  const pricing = {
    "Performance Wheels": 2500,
    "Performance Package": 5000,
    "Full Self-Driving": 8500,
    Accessories: {
      "Center Console Trays": 35,
      Sunshade: 105,
      "All-Weather Interior Liners": 225,
    },
  };

  const updateTotalPrice = () => {
    currentPrice = basePrice;
    if (selectedOptions["Performance Wheels"]) {
      currentPrice += pricing["Performance Wheels"];
    }

    if (selectedOptions["Performance Package"]) {
      currentPrice += pricing["Performance Package"];
    }

    if (selectedOptions["Full Self-Driving"]) {
      currentPrice += pricing["Full Self-Driving"];
    }

    accessoryCheckboxes.forEach((checkbox) => {
      const accessoryLabel = checkbox
        .closest("label")
        .querySelector("span")
        .textContent.trim();

      const accessoryPrice = pricing["Accessories"][accessoryLabel];

      if (checkbox.checked) {
        currentPrice += accessoryPrice;
      }
    });

    totalPrice.textContent = `$${currentPrice.toLocaleString()}`;
    updatePaymentBreakdown();
  };

  const updatePaymentBreakdown = () => {
    const downPayment = currentPrice * 0.1;
    downPaymentElement.textContent = `$${downPayment.toLocaleString()}`;

    const loanMonths = 60;
    const interestRate = 0.03;

    const loanAmount = currentPrice - downPayment;

    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment =
      (loanAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanMonths))) /
      (Math.pow(1 + monthlyInterestRate, loanMonths) - 1);
    monthlyPaymentEl.textContent = `$${monthlyPayment.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })}`;
  };

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
        selectedColor = button.querySelector("img").alt;

        updateExteriorImage();
      } else if (event.currentTarget === interiorColorSection) {
        const color = button.querySelector("img").alt;
        interiorImage.src = interiorImages[color];
      }
    }
  };

  const updateExteriorImage = () => {
    const performanceSuffix = selectedOptions["Performance Wheels"]
      ? "-performance"
      : "";

    const colorKey =
      selectedColor in exteriorImages ? selectedColor : "Stealth Grey";
    exteriorImage.src = exteriorImages[colorKey].replace(
      ".jpg",
      `${performanceSuffix}.jpg`
    );

    console.log(colorKey);
  };

  const handleWheelButtonClick = (event) => {
    if (event.target.tagName === "BUTTON") {
      const buttons = document.querySelectorAll("#wheel-buttons button");

      buttons.forEach((button) => {
        selectedOptions["Performance Wheels"] =
          event.target.textContent.includes("Performance");

        updateExteriorImage();
        // exteriorImage.src = selectedWheel
        //   ? "/images/model-y-stealth-grey-performance.jpg"
        //   : "/images/model-y-stealth-grey.jpg";

        updateTotalPrice();
      });
    }
  };

  const handlePerformanceUpdrage = () => {
    performanceBtn.classList.toggle("bg-gray-700");
    let isSelected = performanceBtn.classList.toggle("text-white");
    console.log("working");

    selectedOptions["Performance Package"] = isSelected;

    updateTotalPrice();
  };

  const handleFullSelfDriving = () => {
    if (fullSelfDriving.checked) {
      selectedOptions["Full Self-Driving"] = true;
    } else if (!fullSelfDriving.checked) {
      selectedOptions["Full Self-Driving"] = false;
    }
    updateTotalPrice();
  };

  accessoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => updateTotalPrice());
  });

  updateTotalPrice();
  wheelButtonsSection.addEventListener("click", handleWheelButtonClick);
  interiorColorSection.addEventListener("click", handleColorButtonClick);
  exteriorColorSection.addEventListener("click", handleColorButtonClick);
  performanceBtn.addEventListener("click", handlePerformanceUpdrage);
  fullSelfDriving.addEventListener("change", handleFullSelfDriving);

  window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
};
