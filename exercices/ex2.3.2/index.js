const divs = document.querySelectorAll("div");

divs.forEach((div) => {
  div.addEventListener("mouseover", () => {
      div.className = "color-div2"
      div.innerText = `${div.style.backgroundColor.toString()}`;
  });

  div.addEventListener("mouseout", () => {
    div.className = "color-div"
    div.innerText = "";
  });
});
