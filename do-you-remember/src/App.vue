<template>
    <ConfettiExplosion v-if="showConfetti" 
    ref="confetti"/>
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
        <Modal
            title="Restart"
            body="Do you want to try again?"
            @confirm="() => restart()"
            @cancel="() => setRestartModalState(false)"
            :show="showRestartModal"
            confirmPrompt="Yes, restart"
            cancelPrompt="Nah, cancel"
        />
        <Modal
            title="You won!"
            body="Wanna appreciate your finished board?"
            @confirm="() => restart()"
            @cancel="() => setVictoryModalState(false)"
            :show="showVictoryModal"
            confirmPrompt="I am good, New Game!"
            cancelPrompt="Yes."
        />

        <div class="flex flex-row space-x-10 mb-3 justify-center items-center">
            <button
                class="transform transition duration-200 hover:scale-110"
                v-on:click="setRestartModalState(true)"
            >
                <svg
                    width="50"
                    height="50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <path
                        d="M32.5 224H24c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L82.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L169 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H32.5z"
                    />
                </svg>
            </button>
            <h1 class="text-4xl flex-auto text-title">Do you remember</h1>
            <h2 class="text-xl">Turn: {{ turns }}</h2>
            <button
                class="transform transition duration-200 hover:scale-110"
                v-on:click="mute()"
            >
                <svg
                    class="mr-[26px]"
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
                    height="50"
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
        </div>
        <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            <div v-for="card in cards">
                <Card :data="card" v-on:click="clickCard(card)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CardData, CardModel } from "./card-data/types";
import Card from "./components/Card.vue";
import Modal from "./components/Modal.vue";
import cardset from "./card-data/cards";
import { shuffle } from "./card-data/utils";
import { nextTick, ref } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";

const audio = ref<any>(null);
const confetti = ref<any>(null);

const explode = async () => {
    confetti.value = false;
    await nextTick();
    confetti.value = true;
};

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
        Modal,
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
            showRestartModal: false,
            showVictoryModal: false,
            showConfetti: true,
        };
    },
    methods: {
        mute: function () {
            this.isMuted = !this.isMuted;
        },
        explodeConfetti: function(){

        },
        restart: function () {
            this.cards = shuffle(
                cards.map((card) => {
                    return { ...card, isSelected: false };
                })
            );
            this.counter, (this.turns = 0);
            this.cardsLeft = cards.length;
            this.setRestartModalState(false);
            this.setVictoryModalState(false);
        },
        setRestartModalState: function (state: boolean) {
            console.log("setting restart to", state);
            this.showRestartModal = state;
        },
        setVictoryModalState: function (state: boolean) {
            this.showVictoryModal = state;

        },
        won: function () {
            this.setVictoryModalState(true);
            //Confetti
            explode();
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
                this.stopSound();

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