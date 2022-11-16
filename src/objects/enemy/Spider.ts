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
        deathCallback: (spider: Spider) => void,
    ) {
        super(idleAnim);

        this.x = coords.x - this.width * 2;
        this.y = coords.y;

        this.scale.set(getRandomNumber(minScaleRetio, maxScaleRetio));

        if (getRandomBoolean()) {
            this.scale.x *= -1;
            this.x = coords.x + this.width / 1.5;
        }

        this.interactive = true;

        this.animationSpeed = getRandomNumber(minAnimSpeed, maxAnimSpeed);
        this.play();

        this.on('pointertap', () => {
            this.loop = false;
            this.interactive = false;

            deathCallback(this);

            this.textures = deathAnim;

            this.play();
            this.onComplete = () => setTimeout(() => {
                this.parent.removeChild(this)
            }, 500);
        })
    };
};