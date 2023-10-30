import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

// eslint-disable-next-line prefer-const
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

let val = "";
let id = 0;

divs.forEach((div) => {
    div.addEventListener("click", () => {
        if(val === ""){        
            console.log(grille);
            val =  `${div.innerText}`;
            id = div.id;
        }

        else if(val !== ""){
            if(div.innerText === ""){
                // eslint-disable-next-line no-param-reassign
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
