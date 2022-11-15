import { AnimatedSprite, Resource, Texture } from "pixi.js";
import { SpiderCoords } from "../../types/SpiderCoords";

const getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomBoolean = () => Math.random() < 0.5;;

const minAnimSpeed = 0.1;
const maxAnimSpeed = 0.2;
const minScaleRetio = 5;
const maxScaleRetio = 15;

export class Spider extends AnimatedSprite {
    constructor(
        coords: SpiderCoords,
        idleAnim: Texture<Resource>[],
        deathAnim: Texture<Resource>[],
    ) {
        super(idleAnim);

        this.x = coords.x;
        this.y = coords.y;

        this.scale.set(getRandomNumber(minScaleRetio, maxScaleRetio));
        if (getRandomBoolean()) {
            this.scale.x *= -1;
        }
        this.interactive = true;

        this.animationSpeed = getRandomNumber(minAnimSpeed, maxAnimSpeed);
        this.play();

        this.on('pointertap', () => {
            this.loop = false;
            this.interactive = true;

            this.textures = deathAnim;

            this.play();
            this.onComplete = () => setTimeout(() => {
                this.parent.removeChild(this)
            }, 500);
        })

        console.log(`${this.x}:${this.y}`);
    };
};