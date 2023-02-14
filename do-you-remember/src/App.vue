<template>
  <audio
  :src="currentAudio"
  @ended="
      () => {
        isPlaying = false;
      }
    "
  ref="audio"></audio>
  <div class="max-w-screen min-h-screen w-screen bg-background p-6">
    <div class="flex flex-row space-x-10">
      <button class="text-xl rounded-lg p-2 bg-primary-900 mb-2" v-on:click="restart(null)">Restart</button>
      <h1 class="text-xl">Do you remember</h1>
      <h2 class="text-xl">Turn: {{ turns }}</h2>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="card in cards">
        <Card :data="card" v-on:click="clickCard(card)" />
      </div>
    </div>
    <h1>Cards left: {{ cardsLeft }}</h1>
    <button @click="playSound">Play</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CardData, CardModel } from "./card-data/types";
import Card from "./components/Card.vue"
import cardset from "./card-data/cards";
import { shuffle } from "./card-data/utils"
import { ref } from 'vue';

const audio = ref<any>(null);

const cards = cardset.reduce(
  (acc, curr) =>
    acc.concat([
      { info: curr, type: "author", isSelected: false },
      { info: curr, type: "song", isSelected: false },
    ]),
  <CardData[]>[]
)

export default defineComponent({
  components: {
    Card,
  },

  data() {
    return {
      cards: shuffle(cards),
      turns: 0,
      cardsLeft: cards.length,
      openedCard: null as CardData | null,
      counter: 0,
      isWaiting: false,
      currentAudio: `./assets/audios/Hadestown_ComeHome.mp3`,
      //myAudio: audio,
      //theAudio: ref(null),
      isPlaying: false,
    };
  },
  methods: {
    restart: function (selection: boolean | null) {
      if (selection == null) {
        selection = window.confirm("Are you sure you want to restart?");
      }
      if (selection) {
        this.cards = shuffle(cards.map(card => {
          return { ...card, isSelected: false }
        }));
        this.counter, this.turns = 0;
        this.cardsLeft = cards.length;
      }
    },
    won: function () {
      setTimeout(() => { //With no timeout the alert appears before the UI is updated
        const selection = window.confirm("You won, bitch! Click ok to restart and cancel if you want to admire your board.");
        this.restart(selection);
        }, 10);
    },
    playSound: function(){
      (this.$refs.audio as HTMLAudioElement).play();
      setTimeout(() => { //With no timeout the alert appears before the UI is updated
        this.stopSound();
        }, 5000);
    },
    stopSound: function(){
      this.isPlaying = false;
      (this.$refs.audio as HTMLAudioElement).pause();

    },
    clickCard: function (card: CardData) {
      if (card.isSelected || this.isWaiting) {
        return;
      }
      card.isSelected = true;
      if(card.type === "song"){
        this.currentAudio = `./assets/audios/${card.info.audioSrc}.mp3`
        console.log("Song: ", this.currentAudio);
        this.playSound();
      }
      if (!this.openedCard) {
        this.openedCard = card;
        return;
      }

      this.turns++;

      if (this.openedCard.info.key === card.info.key) {
        this.cardsLeft -= 2;
        this.openedCard = null;

        if (this.cardsLeft <= 0) {
          this.won()
        }
      } else {
        this.isWaiting = true;
        setTimeout(() => {
          if (this.openedCard) {
            this.openedCard.isSelected = false;
          }
          card.isSelected = false;
          this.openedCard = null;
          this.isWaiting = false;
        }, 1000);
      }
    }
  }
});
</script>