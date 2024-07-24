//Database
let cards = [
  {
    name: "Airedale Terrier",
  },
  {
    name: "Corgie",
  },
  {
    name: "Pastore Tedesco",
  },
  {
    name: "Golden Retriever",
  },
  {
    name: "Airedale Terrier",
  },
  {
    name: "Corgie",
  },
  {
    name: "Pastore Tedesco",
  },
  {
    name: "Golden Retriever",
  },
];

//DATI
const gridContainer = document.getElementById("grid-container");
const btnStart = document.getElementById("btn-start");
const cardsList = document.querySelectorAll(".card");
let counterFlip = 0;
let flippedCards = [];

//SVOLGIMENTO
// Al click sul bottone di start, l'array contenente le carte viene mescolato e le carte vengono inserite in griglia nell'ordine estratto
btnStart.addEventListener("click", function () {
  cards = shuffleCards(cards);
  console.log(cards);

  generateGrid();
});

//FUNZIONI
//Mescolamento elementi array: Fisher-Yates Sorting Algorithm
function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Popolamento griglia contenente le card
function generateGrid() {
  for (let i = 0; i < cards.length; i++) {
    const card = createCard(i);

    gridContainer.append(card);
  }
}

// Creazione delle card
function createCard(i) {
  const card = document.createElement("div");
  card.className = "card";
  card._cardID = i;

  card.addEventListener("click", function () {
    console.log("cliccata", card._cardID);
    counterFlip++;

    flipCard(card._cardID);
  });

  // Click e giro delle card
  function flipCard(i) {
    if (counterFlip < 3) {
      card.innerHTML = cards[i].name;

      flippedCards.push(card);
      console.log(flippedCards);

      if (counterFlip === 2) {
        setTimeout(checkCardsMatch, 2000);
      }
    }
  }

  return card;
}

// Verifica match delle card girate
function checkCardsMatch() {
  if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
    console.log("Uguale");
    for (let flippedCard of flippedCards) {
      flippedCard.classList.add("block-click");
    }
  } else {
    console.log("Diverso");
    for (let flippedCard of flippedCards) {
      flippedCard.innerHTML = "";
    }
  }

  flippedCards = [];
  counterFlip = 0;
}
