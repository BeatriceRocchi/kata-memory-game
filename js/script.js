//Database
let cards = [
  {
    name: "San Francisco",
    image: "SFO.webp",
  },
  {
    name: "Bryce Canyon",
    image: "BryceCanyon.webp",
  },
  {
    name: "Zion Park",
    image: "ZionPark.webp",
  },
  {
    name: "Grand Canyon",
    image: "GrandCanyon.webp",
  },
  {
    name: "Las Vegas",
    image: "LasVegas.webp",
  },
  {
    name: "Yosemite",
    image: "Yosemite.webp",
  },
  {
    name: "San Francisco",
    image: "SFO.webp",
  },
  {
    name: "Bryce Canyon",
    image: "BryceCanyon.webp",
  },
  {
    name: "Zion Park",
    image: "ZionPark.webp",
  },
  {
    name: "Grand Canyon",
    image: "GrandCanyon.webp",
  },
  {
    name: "Las Vegas",
    image: "LasVegas.webp",
  },
  {
    name: "Yosemite",
    image: "Yosemite.webp",
  },
];

//DATI
const gridContainer = document.getElementById("grid-container");
const btnStart = document.getElementById("btn-start");
const scoreBox = document.getElementById("score-box");
// const errorMsg = document.getElementById("error-msg");
let counterFlip = 0;
let flippedCards = [];
let errors = 0;

//SVOLGIMENTO
// Al click sul bottone di start, l'array contenente le carte viene mescolato e le carte vengono inserite in griglia nell'ordine estratto
btnStart.addEventListener("click", function () {
  cards = shuffleCards(cards);
  scoreBox.innerHTML = `<h2>Punteggio</h2>
  <p id="error-msg">Errori: ${errors}</p>`;
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
  card.innerHTML = `<div class="card-inner">
    <div class="card-front">
      <img src="assets/img/USA.jpg" alt="Logo USA">
    </div>
    <div class="card-back">
      <h1>${cards[i].name}</h1>
      <img src="assets/img/${cards[i].image}" alt="${cards[i].name}"> 
    </div>
  </div>`;
  card.className = "card";
  card._cardID = i;

  // In ascolto dell'evento di click sulla card: al click, viene richiamata la funzione per girare la carta
  card.addEventListener("click", function () {
    counterFlip++;

    flipCard(card._cardID);
  });

  // Prima di procedere a girare la carta viene effettuato un controllo per verificare che sia la prima o seconda carta cliccata (per evitare utente clicchi più carte velocemente prima che venga effettuato il controllo di match sulla carte girate). Se il contatore delle carte girate è pari a 2, viene effettuato il controllo di match sulla carte
  function flipCard(i) {
    if (counterFlip < 3) {
      let cardInner = document.querySelectorAll(".card-inner");
      cardInner[i].style.webkitTransform = "rotateY(180deg)";

      flippedCards.push(card);

      if (counterFlip === 2) {
        setTimeout(checkCardsMatch, 1000);
      }
    }
  }

  return card;
}

// Verifica match delle card girate
function checkCardsMatch() {
  if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
    for (let flippedCard of flippedCards) {
      flippedCard.classList.add("block-click");
    }
  } else {
    errors++;
    for (let flippedCard of flippedCards) {
      let cardInner = flippedCard.querySelector(".card-inner");
      cardInner.style.webkitTransform = "rotateY(0)";
      scoreBox.innerHTML = `<h2>Punteggio</h2>
      <p id="error-msg">Errori: ${errors}</p>`;
    }
  }

  flippedCards = [];
  counterFlip = 0;
}
