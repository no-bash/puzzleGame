import * as PIXI from "pixi.js";
import { Globals, Emitter } from "./Globals";
import { PuzzleGrid } from "./PuzzleGrid";
import { Packshot } from "./Packshot";

export class MainScene {
    constructor() {
        this.container = new PIXI.Container()
        this.createBackground()
        this.createPuzzleGrid()
        Emitter.on('win', () => {
            this.final()
        })

        window.addEventListener('resize', ()=>{
            this.resize()
        })
    }

    createBackground() {
        this.bg = new PIXI.Sprite(Globals.resources["bg"].texture);
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }

    createPuzzleGrid() {
        this.grid = new PuzzleGrid();
        this.container.addChild(this.grid.container);
    }

    final(){
        const packshot = new Packshot();
        this.container.addChild(packshot.container);
        this.grid.anim()
    }
    
    resize(){
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.grid.resize();
    }
}