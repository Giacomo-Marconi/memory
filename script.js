// Array di carte
const cardsArray = [
    { id: 0, img: 'icons/A.png' },
    { id: 1, img: 'icons/B.png' },
    { id: 2, img: 'icons/C.png' },
    { id: 3, img: 'icons/D.png' },
    { id: 4, img: 'icons/E.png' },
    { id: 5, img: 'icons/F.png' },
    { id: 0, img: 'icons/A.png' },
    { id: 1, img: 'icons/B.png' },
    { id: 2, img: 'icons/C.png' },
    { id: 3, img: 'icons/D.png' },
    { id: 4, img: 'icons/E.png' },
    { id: 5, img: 'icons/F.png' }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;
const totalPairs = cardsArray.length / 2;


const movesCounter = document.getElementById('moves');


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCardElement(cardData) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', cardData.id);

    const img = document.createElement('img');
    img.src = cardData.img;
    card.appendChild(img);

    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (lockBoard || card === firstCard) return;

    card.classList.add('flipped');
    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++; 
    movesCounter.innerText = `Moves: ${moves}`;

    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.getAttribute('data-id') === secondCard.getAttribute('data-id');

    if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                alert(`Congratulations! You won in ${moves} moves!`);
            }, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame() {
    console.log('Restarting game...');
    const grid = document.getElementById('game-grid');
    grid.innerHTML = '';
    moves = 0; 
    matchedPairs = 0;
    movesCounter.innerText = `Moves: 0`;
    shuffle(cardsArray).forEach(cardData => {
        const cardElement = createCardElement(cardData);
        grid.appendChild(cardElement);
    });
}

document.getElementById('restart-btn').addEventListener('click', restartGame);

window.onload = restartGame;

