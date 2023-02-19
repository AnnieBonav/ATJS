<template>
    <audio
        :muted="isMuted"
        @ended="
            () => {
                isPlaying = false;
            }
        "
        ref="audio"
    ></audio>
    <div class="max-w-screen min-h-screen w-screen bg-background p-6">
        <div class="flex flex-row space-x-10">
            <button
                class="text-xl rounded-lg p-2 bg-primary-900 mb-2"
                v-on:click="mute()"
            >
                <svg
                    v-if="isMuted"
                    width="25"
                    height="50"
                    viewBox="0 0 25 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.875 0L12.5 12.5H0V37.5H12.5L20.875 50H25V0H20.875Z"
                        fill="black"
                    />
                </svg>
                <svg
                    v-else
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.8964 0.879272L12.5214 13.3793H0.0213623V38.3793H12.5214L20.8964 50.8793H25.0214V0.879272H20.8964ZM31.2714 7.12927V13.3793C32.3339 13.3793 33.3964 13.5043 34.3964 13.7543C39.7714 15.1293 43.7714 20.0043 43.7714 25.8793C43.7714 31.7543 39.8339 36.6293 34.3964 38.0043C33.3964 38.2543 32.3339 38.3793 31.2714 38.3793V44.6293C32.8339 44.6293 34.2714 44.3793 35.7714 44.0668H35.9589C44.0839 42.0043 50.0214 34.6293 50.0214 25.8793C50.0214 17.1293 44.0839 9.75427 35.9589 7.69177C34.5214 7.31677 32.8964 7.12927 31.2714 7.12927ZM31.2714 19.6293V32.1293C31.8339 32.1293 32.3964 32.0668 32.8339 31.9418C35.5214 31.2543 37.5214 28.7543 37.5214 25.8793C37.5214 23.0043 35.5839 20.5043 32.8339 19.8168C32.3339 19.6918 31.7714 19.6293 31.2714 19.6293Z"
                        fill="black"
                    />
                </svg>
            </button>
            <button
                class="text-xl rounded-lg p-2 bg-primary-900 mb-2"
                v-on:click="restart(null)"
            >
                Restart
            </button>
            <h1 class="text-xl">Do you remember</h1>
            <h2 class="text-xl">Turn: {{ turns }}</h2>
        </div>
        <div class="grid grid-cols-4 gap-4">
            <div v-for="card in cards">
                <Card :data="card" v-on:click="clickCard(card)" />
            </div>
        </div>
        <h1>Cards left: {{ cardsLeft }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CardData, CardModel } from "./card-data/types";
import Card from "./components/Card.vue";
import cardset from "./card-data/cards";
import { shuffle } from "./card-data/utils";
import { ref } from "vue";

const audio = ref<any>(null);

const cards = cardset.reduce(
    (acc, curr) =>
        acc.concat([
            { info: curr, type: "author", isSelected: false },
            { info: curr, type: "song", isSelected: false },
        ]),
    <CardData[]>[]
);

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
            isPlaying: false,
            isMuted: false,
        };
    },
    methods: {
        mute: function () {
            this.isMuted = !this.isMuted;
        },
        restart: function (selection: boolean | null) {
            if (selection == null) {
                selection = window.confirm("Are you sure you want to restart?");
            }
            if (selection) {
                this.cards = shuffle(
                    cards.map((card) => {
                        return { ...card, isSelected: false };
                    })
                );
                this.counter, (this.turns = 0);
                this.cardsLeft = cards.length;
            }
        },
        won: function () {
            setTimeout(() => {
                //With no timeout the alert appears before the UI is updated
                const selection = window.confirm(
                    "You won, bitch! Click ok to restart and cancel if you want to admire your board."
                );
                this.restart(selection);
            }, 10);
        },
        playSound: function (src: string) {
            (this.$refs.audio as HTMLAudioElement).src = src;
            (this.$refs.audio as HTMLAudioElement).play();
        },
        stopSound: function () {
            this.isPlaying = false;
            (this.$refs.audio as HTMLAudioElement).pause();
        },
        clickCard: function (card: CardData) {
            if (card.isSelected || this.isWaiting) {
                return;
            }
            card.isSelected = true;
            if (card.type === "song") {
                this.playSound(`./assets/audios/${card.info.audioSrc}.mp3`);
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
                    this.won();
                }
            } else {
                this.isWaiting = true;
                setTimeout(() => {
                    if (this.openedCard) {
                        this.openedCard.isSelected = false;
                        this.stopSound();
                    }
                    card.isSelected = false;
                    this.openedCard = null;
                    this.isWaiting = false;
                }, 1000);
            }
        },
    },
});
</script>
