<template>
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
    <h1>Counter: {{ counter }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CardData, CardModel } from "./card-data/types";
import Card from "./components/Card.vue"
import cardset from "./card-data/cards";
import { shuffle } from "./card-data/utils"

const cards = cardset.reduce(
  (acc, curr) =>
    acc.concat([
      { card: curr, type: "author", isSelected: false },
      { card: curr, type: "song", isSelected: false },
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
    };
  },
  methods: {
    restart: function (selection: boolean | null) {
      if(selection == null){ //Checks if null?
        console.log("I am null");
        selection = window.confirm("Are you sure you want to restart?");
      }
      if (selection) {
        this.cards = cards.map(card => {
          return { ...card, isSelected: false }
        });
        this.counter = 0;
        this.turns = 0;
        this.cards = shuffle(this.cards);
        this.cardsLeft = cards.length;
      }
    },
    won: function () {
      const selection = window.confirm("You won, bitch! Click ok to restart and cancel if you want to admire your board.");
      this.restart(selection);
    },
    clickCard: function (card: CardData) {
      if (card.isSelected || this.isWaiting) { //Card is already selected or I am waiting and they are being supper annoying
        return;
      }
      this.counter++;
      card.isSelected = true; //Select card

      if (!this.openedCard) { //Checks if it is null, if it is it is the first one to be opened
        this.openedCard = card;
        return;
      }

      this.turns++; //A second one was selected, so the turn is done

      if (this.openedCard.card.key === card.card.key) { //If they belong to the same author
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