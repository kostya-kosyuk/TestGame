import { AnimatedSprite, Resource, Texture } from "pixi.js";
import { SpiderCoords } from "../../types/SpiderCoords";

export class Spider extends AnimatedSprite {
    constructor(
        coords: SpiderCoords,
        idleAnim: Texture<Resource>[],
        deathAnim: Texture<Resource>[],
    ) {
        super(idleAnim);

        this.x = coords.x;
        this.y = coords.y;

        this.scale.set(10);
        this.interactive = true;

        this.animationSpeed = 0.15;
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
    };
};