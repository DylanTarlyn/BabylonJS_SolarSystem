/// <reference path='./vendor/babylon.d.ts' />

//get canvas
const canvas = document.getElementById('renderCanvas');

//create BabylonJS engine
const engine = new BABYLON.Engine(canvas, true);

function createScene(){
    //create scene
    const scene = new BABYLON.Scene(engine);

    //create camera
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0,0,0), scene);

    //create light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);

    return scene;
}

//create scene
const scene = createScene();

engine.runRenderLoop(()=>{
    scene.render();
});

