const btn1 = document.querySelector('#myBtn1');

let compteur = 0;


btn1.addEventListener('click', onClickHandlerForBtn1);

function onClickHandlerForBtn1(){
  compteur++;
  if(compteur >= 5 && compteur <= 9){
    btn1.innerText = "Bravo, bel échauffement !";
  }
  if(compteur > 9){
    btn1.innerText = "Vous êtes passé maître en l'art du clic !";
  }
}
