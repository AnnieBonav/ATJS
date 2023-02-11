<template>
  <div class="max-w-screen min-h-screen w-screen bg-background p-6">
    <div>
      <h1>Turns: {{ turns }}</h1>
      <h1>Cards left: {{ cardsLeft }}</h1>
      <h1>Counter: {{ counter }}</h1>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="card in cards">
        <Card :data="card" v-on:click="clickCard(card)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CardData, CardModel } from "./card-data/types";
import Card from "./components/Card.vue"
import cardset from "./card-data/cards";
import { shuffle } from "./card-data/utils"
import cards from "./card-data/cards";

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

  data(){
    return {
      cards: shuffle(cards),
      turns: 0,
      cardsLeft: cards.length,
      openedCard: null as CardData | null,
      counter : 0,
      isWaiting: false,
    };
  },
    methods: {
        clickCard: function (card: CardData) {
          if(card.isSelected || this.isWaiting){ //Card is already selected or I am waiting and they are being supper annoying
            return;
          }
          this.counter ++;
          card.isSelected = true; //Select card

          if(!this.openedCard){ //Checks if it is null, if it is it is the first one to be opened
            this.openedCard = card;
            console.log("Here  ", this.openedCard);
            return;
          }

          this.turns++; //A second one was selected, so the turn is done

          if(this.openedCard.card.key === card.card.key){ //If they belong to the same author
            this.cardsLeft -=2;
            this.openedCard = null;
            return;
          }else {
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