/**
 * Avec une grille on peut éffacer facilement l'entité déplacée 
 */


const divs = document.querySelectorAll("div");
//on stocke l'entité à déplacer
let val = "";

divs.forEach((div) => {
  div.addEventListener("click", () => {
    //si on n'a aucune entité en déplacement
    //on "sauvegarde" la pièce
    if(val == ""){
        val =  `${div.innerText}`;
    }
    //si on a une entité en déplacement
    //on "pose" l'entité
    else{
        if(val != ""){
            div.innerHTML = val;
            val = "";
        }
    }
});
});
