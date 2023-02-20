import { defineStore } from "pinia";

const newCardAPI =
  "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

const useGuesserStore = defineStore("GuesserStore", {
  state() {
    return {
      deckID: null,
      lastCard: null,
      loading: true,
      score: 0,
      currentGuess: null,
    };
  },
  getters: {
    drawCardAPI(state) {
      return `https://www.deckofcardsapi.com/api/deck/${state.deckID}/draw/?count=1`;
    },
  },
  actions: {
    init() {
      setTimeout(async () => {
        const { deck_id } = await fetch(newCardAPI).then((r) => r.json());
        this.deckID = deck_id;
        this.loading = false;
      }, 2000);
    },
    setGuess(color) {
      this.currentGuess = color;
    },
    async drawCard() {
      if (!this.deckID) {
        return;
      }
      const { cards } = await fetch(this.drawCardAPI)
        .then((r) => r.json())
        .catch((err) => {
          throw err;
        });
      this.lastCard = cards[0];

      const reds = ["HEARTS", "DIAMONDS"];
      const blacks = ["SPADES", "CLUBS"];

      const suit = cards[0].suit;

      if (
        (this.currentGuess === "RED" && reds.includes(suit)) ||
        (this.currentGuess === "BLACK" && blacks.includes(suit))
      ) {
        this.score++;
      }
    },
    async newDeckId() {
      const { deck_id } = await fetch(newCardAPI).then((r) => r.json());
      this.deckID = deck_id;
    },
  },
});

export default useGuesserStore;
