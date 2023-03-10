export interface CardModel {
    text: string;
    key: string;
    audioSrc: string;
}

type CardType = "author" | "song";

export interface CardData {
    type: CardType;
    info: CardModel;
    isSelected: boolean;
}
