/// <reference path='./vendor/babylon.d.ts' />

//get canvas
const canvas = document.getElementById('renderCanvas');

//create BabylonJS engine
const engine = new BABYLON.Engine(canvas, true);

function createScene(){
    //create scene
    const scene = new BABYLON.Scene(engine);

    //create camera
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0,0,-10), scene);
    camera.attachControl(canvas, true);

    //create light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);

    //create box
    const box = BABYLON.MeshBuilder.CreateBox('box', {
        size: 1
    }, scene);

    //create sphere
    const spere = BABYLON.MeshBuilder.CreateSphere('spere', {
        segments:32,
        diameter: 2,
    }, scene);
    spere.position = new BABYLON.Vector3(3,0,0);

    //create plane
    const plane = BABYLON.MeshBuilder.CreatePlane('plane', {}, scene);
    plane.position = new BABYLON.Vector3(-3,0,0);

    //create line

    const points = [
        new BABYLON.Vector3(2,0,0),
        new BABYLON.Vector3(2,1,1),
        new BABYLON.Vector3(2,1,0),
    ];

    const lines = BABYLON.MeshBuilder.CreateLines('lines', {
        points
    }, scene)


    return scene;
}

//create scene
const scene = createScene();

engine.runRenderLoop(()=>{
    scene.render();
});

