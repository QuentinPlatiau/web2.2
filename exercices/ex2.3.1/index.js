const form = document.querySelector("form");



// code to get the reference to the form shall be imagined

const onSubmit = (e) => {
    console.log("onSubmit::");
    e.preventDefault();
    const souhait = document.querySelector("#monShouait").value;
    if (!souhait) {
        form.innerHTML += "<p>vous devez écrire un message</p>";
    } else {
        console.log("test")
        form.innerText = "Votre souhait est " + souhait;
    }
};
  
  
form.addEventListener("submit", onSubmit);