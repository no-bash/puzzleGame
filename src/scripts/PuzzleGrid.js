import * as PIXI from "pixi.js";
import { PuzzleGridConfig } from "./PuzzleGridConfig";
import { PuzzlePiece } from "./PuzzlePiece";
import TWEEN from "@tweenjs/tween.js"
import { Globals, Emitter } from "./Globals";



export class PuzzleGrid {
    constructor() {
        this.container = new PIXI.Container();
        this.selectedPuzzle = []
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight / 2;
        this.container.sortableChildren = true;
        this.createPuzzlePieces();
    }

    createPuzzlePieces() {
    
        this.pieces = [];

        let ids = PuzzleGridConfig.map(field => field.id);

        PuzzleGridConfig.forEach(field => {
            const random = Math.floor(Math.random() * ids.length); // [0, 8]
            const id = ids[random];
            ids = ids.filter(item => item !== id);

            const piece = new PuzzlePiece(id, field);
            piece.on('dragend', () => this.onPieceDragEnd(piece));
            piece.sprite.on("pointerdown", () => {
                this.selectPuzzle(piece)
            })
            this.container.addChild(piece.sprite);
            this.pieces.push(piece);
        });
        
    }
    
    onPieceDragEnd(piece) {
        const pieceToReplace = this.pieces.find(item =>
            item !== piece &&
            // piece.center to the right of the left side
            piece.sprite.x >= item.left &&
            // piece.center to the left of the right side
            piece.sprite.x <= item.right &&
            // piece.center below the top side
            piece.sprite.y <= item.bottom &&
            // piece.center above the bottom side
            piece.sprite.y >= item.top
            
        ); 

        if (pieceToReplace) {
            const replaceField = pieceToReplace.field;
            pieceToReplace.setField(piece.field);
            piece.setField(replaceField);
            
        } else {
            piece.reset();
            
        }
    }

    
    selectPuzzle(elem) {
        // this.checkPuzzle()
        if (!this.selectedPuzzle.includes(elem) && this.selectedPuzzle.length < 2) {
            this.selectedPuzzle.push(elem)
            // console.log(elem)
            elem.puzzleBorder()
            if (this.selectedPuzzle.length === 2) {
                
                let sprite1 = this.selectedPuzzle[0].sprite,
                    sprite2 = this.selectedPuzzle[1].sprite
                let t = this.selectedPuzzle[0].field
                this.selectedPuzzle[0].field = this.selectedPuzzle[1].field
                this.selectedPuzzle[1].field = t 

                new TWEEN.Tween(sprite1).to({x: sprite2.x, y: sprite2.y,}, 100).start(Globals.app.time).onComplete( ()=>{
                    this.selectedPuzzle[0].puzzleBorderRemove()
                })
                new TWEEN.Tween(sprite2).to({x: sprite1.x, y: sprite1.y,}, 100).start(Globals.app.time).onComplete( ()=>{
                    this.selectedPuzzle[1].puzzleBorderRemove()
                    this.selectedPuzzle = []
                    this.checkPuzzle()
                })
            }
        }
    }
    checkPuzzle() {
        let count = 0
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].id === this.pieces[i].field.id) {
                count++
            }
        }
        if (count === 9) {
            Emitter.emit('win')
        }
    }
    anim() {
        new TWEEN.Tween(this.container).to({alpha : 0}, 400).start(Globals.app.time)
    }

    resize(){
        console.log('resize');
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight / 2;
        let s1 = window.innerWidth / this.container.width
        let s2 = window.innerHeight / this.container.height
        let scale
        if (s1 < s2){
            scale = s1
        }else{
            scale = s2
        }
        this.container.scale.set(scale)
    }
}