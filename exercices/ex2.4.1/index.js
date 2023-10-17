const clickTimer = document.querySelector("#msgBox1");
const buttonClick = document.querySelector("#click");

clickTimer.addEventListener("mouseover", activedTimer);
buttonClick.addEventListener("click", compteurDeClick);


let timeoutID;
let StartGame;
let compteur = 0;
const delayInSeconds = 5;
const delayInMiliSeconds = delayInSeconds * 1000;

function activedTimer() {    
    clickTimer.removeEventListener("mouseover",activedTimer);
    StartGame = new Date();
    timeoutID = setTimeout(() => {
        alert('Game over, you did not click 10 times within 5s !');
      }, delayInMiliSeconds);
}

function compteurDeClick(){
    compteur++;
    console.log(compteur);
    if(compteur === 10){
        let finishGame = new Date();
        clickTimer.innerText = `You win ! You clicked 10 times within ${finishGame.getTime()-StartGame.getTime()} ms`;
       clearTimeout(timeoutID);

    }
  }