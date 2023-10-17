const clickTimer = document.querySelector("#msgBox1");
const buttonClick = document.querySelector("#click");

clickTimer.addEventListener("mouseover", activedTimer);

let timeoutID;
let StartGame;
let compteur = 0;
const delayInSeconds = 5;
const delayInMiliSeconds = delayInSeconds * 1000;

function activedTimer() {
  if(!timeoutID){    
      buttonClick.addEventListener("click", compteurDeClick);    
      clickTimer.removeEventListener("mouseover",activedTimer);
      StartGame = new Date();
      timeoutID = setTimeout(() => {
      timeoutID = undefined;
      compteur = 0;
      clickTimer.addEventListener("mouseover", activedTimer);
      alert('Game over, you did not click 10 times within 5s !');
      }, delayInMiliSeconds);
    }
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