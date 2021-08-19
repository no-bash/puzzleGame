import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { MainScene } from "./MainScene";
import { PuzzleGrid } from "./PuzzleGrid";
import { Globals } from "./Globals";
import TWEEN from "@tweenjs/tween.js";


export class App {
    run() {
        // create canvas
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight
        });
        document.body.appendChild(this.app.view);
        this.time = 0.0
        Globals.app = this
        // load sprites
        this.loader = new Loader(this.app.loader);
        this.loader.preload().then(() => this.start());
        console.log(this.app)
    }
    start() {
        this.scene = new MainScene();
        this.app.stage.addChild(this.scene.container);
        this.app.ticker.add(()=>{
            let deltaTime = this.app.ticker.deltaMS
            this.time += deltaTime
            TWEEN.update(this.time)
        })
    }
}