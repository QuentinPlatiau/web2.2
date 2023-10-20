const red= document.querySelector(".red");
const orange= document.querySelector(".orange");
const green= document.querySelector(".green");

const delaysBetweenLightChanges = 2000;

cycleThroughLamps();

function cycleThroughLamps() {
  window.setInterval(showFromRedToGreenToRedWithDelays, delaysBetweenLightChanges*4);
}

showFromRedToGreenToRedWithDelays();

function showFromRedToGreenToRedWithDelays() {
    switchLampRed();
    switchLampOrange(delaysBetweenLightChanges*1);
    switchLampGreen(delaysBetweenLightChanges*2);    
    switchLampOrange(delaysBetweenLightChanges*3);    
    switchLampRed(delaysBetweenLightChanges*4);
}

function switchLampRed(delaysBetweenLightChange) {
    window = setTimeout(() => {
        showRedLamp(); 
    }, delaysBetweenLightChange);
  }

  function switchLampOrange(delaysBetweenLightChange) {
    window = setTimeout(() => {    
        showOrangeLamp();   
    }, delaysBetweenLightChange);
  }

  function switchLampGreen(delaysBetweenLightChange) {
    window = setTimeout(() => {
        showGreenLamp();   
    }, delaysBetweenLightChange);
  }

  function showRedLamp() {    
    red.style.backgroundColor = "red";
    orange.style.backgroundColor = "white";
  }

  function showOrangeLamp() {
    red.style.backgroundColor = "white";
    orange.style.backgroundColor = "orange";
    green.style.backgroundColor = "white";
  }

  function showGreenLamp() {    
    green.style.backgroundColor = "green";
    orange.style.backgroundColor = "white";
  }