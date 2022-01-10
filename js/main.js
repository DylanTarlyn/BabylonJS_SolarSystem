/// <reference path='./vendor/babylon.d.ts' />

// TO DO:
// Display planet facts
// Make planets spin
// Add moon
// Show orbit lines
// Change render distance
// Change zoom increments

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

    //Button to zoom to planet
    var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var zoom = BABYLON.GUI.Button.CreateSimpleButton("zoom", "Sun");
    zoom.width = "100px"
    zoom.height = "40px";
    zoom.top = "-45%";
    zoom.left= "46%";
    zoom.color = "white";
    zoom.cornerRadius = 20;
    zoom.background = "green";

    zoom.onPointerUpObservable.add(function() { 
        const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(0,0,15), scene);
        camera.setTarget(sun);
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(scene, true);
        camera.lowerRadiusLimit = 6;
        camera.upperRadiusLimit = 500;
    });
    gui.addControl(zoom);

    //Zoom on click
    sun.actionManager = new BABYLON.ActionManager(scene);
    sun.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
        function(){
            const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3.Zero(), scene);
            camera.setTarget(sun);
            scene.activeCamera = camera;
            scene.activeCamera.attachControl(scene, true);
            camera.lowerRadiusLimit = 1.5;
            camera.upperRadiusLimit = 500;
        }));

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

    //Button to zoom to planet
    var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var zoom = BABYLON.GUI.Button.CreateSimpleButton("zoom", "Mercury");
    zoom.width = "100px"
    zoom.height = "40px";
    zoom.top = "-37%";
    zoom.left= "46%";
    zoom.color = "white";
    zoom.cornerRadius = 20;
    zoom.background = "green";

    zoom.onPointerUpObservable.add(function() { 
        const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(mercury.position.x,0,mercury.position.z), scene);
        camera.setTarget(mercury);
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(scene, true);
        camera.lowerRadiusLimit = 1.5;
        camera.upperRadiusLimit = 500;
    });
    gui.addControl(zoom);

    //Zoom on click
    mercury.actionManager = new BABYLON.ActionManager(scene);
    mercury.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
        function(){
            const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(mercury.position.x,0,mercury.position.z), scene);
            camera.setTarget(mercury);
            scene.activeCamera = camera;
            scene.activeCamera.attachControl(scene, true);
            camera.lowerRadiusLimit = 1;
            camera.upperRadiusLimit = 500;
        }));

        scene.registerBeforeRender(()=>{
            mercury.position.x = mercury.orbit.radius * Math.sin(mercury.orbit.angle);
            mercury.position.z = mercury.orbit.radius * Math.cos(mercury.orbit.angle);

            mercury.orbit.speed = .015 * s;
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

    //Button to zoom to planet
    var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var zoom = BABYLON.GUI.Button.CreateSimpleButton("zoom", "Venus");
    zoom.width = "100px"
    zoom.height = "40px";
    zoom.top = "-29%";
    zoom.left= "46%";
    zoom.color = "white";
    zoom.cornerRadius = 20;
    zoom.background = "green";

    zoom.onPointerUpObservable.add(function() { 
        const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
        camera.setTarget(planet);
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(scene, true);
        camera.lowerRadiusLimit = 1.5;
        camera.upperRadiusLimit = 500;
    });
    gui.addControl(zoom);

    //Zoom on click
    planet.actionManager = new BABYLON.ActionManager(scene);
    planet.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
        function(){
            const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
            camera.setTarget(planet);
            scene.activeCamera = camera;
            scene.activeCamera.attachControl(scene, true);
            camera.lowerRadiusLimit = 1;
            camera.upperRadiusLimit = 500;
        }));

        scene.registerBeforeRender(()=>{
            planet.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);

            planet.orbit.speed = .0110 * s;
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

    //Actions

    //Button to zoom to planet
    var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var zoom = BABYLON.GUI.Button.CreateSimpleButton("zoom", "Earth");
    zoom.width = "100px"
    zoom.height = "40px";
    zoom.top = "-21%";
    zoom.left= "46%";
    zoom.color = "white";
    zoom.cornerRadius = 20;
    zoom.background = "green";

    zoom.onPointerUpObservable.add(function() { 
        const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(earth.position.x,0,earth.position.z), scene);
        camera.setTarget(earth);
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(scene, true);
        camera.lowerRadiusLimit = 1.5;
        camera.upperRadiusLimit = 500;
    });
    gui.addControl(zoom);

    //Zoom on click
    earth.actionManager = new BABYLON.ActionManager(scene);
    earth.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
        function(){
            const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(earth.position.x,0,earth.position.z), scene);
            camera.setTarget(earth);
            scene.activeCamera = camera;
            scene.activeCamera.attachControl(scene, true);
            camera.lowerRadiusLimit = 1.5;
            camera.upperRadiusLimit = 500;
        }));

    //Update speed
        scene.registerBeforeRender(()=>{
            earth.position.x = earth.orbit.radius * Math.sin(earth.orbit.angle);
            earth.position.z = earth.orbit.radius * Math.cos(earth.orbit.angle);

            earth.orbit.speed = .0093 * s;
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

//Button to zoom to planet
var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
var zoom = BABYLON.GUI.Button.CreateSimpleButton("zoom", "Mars");
zoom.width = "100px"
zoom.height = "40px";
zoom.top = "-13%";
zoom.left= "46%";
zoom.color = "white";
zoom.cornerRadius = 20;
zoom.background = "green";

zoom.onPointerUpObservable.add(function() { 
    const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
    camera.setTarget(planet);
    scene.activeCamera = camera;
    scene.activeCamera.attachControl(scene, true);
    camera.lowerRadiusLimit = 1.2;
    camera.upperRadiusLimit = 500;
});
gui.addControl(zoom);

//Zoom on click
planet.actionManager = new BABYLON.ActionManager(scene);
planet.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
    function(){
        const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
        camera.setTarget(planet);
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(scene, true);
        camera.lowerRadiusLimit = 1;
        camera.upperRadiusLimit = 500;
    }));

        scene.registerBeforeRender(()=>{
            planet.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);

            planet.orbit.speed = .0075 * s;
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

//Button to zoom to planet
var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
var zoom = BABYLON.GUI.Button.CreateSimpleButton("zoom", "Jupiter");
zoom.width = "100px"
zoom.height = "40px";
zoom.top = "-5%";
zoom.left= "46%";
zoom.color = "white";
zoom.cornerRadius = 20;
zoom.background = "green";

zoom.onPointerUpObservable.add(function() { 
    const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
    camera.setTarget(planet);
    scene.activeCamera = camera;
    scene.activeCamera.attachControl(scene, true);
    camera.lowerRadiusLimit = 1.3;
    camera.upperRadiusLimit = 500;
});
gui.addControl(zoom);

//Zoom on click
planet.actionManager = new BABYLON.ActionManager(scene);
planet.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
    function(){
        const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
        camera.setTarget(planet);
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(scene, true);
        camera.lowerRadiusLimit = 1;
        camera.upperRadiusLimit = 500;
    }));

        scene.registerBeforeRender(()=>{
            planet.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);

            planet.orbit.speed = .0041 * s;
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

//Button to zoom to planet
var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
var zoom = BABYLON.GUI.Button.CreateSimpleButton("zoom", "Saturn");
zoom.width = "100px"
zoom.height = "40px";
zoom.top = "3%";
zoom.left= "46%";
zoom.color = "white";
zoom.cornerRadius = 20;
zoom.background = "green";

zoom.onPointerUpObservable.add(function() { 
    const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
    camera.setTarget(planet);
    scene.activeCamera = camera;
    scene.activeCamera.attachControl(scene, true);
    camera.lowerRadiusLimit = 1.25;
    camera.upperRadiusLimit = 500;
});
gui.addControl(zoom);

//Zoom on click
planet.actionManager = new BABYLON.ActionManager(scene);
planet.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
    function(){
        const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
        camera.setTarget(planet);
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(scene, true);
        camera.lowerRadiusLimit = 1;
        camera.upperRadiusLimit = 500;
    }));

        scene.registerBeforeRender(()=>{
            planet.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);

            planet.orbit.speed = .0030 * s;
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

//Button to zoom to planet
var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
var zoom = BABYLON.GUI.Button.CreateSimpleButton("zoom", "Uranus");
zoom.width = "100px"
zoom.height = "40px";
zoom.top = "11%";
zoom.left= "46%";
zoom.color = "white";
zoom.cornerRadius = 20;
zoom.background = "green";

zoom.onPointerUpObservable.add(function() { 
    const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
    camera.setTarget(planet);
    scene.activeCamera = camera;
    scene.activeCamera.attachControl(scene, true);
    camera.lowerRadiusLimit = 2.5;
    camera.upperRadiusLimit = 500;
});
gui.addControl(zoom);

//Zoom on click
planet.actionManager = new BABYLON.ActionManager(scene);
planet.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
    function(){
        const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
        camera.setTarget(planet);
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(scene, true);
        camera.lowerRadiusLimit = 1;
        camera.upperRadiusLimit = 500;
    }));

        scene.registerBeforeRender(()=>{
            planet.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);

            planet.orbit.speed = .0021 * s;
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

//Button to zoom to planet
var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
var zoom = BABYLON.GUI.Button.CreateSimpleButton("zoom", "Neptune");
zoom.width = "100px"
zoom.height = "40px";
zoom.top = "19%";
zoom.left= "46%";
zoom.color = "white";
zoom.cornerRadius = 20;
zoom.background = "green";

zoom.onPointerUpObservable.add(function() { 
    const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
    camera.setTarget(planet);
    scene.activeCamera = camera;
    scene.activeCamera.attachControl(scene, true);
    camera.lowerRadiusLimit = 2.5;
    camera.upperRadiusLimit = 500;
});
gui.addControl(zoom);

//Zoom on click
planet.actionManager = new BABYLON.ActionManager(scene);
planet.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
    function(){
        const camera = new BABYLON.ArcRotateCamera('camera', 0,0,0, new BABYLON.Vector3(planet.position.x,0,planet.position.z), scene);
        camera.setTarget(planet);
        scene.activeCamera = camera;
        scene.activeCamera.attachControl(scene, true);
        camera.lowerRadiusLimit = 1;
        camera.upperRadiusLimit = 500;
    }));

        scene.registerBeforeRender(()=>{
            planet.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);

            planet.orbit.speed = .0015 * s;
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
    pause.width = "100px"
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
    var quarter = BABYLON.GUI.Button.CreateSimpleButton("quarter", ".25x Speed");
    quarter.width = "100px"
    quarter.height = "40px";
    quarter.top = "-37%";
    quarter.left= "";
    quarter.color = "white";
    quarter.cornerRadius = 20;
    quarter.background = "green";
    quarter.onPointerUpObservable.add(function() {
        let speed = .25
        setSpeed(speed);
    });

    //Half speed
    var half = BABYLON.GUI.Button.CreateSimpleButton("half", ".5x Speed");
    half.width = "100px"
    half.height = "40px";
    half.top = "-29%";
    half.left= "";
    half.color = "white";
    half.cornerRadius = 20;
    half.background = "green";
    half.onPointerUpObservable.add(function() {
        let speed = .5
        setSpeed(speed);
    });

    //Full speed
    var full = BABYLON.GUI.Button.CreateSimpleButton("full", "1x Speed");
    full.width = "100px"
    full.height = "40px";
    full.top = "-21%";
    full.left= "";
    full.color = "white";
    full.cornerRadius = 20;
    full.background = "green";
    full.onPointerUpObservable.add(function() {
        let speed = 1
        setSpeed(speed);
    });

    //Double speed
    var double = BABYLON.GUI.Button.CreateSimpleButton("double", "2x Speed");
    double.width = "100px"
    double.height = "40px";
    double.top = "-13%";
    double.left= "";
    double.color = "white";
    double.cornerRadius = 20;
    double.background = "green";
    double.onPointerUpObservable.add(function() {
        let speed = 2
        setSpeed(speed);
    });
    
    gui.addControl(pause);
    gui.addControl(quarter);
    gui.addControl(half);
    gui.addControl(full);
    gui.addControl(double);
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

