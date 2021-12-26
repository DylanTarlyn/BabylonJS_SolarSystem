/// <reference path='./vendor/babylon.d.ts' />

// TO DO:
// Menu to snap to planet
// Snap tp planet on click
// Display planet facts
// Change orbit speed
// Make earth spin
// Add moon
// Show orbit lines

//get canvas
const canvas = document.getElementById('renderCanvas');

//create BabylonJS engine
const engine = new BABYLON.Engine(canvas, true);


function createCamera(scene){

    const camera = new BABYLON.ArcRotateCamera('camera', 0,0,15, BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    //limit movement
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 500;
}

function createLight(scene){
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);

    light.intensity = 0.5;
    light.groundColor = new BABYLON.Color3(0,0,1);
}

function createSun(scene){
    const sun = BABYLON.MeshBuilder.CreateSphere('sun', {
        segments:16,
        diameter:5
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

// Planet oribital speeds

// multiplier .0002089 * 1.5
//47.87 * .0002089 * 1.5 = .0150 Mercury
//35.02 .00731568 = .0110 Venus
//29.78 .00622104 = .0093 Earth
//24.077 .00502969 = .0075 Mars
//13.07 .00273032 = .0041 Jupiter
//9.69 .00202424 = .0030 Staurn
//6.81 .00142261 = .0021 Uranus
//5.43 .00113433 = .0017 Neptune

// Planet distances - upper limit 500

// 35.98 Mercury 6.467
// 67.24 Venus 12.037
// 92.96 Earth 16.642
// 141.6 Mars 25.349
// 483.8 Jupiter 86.609
// 890.8 Saturn 159.470
// 1,784 Uranus 319.370
// 2,793 Neptune 500

//planet sizes - upper limit 5 / .11555
// sun 432.69 5
// 15.16 mercury .17517
// 37.60 venus .63447
// 39.59 earth .45746
// 21.06 mars .24335
// 43.441 jupiter .50196
// 36.84 saturn .45687
// 157.59 uranus 1.82095
// 152.99 neptune 1.77799

var s = 1;

function setSpeed(speed){
    s = speed;
    return s;
}

function createMercury(scene){

    //Earth
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseTexture = new BABYLON.Texture('assets/images/mercury.jpg', scene);
    material.specularColor = BABYLON.Color3.Black();

    const mercury = BABYLON.MeshBuilder.CreateSphere('mercury', {
        segments:16,
        diameter:.17517
    }, scene)

    mercury.material = material;

    mercury.position.x = 6.467;

    mercury.orbit = {
        radius: mercury.position.x,
        speed: 0.015,
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

    const planet = BABYLON.MeshBuilder.CreateSphere('venus', {
        segments:16,
        diameter:.63447
    }, scene)

    planet.material = material;

    planet.position.x = 12.037;

    planet.orbit = {
        radius: planet.position.x,
        speed: .0110,
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
function createEarth(scene){

    //Earth
    const earthMaterial = new BABYLON.StandardMaterial('earthMaterial', scene);
    earthMaterial.diffuseTexture = new BABYLON.Texture('assets/images/earth.jpg', scene);
    earthMaterial.specularColor = BABYLON.Color3.Black();

    var earth = BABYLON.MeshBuilder.CreateSphere('earth', {
        segments:16,
        diameter:.45746
    }, scene)

    earth.material = earthMaterial;

    earth.position.x = 16.642;
    earth.rotation.y = 11.75;
    earth.rotation.x = 180;

    earth.orbit = {
        radius: earth.position.x,
        speed: .0093,
        angle: 0
    };

    earth.actionManager = new BABYLON.ActionManager(scene);
    earth.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
        function(){
            const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3.Zero(), scene);
            camera.setTarget(earth);
            scene.activeCamera = camera;
            scene.activeCamera.attachControl(canvas, true);
            camera.lowerRadiusLimit = 1.5;
            camera.upperRadiusLimit = 500;

        }));

        scene.registerBeforeRender(()=>{
            earth.position.x = earth.orbit.radius * Math.sin(earth.orbit.angle);
            earth.position.z = earth.orbit.radius * Math.cos(earth.orbit.angle);

            earth.orbit.speed = .0093 * s;
            console.log(earth.orbit.speed);
            console.log(s);
            earth.orbit.angle += earth.orbit.speed;
        });
    }
function createMars(scene){
    //Earth
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseTexture = new BABYLON.Texture('assets/images/mars.jpg', scene);
    material.specularColor = BABYLON.Color3.Black();

    const planet = BABYLON.MeshBuilder.CreateSphere('mars', {
        segments:16,
        diameter:.24335
    }, scene)

    planet.material = material;

    planet.position.x = 25.349;

    planet.orbit = {
        radius: planet.position.x,
        speed: .0075,
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
function createJupiter(scene){
    //Earth
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseTexture = new BABYLON.Texture('assets/images/jupiter.jpg', scene);
    material.specularColor = BABYLON.Color3.Black();

    const planet = BABYLON.MeshBuilder.CreateSphere('jupiter', {
        segments:16,
        diameter:.50196
    }, scene)

    planet.material = material;

    planet.position.x = 86.609;

    planet.orbit = {
        radius: planet.position.x,
        speed: .0041,
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
function createSaturn(scene){
    //Earth
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseTexture = new BABYLON.Texture('assets/images/saturn.jpg', scene);
    material.specularColor = BABYLON.Color3.Black();

    const planet = BABYLON.MeshBuilder.CreateSphere('saturn', {
        segments:16,
        diameter:.45687
    }, scene)

    planet.material = material;

    planet.position.x = 159.470;

    planet.orbit = {
        radius: planet.position.x,
        speed: .0030,
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
function createUranus(scene){
    //Earth
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseTexture = new BABYLON.Texture('assets/images/uranus.jpg', scene);
    material.specularColor = BABYLON.Color3.Black();

    const planet = BABYLON.MeshBuilder.CreateSphere('uranus', {
        segments:16,
        diameter:1.82095
    }, scene)

    planet.material = material;

    planet.position.x = 319.370;

    planet.orbit = {
        radius: planet.position.x,
        speed: .0021,
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
function createNeptune(scene){
    //Earth
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseTexture = new BABYLON.Texture('assets/images/neptune.jpg', scene);
    material.specularColor = BABYLON.Color3.Black();

    const planet = BABYLON.MeshBuilder.CreateSphere('neptune', {
        segments:16,
        diameter:1.77799
    }, scene)

    planet.material = material;

    planet.position.x = 500;

    planet.orbit = {
        radius: planet.position.x,
        speed: .0015,
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

function createPlanets(scene){
    createMercury(scene);
    createVenus(scene);
    createEarth(scene);
    createMars(scene);
    createJupiter(scene);
    createSaturn(scene);
    createUranus(scene);
    createNeptune(scene);
}

function createGUI(){
    var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    //pause button
    var pause = BABYLON.GUI.Button.CreateSimpleButton("pause", "Pause");
    pause.width = "150px"
    pause.height = "40px";
    pause.top = "-45%";
    pause.left= "";
    pause.color = "white";
    pause.cornerRadius = 20;
    pause.background = "green";
    pause.onPointerUpObservable.add(function() {
        let speed = 0
        setSpeed(speed);
    });

    //Quarter speed
    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", ".25 Speed");
    button2.width = "150px"
    button2.height = "40px";
    button2.top = "-30%";
    button2.left= "";
    button2.color = "white";
    button2.cornerRadius = 20;
    button2.background = "green";
    button2.onPointerUpObservable.add(function() {
        let speed = .25
        setSpeed(speed);
    });

    gui.addControl(pause);
    gui.addControl(button2);
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
    createPlanets(scene);

    //create skybox
    createSkybox(scene);

    //creat GUI
    createGUI();

    return scene;
}

//create scene
const scene = createScene();

engine.runRenderLoop(()=>{
    scene.render();
});

