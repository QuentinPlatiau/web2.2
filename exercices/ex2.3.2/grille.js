/**
 * Avec une grille on peut éffacer facilement l'entité déplacée 
 */

const GRILLES = [
    {
        id : 1,
        title : "partie 1",
        grille : (
            ("tour","cavalier","fou","dame","roi","fou","cavalier","tour"),
            ("pion","pion","pion","pion","pion","pion","pion","pion"),
            (" "," ","" ," "," "," "," "," "),
            (" "," "," "," "," "," "," "," "),
            (" "," "," "," "," "," "," "," "),
            (" "," "," "," "," "," "," "," "),
            ("pion","pion","pion","pion","pion","pion","pion","pion"),
            ("tour","cavalier","fou","roi","dame","fou","cavalier","tour")
        )
    }
];

let grille = [
    ["tour","cavalier","fou","dame","roi","fou","cavalier","tour"],
    ["pion","pion","pion","pion","pion","pion","pion","pion"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["pion","pion","pion","pion","pion","pion","pion","pion"],
    ["tour","cavalier","fou","roi","dame","fou","cavalier","tour"]
];

const divs = document.querySelectorAll("div");
//on stocke l'entité à déplacer
let val = "";
let id = 0;

divs.forEach((div) => {
  div.addEventListener("click", (e) => {
    //si on n'a aucune entité en déplacement
    //on "sauvegarde" la pièce
    if(val == ""){        
        console.log(grille);
        val =  `${div.innerText}`;
        id = div.id;
    }
    //si on a une entité en déplacement
    //on "pose" l'entité
    else{
        if(val != ""){
            div.innerHTML = val;
            grille[Math.floor((div.id-1)/8)][(div.id-1)%8] = val;
            val = "";
            divs.item(id-1).innerText = "";            
            grille[Math.floor((id-1)/8)][(id-1)%8] = "";
            console.log(grille);
        }
    }
});
});
