import { Application, Sprite, settings, SCALE_MODES } from 'pixi.js'
import { Spider } from './objects/enemy/Spider';
import { ScoreText } from './objects/ScoreText';
import { SpiderCoords } from './types/SpiderCoords';

type Spiders = {
	spidersArray: Spider[],
};

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	resizeTo: window,
});

settings.SCALE_MODE = SCALE_MODES.NEAREST;

let background: Sprite;
const spiders: Spiders = { spidersArray: []};


app.loader
	.onError.add((error) => console.log(error));
app.loader
	.add('background.png')
	.add('spider', 'spider.json')
	.add('enemiesList', 'enemiesList.json')
	.load(setup);

function setup() {
	let resources = app.loader.resources;

	let spiderSpriteSheet = resources.spider.spritesheet;

	background = new Sprite(resources['background.png'].texture);

	const spidersCoords: SpiderCoords[] = resources.enemiesList.data.enemies;

	const spawnCount = spidersCoords.length;
	const score = new ScoreText(
		spawnCount,
		(left: number) => `Enemies: ${left}`,
	);

	const handleSpiderDeath = (spider: Spider) => {
		spider.setParent
		spiders.spidersArray = spiders.spidersArray.filter((currentSpider) => currentSpider !== spider);
		score.setText(spiders.spidersArray.length);
	}

	if (spiderSpriteSheet?.animations.spiderIdle && spiderSpriteSheet?.animations.spiderDeath) {
		for (const coords of spidersCoords) {
			spiders.spidersArray.push(new Spider(
				coords,
				spiderSpriteSheet.animations.spiderIdle,
				spiderSpriteSheet?.animations.spiderDeath,
				handleSpiderDeath,
			));
		}
	}

	app.stage.addChild(background);
	app.stage.addChild(score);
	app.stage.addChild(...spiders.spidersArray);



	app.stage.scale.x = app.view.width / background.width;
	app.stage.scale.y = app.view.height / background.height;
}
