<script setup>
import { ref, computed } from 'vue';

console.log('here 2');

const deckID = "681glf5wrfni";
const lastCard = ref(null);

const score = ref(0);
const currentGuess = ref();

// Get the deck ID ✅
// Make a guess ✅
// Draw a card

const drawCardAPI = computed(() => {
  return `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;
});

async function drawCard() {
  const { cards } = await fetch(drawCardAPI.value).then((r) => r.json());
  lastCard.value = cards[0];

  validateResult(cards[0].suit);
}

function validateResult(suit) {
  const reds = ['HEARTS', 'DIAMONDS'];
  const blacks = ['SPADES', 'CLUBS'];

  console.log('Validate', suit, currentGuess.value);

  if (currentGuess.value == 'RED') {
    return reds.includes(suit) ? score.value++ : null;
  }
  return blacks.includes(suit) ? score.value++ : null;
}

// Validate the guess and update the score
</script>

<template>
  <h3>Current Score {{ score }}</h3>
  <h3>Current Guess {{ currentGuess }}</h3>

  <button
    @click="
      () => {
        currentGuess = 'RED';
      }
    ">
    Guess Red
  </button>
  <button
    @click="
      () => {
        currentGuess = 'BLACK';
      }
    ">
    Guess Black
  </button>

  <button v-if="currentGuess" @click="drawCard">Draw Card</button>

  <img v-if="lastCard" :src="lastCard.image" height="150" />
</template>
