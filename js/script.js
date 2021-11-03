// Griglia Campo Minato

/* PRIMA PARTE

L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro (o simili, l’importante è dare all’utente il feedback che ha scoperto una casella che rimarrà scoperta, con il numero relativo).
*/

/*  PRIMA PARTE

--DONE  1. Genero la griglia di gioco con le varie celle in base alla difficoltà selezionata => for
    --DONE  1.2 Se seleziona "Facile" (difficoltà 1), eseguirò un ciclo for che si ripeterà 100 volte, visto che dovrò stampare 100 celle. => for i < 100
    --DONE  1.2 Se seleziona "Medio" (difficoltà 2), eseguirò un ciclo for che si ripeterà 81 volte, visto che dovrò stampare 81 celle. => for i < 81
    --DONE  1.3 Se seleziona "Difficile" (difficoltà 3), eseguirò un ciclo for che si ripeterà 49 volte, visto che dovrò stampare 49 celle. => for i < 49
--DONE  2. Creo un elemento => "div"
--DONE  3. Aggiungo una classe all'elemento creato => classList.add("square")
--DONE  4. Appendo l'elemento con la classe alla variabile che fa riferimento all'id di un tag html => .append 
--DONE  5. Creo un evento al click della cella, in modo che si colora quando viene selezionata
    --DONE  5.1 Creo una funzione => function squareActive()
    --DONE  5.2 Aggiungo una classe all'elemento creato precedentemente ("div") => div.append("square-active")

*/

/* SECONDA PARTE

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su ogni cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
(come detto sull’effetiva interfaccia fate voi, non ci son specifiche vincolanti, ma partite semplici)
La partita termina quando il giocatore clicca su una bomba
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato un quadratino con un numero consentito. (quindi se ci pensate dovrete tenere traccia del punteggio).
*/

/*  SECONDA PARTE
1. Genero 16 numeri casuali univoci
    --DONE  1.1 Creo una funzione che conterrà tutto il procedimento e utilizzo un argomento. => function genNumBomb(rangeNum);
        --DONE  1.1.1 L'argomento lo utilizzerò quando dovranno essere generati i numeri random, così saranno compresi tra 1 e la difficoltà, ovvero (100 - 81 - 49);
    --DONE  1.2 Creo un array vuoto in cui conterrà i 16 numeri generati univoci. => let bombNum = [];
    --DONE  1.3 Utilizzo un ciclo while che dovrà essere eseguito finchè la lunghezza dell'array arriva a 16 elementi  => while (bombNum.length < 16);
    --DONE  1.4 Genero i numeri e li salvo in una variabile => Math.floor(Math.random() * rangeNum) + 1;
    --DONE  1.5 Utilizzo una condizione per controllare se i numeri generati sono doppioni => if bombNum.indexOf(randomNumBomb) === -1;
        --DONE  1.5.1 Utilizzo la funzione "indexOf" nella condizione. => .indexOf()
    --DONE  1.6 Se il numero non è doppione allora verrà pushato all'interno di un'array vuoto
    --DONE  1.7 Se il numero è doppione allora si ripeterà il ciclo while
--DONE  2. Utilizzo una condizione per controllare se il numero cliccato è presente nella lista dei numeri generati
    --DONE  2.1 Se è presente nella lista dei numeri generati, allora la cella si colorerà di rosso e finisce la partita
    --DONE  2.2 Se non è presente nella lista dei numeri generati, allora la cella si colorerà di azzurro e l'utente potrà continuare a cliccare sulle altre celle.
3. Una volta finita la partita, manderò un messaggio in output che conterrà il numero di click effettuati sulle celle azzurre (che sarà il punteggio), e farò visualizzare tutte le altre bombe presenti.
    3.1 Se l'utente non colpirà nessuna bomba e finirà il gioco, apparirà a schermo: Hai vinto!
    3.2 Se l'utente colpirà un bomba, apparirà a schermo il punteggio che ha realizzato e visualizzerà le altre bombe.

*/

const gridCont = document.getElementById("grid");
const easyGame = document.getElementById("easy-btn");
const mediumGame = document.getElementById("medium-btn");
const difficultGame = document.getElementById("difficult-btn");
const mySquare = document.querySelector(".square");
const resultGame = document.querySelector('.result');
let bombNum = [];

easyGame.addEventListener("click", function() {
    play(100, 'easy');
    genNumBomb(100)
    console.log(bombNum);
});

mediumGame.addEventListener("click", function() {
    play(81, 'medium');
    genNumBomb(81)
    console.log(bombNum);
});


difficultGame.addEventListener("click", function() {
    play(49, 'difficult');
    genNumBomb(49)
    console.log(bombNum);
});


// FUNZIONI

// Genera le celle.
function play(difficult, classes) {
    
    let countClicks = 0; // Contatore click
    let foundBomb = false;

    if (document.querySelectorAll('.square').length) {
        for (let j = 0; j < 100; j++) { // Da sistemare la condizione!!!!
            document.querySelector('.square').remove();
        }
    }
    

    for (let i = 1; i <= difficult; i++) {
        let squareCont = generateElement("div", "square", "square-" + classes, i);

        squareCont.addEventListener("click", function() {
            countClicks += 1;
            this.classList.add("square-active");
            squareCont.innerText = i;
            console.log(countClicks);

            // Controllo se il numero cliccato è presente nell'array
            for (let j = 0; j < bombNum.length; j++) {
                if (bombNum.indexOf(i) !== -1) {
                    foundBomb = true;
                } else {
                    foundBomb = false;
                }
            }

            if (foundBomb === true) {
                this.classList.add('square-bomb');
                resultGame.append(`Hai perso! :-( Hai totalizzato ${countClicks - 1} punti`);
                // STOPPARE GIOCO
                
                // for (let i = 0; i < bombNum.length; i++) {
                //     this.classList.add('square-bomb');
                // }
                // squareCont.removeEventListener("click" , play);
            }

            if (countClicks == (difficult - 16)) {
                resultGame.append(`Hai vinto! :-) Hai totalizzato ${countClicks} punti`);
                // STOPPARE GIOCO
            }
        }
        );
        gridCont.appendChild(squareCont);
    }
}

// Permette di creare un elemento e aggiungere fino a 2 classi.
const generateElement = (inputElement, inputClass, inputClassPlus, inputAttrubute) => {
    let myCreateElement = document.createElement(inputElement); 
    myCreateElement.classList.add(inputClass, inputClassPlus);
    myCreateElement.id = inputAttrubute;
    return myCreateElement
}

// Genera 16 numeri casuali univoci
function genNumBomb(rangeNum) {

    let i = 0;
    bombNum.length = 0; // Questo serve per svuotare l'array quando cambio difficoltà, in modo che possa generare altri 16 numeri random e aggiungerli nuovamente.

    while (bombNum.length < 16) {
        var randomNumBomb = Math.floor(Math.random() * rangeNum) + 1;

        if (bombNum.indexOf(randomNumBomb) === -1) {
            bombNum.push(randomNumBomb);
        }
        i++
    }
    return bombNum;
}

// Controllare se il numero cliccato sia nella lista dei numeri random

/* DA CONTROLLARE!!!! */

// const checkNum = (number) => {
//     for (let j = 0; j < bombNum.length; j++) {
//         if (bombNum.indexOf(number) !== -1) {
//             this.classList.add('square-bomb');
//         } 
//     }
//     return this;
// }


// RICORDARE 
/*
    eleDiv.setAttribute("id" , i);
    let prova = eleDiv.id;
    console.log(prova);
*/