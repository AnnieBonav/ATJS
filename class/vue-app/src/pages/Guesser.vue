<script setup>
import { onBeforeMount } from "vue";
import Loader from "@/components/Loader.vue";
import useGuesserStore from "@/stores/GuesserStore";

const store = useGuesserStore();

onBeforeMount(() => store.init());
</script>

<template>
  <h3>Current Score {{ store.score }}</h3>
  <h3>Current Guess {{ store.currentGuess }}</h3>

  <Loader v-if="store.loading" />
  <div v-else>
    <h3>Current Deck {{ store.deckID }}</h3>
    <button
      @click="
        () => {
          store.currentGuess = 'RED';
        }
      "
    >
      Guess Red
    </button>
    <button
      @click="
        () => {
          store.currentGuess = 'BLACK';
        }
      "
    >
      Guess Black
    </button>

    <button v-if="store.currentGuess" @click="store.drawCard">Draw Card</button>
    <button @click="store.newDeckId">Get New Deck</button>

    <img v-if="store.lastCard" :src="store.lastCard.image" height="150" />
  </div>
</template>
