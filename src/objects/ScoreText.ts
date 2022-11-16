import { Text, TextStyle } from 'pixi.js';

export class ScoreText extends Text{
    setText: (score: number) => void;

    constructor(
        initiateValue: number,
        getTextCallback: (
            initiate: number,
        ) => string) {
        super(getTextCallback(initiateValue));
        this.x = 1300;
        this.y = 10;
        this.style = new TextStyle({
            fill: 0xFFFFFF,
            fontSize: 128,
            fontWeight: 'bold',
        });

        this.setText = function (score: number) {
            this.text = getTextCallback(score);
        };
    };
}