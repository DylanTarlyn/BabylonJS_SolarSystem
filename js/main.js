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
    box.rotation.x =2;
    box.rotation.y =3;

    //create sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere('spere', {
        segments:32,
        diameter: 2,
    }, scene);
    sphere.position = new BABYLON.Vector3(3,0,0);
    sphere.scaling = new BABYLON.Vector3(1,1,1);

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

    //create material
    const material = new BABYLON.StandardMaterial('material',scene);
    material.diffuseColor = new BABYLON.Color3(1,0,1);

    const material2 = new BABYLON.StandardMaterial('material2',scene);
    material2.diffuseTexture = new BABYLON.Texture('assets/images/dark_rock.png', scene)

    sphere.material = material2

    box.material = material;

    return scene;
}

//create scene
const scene = createScene();

engine.runRenderLoop(()=>{
    scene.render();
});

