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


const arr = [1, 2, 3];
</script>

<template>
  <div class="min-h-screen w-screen bg-background">
    <div class="flex flex-wrap flex-row">
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
    methods: {
        clickCard: function (card: CardData) {
            card.isSelected = !card.isSelected
            console.log(card.isSelected)
        }
    }
});
</script>