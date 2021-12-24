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

    const planetMaterial = new BABYLON.StandardMaterial('planetMaterial', scene);
    planetMaterial.diffuseTexture = new BABYLON.Texture('assets/images/sand.png', scene);
    planetMaterial.specularColor = BABYLON.Color3.Black();

    const speeds = [0.01, -0.01, -0.02]

    for (let i = 0; i < 3; i +=1){
        const planet = BABYLON.MeshBuilder.CreateSphere(`planet${i}`,{
            segments:16,
            diameter:1
        }, scene)
        planet.position.x = (2*i) + 4;

        planet.material = planetMaterial;

        planet.orbit = {
            radius: planet.position.x,
            speed: speeds[i],
            angle: 0
        };

        scene.registerBeforeRender(()=>{
            planet.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);
            planet.orbit.angle += planet.orbit.speed;
        });
    }
}


function createSkybox(scene){
    const skyboxMaterial = new BABYLON.StandardMaterial('skyboxMaterial', scene);
    skyboxMaterial.backFaceCulling = false;

    //remove reflections
    skyboxMaterial.specularColor = BABYLON.Color3.Black();
    skyboxMaterial.diffuseColor = BABYLON.Color3.Black();

    //texture
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('/assets/images/skybox/skybox', scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    const skybox = BABYLON.MeshBuilder.CreateBox('skybox', {
        size:1000
    }, scene)

    //move skybox with camera
    skybox.infiniteDistance = true;

    skybox.material = skyboxMaterial;
}

function createShip(scene){
    BABYLON.SceneLoader.ImportMesh('','assets/models/', 'spaceCraft1.obj', scene,(meshes)=>{
        console.log(meshes);
        meshes.forEach((mesh)=>{
            mesh.position = new BABYLON.Vector3(0,-5,10);
            mesh.scaling = new BABYLON.Vector3(0.2,0.2,0.2);
        });
    });
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

    //create skybox
    createSkybox(scene);

    //create ship
    createShip(scene);

    return scene;
}

//create scene
const scene = createScene();

engine.runRenderLoop(()=>{
    scene.render();
});

