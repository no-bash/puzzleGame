import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import TWEEN from "@tweenjs/tween.js"


export class PuzzlePiece extends PIXI.utils.EventEmitter {
    constructor(id, field) {
        super();
        this.id = id
        this.sprite = new PIXI.Sprite(Globals.resources[`puzzle${id}`].texture);
        this.sprite.x = field.x;
        this.sprite.y = field.y;
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5);
        this.field = field;

        this.sprite.interactive = true;
        // this.setInteractive();
        
    }

    setInteractive() {
        this.sprite.interactive = true;
        this.sprite.on("pointerdown", this.puzzleBorder, this);
        this.sprite.on("pointermove", this.onTouchMove, this);
        this.sprite.on("pointerup", this.onTouchEnd, this);
    }

    onTouchStart(event) {
        // 1. save the position of the mouse cursor
        this.touchPosition = {x: event.data.global.x, y: event.data.global.y};

        // 2. set the dragging state for this sprite
        this.dragging = true;
        this.sprite.zIndex = 2;
    }

    onTouchMove(event) {
        if (!this.dragging) {
            return;
        }

        // 1. get the coordinates of the cursor
        const currentPosition = {x: event.data.global.x, y: event.data.global.y};

        // 2. calculate the offset 
        const offsetX = currentPosition.x - this.touchPosition.x;
        const offsetY = currentPosition.y - this.touchPosition.y;

        // 3. apply the resulting offset
        this.sprite.x = this.field.x + offsetX;
        this.sprite.y = this.field.y + offsetY;
    }

    reset() {
        this.sprite.x = this.field.x;
        this.sprite.y = this.field.y;
    }

    onTouchEnd() {
        this.dragging = false;
        this.sprite.zIndex = 1;
        this.emit("dragend");
    }

    get left() {
        return this.sprite.x - this.sprite.width / 2;
    }

    get right() {
        return this.sprite.x + this.sprite.width / 2;
    }

    get top() {
        return this.sprite.y - this.sprite.height / 2;
    }

    get bottom() {
        return this.sprite.y + this.sprite.height / 2;
    }

    setField(field) {
        this.field = field;
        this.reset();
    }
    puzzleBorder(){
        
        this.sprite.tint = 0x555555;

    }

    puzzleBorderRemove() {
        this.sprite.tint = 0xffffff;

    }
}