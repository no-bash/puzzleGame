import * as PIXI from "pixi.js";

export const Globals = {
    resources: {}
};
export const Emitter = new PIXI.utils.EventEmitter()


// const myLoader = PIXI.Loader.shared
// const spritesheetGP = new PIXI.Spritesheet(baseTextureGP, gameJSON)

// myLoader.resources['font'] = spritesheetGP

// spritesheetGP.parse(() => { })

// let arrow  = new PIXI.Sprite(resources['font'].textures['BQ'])