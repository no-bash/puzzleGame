import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { MainScene } from "./MainScene";
import { PuzzleGrid } from "./PuzzleGrid";
import { Emitter } from "./Globals";
import TWEEN from '@tweenjs/tween.js'
import { Globals } from "./Globals";

export class Packshot{
    constructor(){
        this.container = new PIXI.Container();
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight / 2;
        
        this.createPackshot();
    }
    createPackshot(){
        const style = new PIXI.TextStyle({
            fontFamily: 'BQ',
            fontSize: 30,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['#B7E7FA', '#B7E7FA'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });


        this.basicText = new PIXI.Text('Победа', style); 
        
        this.container.addChild(this.basicText)
        console.log(this.basicText)
        this.basicText.anchor.set(0.5)

        console.log(this.basicText);
        new TWEEN.Tween(this.basicText).to({scale: {x: 1.5, y: 1.5}}, 400).start(Globals.app.time)


        



        console.log('packshot');
    }
    anim() {
        console.log('услышал, что ты кликнул')
    }
}