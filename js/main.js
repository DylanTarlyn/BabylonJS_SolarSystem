/// <reference path='./vendor/babylon.d.ts' />

//get canvas
const canvas = document.getElementById('renderCanvas');

//create BabylonJS engine
const engine = new BABYLON.Engine(canvas, true);

function createCamera(scene){
    const camera = new BABYLON.ArcRotateCamera('camera', 0,0,15, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas);

    //limit movement
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 20;
}

function createLight(scene){
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);

    light.intensity = 0.5;
    light.groundColor = new BABYLON.Color3(0,0,1);
}

function createSun(scene){
    const sun = BABYLON.MeshBuilder.CreateSphere('sun', {
        segments:16,
        diameter:4
    }, scene);

    const sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene);
    sunMaterial.emissiveTexture = new BABYLON.Texture('/assets/images/sun.jpg',scene);
    sunMaterial.diffuseColor = BABYLON.Color3.Black();
    sunMaterial.specularColor = BABYLON.Color3.Black();

    sun.material = sunMaterial;

    //sunlight
    const sunlight = new BABYLON.PointLight('sunlight', BABYLON.Vector3.Zero(), scene)
    sunlight.intensity = 2;
}

function createPlanet(scene){
    const planet = BABYLON.MeshBuilder.CreateSphere('planet',{
        segments:16,
        diameter:1
    }, scene)
    planet.position.x = 4;

    const planetMaterial = new BABYLON.StandardMaterial('planetMaterial', scene);
    planetMaterial.diffuseTexture = new BABYLON.Texture('assets/images/sand.png', scene);
    planetMaterial.specularColor = BABYLON.Color3.Black();

    planet.material = planetMaterial;
}


function createScene(){
    //create scene
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.Black();

    //create camera
    createCamera();

    //create light
    createLight(scene);

    //create sun
    createSun(scene);

    //create planet
    createPlanet(scene);


    return scene;
}

//create scene
const scene = createScene();

engine.runRenderLoop(()=>{
    scene.render();
});

