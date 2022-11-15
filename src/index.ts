import { Application, Sprite, settings, SCALE_MODES } from 'pixi.js'
import { Spider } from './objects/enemy/Spider';
import { SpiderCoords } from './types/SpiderCoords';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	width: 1000,
	height: 650
});

settings.SCALE_MODE = SCALE_MODES.NEAREST;

const spidersCoords: SpiderCoords[] = [
	{
		x: 100,
		y: 100,
	},
	{
		x: 200,
		y: 200,
	},
];

let background: Sprite;
const spiders: Spider[] = [];

// load the sprite, call setup() when completed
app.loader
	.onError.add((error) => console.log(error));
app.loader
	.add('background.png')
	.add('spider', 'spider.json')
	.load(setup);

function setup() {
	let resources = app.loader.resources;

	let spiderSpriteSheet = resources.spider.spritesheet;

	// initialize background sprite
	background = new Sprite(resources['background.png'].texture);

	if (spiderSpriteSheet?.animations.spiderIdle && spiderSpriteSheet?.animations.spiderDeath) {
		for (const coords of spidersCoords) {
			spiders.push(new Spider(
				coords,
				spiderSpriteSheet.animations.spiderIdle,
				spiderSpriteSheet?.animations.spiderDeath
			));
		}
	}

	app.stage.addChild(background);
	app.stage.addChild(...spiders);

	// scale stage container that it fits into the view
	app.stage.scale.x = app.view.width / background.width;
	app.stage.scale.y = app.view.height / background.height;
}