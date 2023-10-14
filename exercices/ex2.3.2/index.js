const divs = document.querySelectorAll("div");

divs.forEach((div) => {
  div.addEventListener("mouseover", () => {
    div.innerText = `${div.style.backgroundColor.toString()}`;
  });

  div.addEventListener("mouseout", () => {
    div.innerText = "";
  });
});
