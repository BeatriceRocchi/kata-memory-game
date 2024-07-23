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
];

//DATI
const gridContainer = document.getElementById("grid-container");
const btnStart = document.getElementById("btn-start");

//SVOLGIMENTO
// Al click sul bottone di start, l'array contenente le carte viene mescolato e le carte vengono inserite in griglia nell'ordine estratto
btnStart.addEventListener("click", function () {
  cards = shuffleCards(cards);

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
  for (let i = 1; i <= cards.length; i++) {
    const card = createCard(i);

    gridContainer.append(card);
  }
}

function createCard(i) {
  const card = document.createElement("div");
  // card.innerHTML = cards[i].name;
  card.className = "card";

  card.addEventListener("click", function () {
    console.log("cliccata", i);
  });

  return card;
}
