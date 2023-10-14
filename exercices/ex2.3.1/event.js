const bouton = document.querySelector("button");
const span = document.querySelector("span");


bouton.addEventListener('click', () => {
    const message = document.querySelector("#message").value;
    if (!message) {
        span.innerHTML += "<p>vous devez écrire un message</p>";
    } else {
        console.log("test")
        span.innerText = "Votre souhait est " + message;
    }
})