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
    camera.upperRadiusLimit = 200;
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

    //text
    sun.actionManager = new BABYLON.ActionManager(scene);
    sun.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
        function(){
            alert("test");
        }));

}

function createEarth(scene){

    //Earth
    const earthMaterial = new BABYLON.StandardMaterial('earthMaterial', scene);
    earthMaterial.diffuseTexture = new BABYLON.Texture('assets/images/earth.jpg', scene);
    earthMaterial.specularColor = BABYLON.Color3.Black();

    const earth = BABYLON.MeshBuilder.CreateSphere('earth', {
        segments:16,
        diameter:1
    }, scene)

    earth.material = earthMaterial;

    earth.position.x = 5;
    earth.rotation.y = -23.5;
    earth.rotation.x = 180;

    earth.orbit = {
        radius: earth.position.x,
        speed: 0.01,
        angle: 0
    };

    earth.actionManager = new BABYLON.ActionManager(scene);
    earth.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
        function(){

        }));

        scene.registerBeforeRender(()=>{
            earth.position.x = earth.orbit.radius * Math.sin(earth.orbit.angle);
            earth.position.z = earth.orbit.radius * Math.cos(earth.orbit.angle);
            earth.orbit.angle += earth.orbit.speed;
        });
    }

function createMercury(scene){

    //Earth
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseTexture = new BABYLON.Texture('assets/images/mercury.jpg', scene);
    material.specularColor = BABYLON.Color3.Black();

    const mercury = BABYLON.MeshBuilder.CreateSphere('mercury', {
        segments:16,
        diameter:1
    }, scene)

    mercury.material = material;

    mercury.position.x = 3;

    mercury.orbit = {
        radius: mercury.position.x,
        speed: 0.01,
        angle: 0
    };

    mercury.actionManager = new BABYLON.ActionManager(scene);
    mercury.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
        function(){

        }));

        scene.registerBeforeRender(()=>{
            mercury.position.x = mercury.orbit.radius * Math.sin(mercury.orbit.angle);
            mercury.position.z = mercury.orbit.radius * Math.cos(mercury.orbit.angle);
            mercury.orbit.angle += mercury.orbit.speed;
        });
    }

function createVenus(scene){
    //Earth
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseTexture = new BABYLON.Texture('assets/images/venus.jpg', scene);
    material.specularColor = BABYLON.Color3.Black();

    const planet = BABYLON.MeshBuilder.CreateSphere('mercury', {
        segments:16,
        diameter:1
    }, scene)

    planet.material = material;

    planet.position.x = 4;

    planet.orbit = {
        radius: planet.position.x,
        speed: 0.01,
        angle: 0
    };

    planet.actionManager = new BABYLON.ActionManager(scene);
    planet.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
        function(){

        }));

        scene.registerBeforeRender(()=>{
            planet.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);
            planet.orbit.angle += planet.orbit.speed;
        });
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

    //create planets
    createMercury(scene);
    createEarth(scene);
    createVenus(scene);

    //create skybox
    createSkybox(scene);

    //create ship
   // createShip(scene);

   

    return scene;
}

//create scene
const scene = createScene();

engine.runRenderLoop(()=>{
    scene.render();
});

