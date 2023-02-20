<script setup>
import { ref, computed, onBeforeMount } from "vue";
import Loader from "@/components/Loader.vue";

console.log("here 2");

const deckID = ref();
const lastCard = ref();
const loading = ref(true);

const score = ref(0);
const currentGuess = ref();

// Get the deck ID ✅
// Make a guess ✅
// Draw a card

const drawCardAPI = computed(() => {
  return `https://www.deckofcardsapi.com/api/deck/${deckID.value}/draw/?count=1`;
});

const newCardAPI =
  "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

onBeforeMount(() => {
  setTimeout(async () => {
    const { deck_id } = await fetch(newCardAPI).then((r) => r.json());
    deckID.value = deck_id;
    loading.value = false;
  }, 2000);
});

async function getNewDeckId() {
  const { deck_id } = await fetch(newCardAPI).then((r) => r.json());
  deckID.value = deck_id;
  console.log("set deckId to", deck_id);
}

async function drawCard() {
  if (!deckID.value) {
    return;
  }
  const { cards } = await fetch(drawCardAPI.value).then((r) => r.json());
  lastCard.value = cards[0];

  validateResult(cards[0].suit);
}

function validateResult(suit) {
  const reds = ["HEARTS", "DIAMONDS"];
  const blacks = ["SPADES", "CLUBS"];

  console.log("Validate", suit, currentGuess.value);

  if (currentGuess.value == "RED") {
    return reds.includes(suit) ? score.value++ : null;
  }
  return blacks.includes(suit) ? score.value++ : null;
}

// Validate the guess and update the score
</script>

<template>
  <h3>Current Score {{ score }}</h3>
  <h3>Current Guess {{ currentGuess }}</h3>
  <h3>Current Deck {{ deckID }}</h3>

  <Loader v-if="loading" />
  <div v-else>
    <button
      @click="
        () => {
          currentGuess = 'RED';
        }
      "
    >
      Guess Red
    </button>
    <button
      @click="
        () => {
          currentGuess = 'BLACK';
        }
      "
    >
      Guess Black
    </button>

    <button v-if="currentGuess" @click="drawCard">Draw Card</button>
    <button @click="getNewDeckId">Get New Deck</button>

    <img v-if="lastCard" :src="lastCard.image" height="150" />
  </div>
</template>
