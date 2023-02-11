<script setup lang="ts">
import Card from "./components/Card.vue"
import cardset from "./card-data/cards";
import { CardData } from "./card-data/types";

const cards = cardset.reduce(
  (acc, curr) =>
    acc.concat([
      { card: curr, type: "author", isSelected: false },
      { card: curr, type: "song", isSelected: false },
    ]),
  <CardData[]>[]
)

</script>

<template>
  <div class="min-h-screen w-screen bg-background">
    <div>
      <h1>Turns: {{ turns }}</h1>
    </div>
    <div class="flex flex-column flex-wrap gap-4">
      <div v-for="card in cards">
        <Card :data="card" v-on:click="clickCard(card)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        data: {
            type: Object as PropType<CardData>,
            required: true,
        },
    },
    data(){
      return {
        turns: 0,
        cardsLeft: 0,
      };
    },
    methods: {
        clickCard: function (card: CardData) {
          card.isSelected = !card.isSelected
          this.turns += 1
          console.log(card.isSelected, " ", card.type)
          return;
        }
    }
});
</script>