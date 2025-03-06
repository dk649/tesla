window.onload = function () {
  console.log("working");

  const topBar = document.getElementById("top-bar");
  console.log(topBar);

  const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle("visible-bar", atTop);
    topBar.classList.toggle("hidden-bar", !atTop);
  };

  window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));

  // your code here
};
