window.addEventListener('keydown',onKeyDown);
window.addEventListener('keyup',onKeyUp);

//Scene Components
var sceneComponents = function(){
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.loader = null;
};

var GameObject = function(){
    this.mesh = null;
    this.material = null;
    this.gameObject = null;
    this.makeObject = function(){
      this.gameObject = new THREE.Mesh(this.mesh, this.material);  
    };
};

var tileMap = new Array();
var mapSize = 100;
var startingPoint = 50;
var upperBuildArea = 3;
var startingPointArray = new Array();
for(var i = 0; i < mapSize; i++){
    tileMap[i] = new Array();
}

var thisScene = new sceneComponents();
var basicSphereMesh = new GameObject();

function generateWorldTileMap(){
    //SelectStartingPoint
    for(var startingPointCnt = 0; startingPointCnt < startingPoint; startingPointCnt++){
        startingPointArray[startingPointCnt] = Math.floor(Math.random() * mapSize).toString() + "," + Math.floor(Math.random() * mapSize).toString();
        console.log(startingPointArray[startingPointCnt]);
    }
    
    for(var i = 0; i < mapSize; i++){
        for(var j = 0; j < mapSize; j++){    
            console.log("i : " + i.toString() + " j : " + j.toString());
            for(var k = 0; k < startingPoint; k++){
                var first, second;
                first = startingPointArray[k].split(",")[0];
                second = startingPointArray[k].split(",")[1];
                if(i.toString() == first && j.toString() == second){
                    console.log("i : " + i.toString() + " j : " + j.toString() + " Exist");
                    tileMap[i][j] = 1;
                    for(var h = -1; h < upperBuildArea-1; h++){
                        for(var r = -1; r < upperBuildArea-1; r++){
                            if(i+h >= 0){
                                if(j+r >= 0){
                                    tileMap[i+h][j+r] += 1;                                            
                                }
                            }
                        }
                    }
                    break;
                } else {
                    tileMap[i][j] = 0;
                }    
            }
        }
    }
}

function printTileMap(){
    var printing = new String();
    for(var i = 0; i < mapSize; i++){
        for(var j = 0; j < mapSize; j++){
            printing+=tileMap[i][j].toString();
        }
        printing+="\n";
    }
    console.log(printing);
}

function buildTerrain(){
    for(var i = 0; i < mapSize; i++){
        for(var j = 0; j < mapSize; j++){
            for(var k = 0; k <= tileMap[j][i]; k++){
                var block = new THREE.BoxGeometry(1, 1, 1);
                var material = new THREE.MeshPhongMaterial({shading: THREE.FlatShading});
                var object = new THREE.Mesh(block, material);
                thisScene.scene.add(object);
                object.position.set(j, k, i);
                console.log("Added! " + "X Pos : " + j + " Y Pos : " + k + " Z Pos : " + i);    
            }
        }
    }
}

function setupScene(){
    thisScene.scene = new THREE.Scene();
    thisScene.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    thisScene.renderer = new THREE.WebGLRenderer();
    thisScene.renderer.setSize(window.innerWidth, window.innerHeight);
    thisScene.loader = new THREE.TextureLoader();
    document.body.appendChild(thisScene.renderer.domElement);
}

function setupGame(){
//    var characterTexture = thisScene.loader.load("3.png");
    //basicSphereMesh.mesh = new THREE.SphereGeometry(1, 24, 24);
    basicSphereMesh.mesh = new THREE.BoxGeometry(1, 1, 1);
    //basicSphereMesh.material = new THREE.MeshPhongMaterial({shading: THREE.FlatShading, map: characterTexture});
    basicSphereMesh.material = new THREE.MeshPhongMaterial({shading: THREE.FlatShading});
    //basicSphereMesh.material = new THREE.MeshBasicMaterial({map: characterTexture});
    basicSphereMesh.makeObject();
    //thisScene.scene.add(object);
    
    var light = new THREE.DirectionalLight( 0xdddddd, 0.8 );
    light.position.set( -80, 80, 80 );
    
    thisScene.camera.position.set(0,0,10);
    
    thisScene.scene.add(light);
}

function animateScene(){
    setInterval(function(){
        //basicSphereMesh.gameObject.rotation.y+=0.01;
        //thisScene.camera.lookAt( new THREE.Vector3( 30, 0, 0 ) );
        thisScene.renderer.render(thisScene.scene, thisScene.camera);
    }, 50);
}

function onKeyDown(e){
    keyCode = e.keyCode;
    eventType = e.type;

    if(e.keyCode == 37){
        thisScene.camera.rotation.y += 0.01;
    }
    if(e.keyCode == 38){
        thisScene.camera.rotation.x += 0.01;
    }
    if(e.keyCode == 39){
        thisScene.camera.rotation.y -= 0.01;
    }
    if(e.keyCode == 40){
        thisScene.camera.rotation.x -= 0.01;
    }
    
    if(e.keyCode == 87){
        thisScene.camera.position.z -= 0.1;
    }
    if(e.keyCode == 65){
        thisScene.camera.position.x -= 0.1;
    }
    if(e.keyCode == 83){
        thisScene.camera.position.z += 0.1;
    }
    if(e.keyCode == 68){
        thisScene.camera.position.x += 0.1;
    }
    if(e.keyCode == 69){
        thisScene.camera.position.y += 0.1;
    }
    if(e.keyCode == 67){
        thisScene.camera.position.y -= 0.1;
    }
}

function onKeyUp(e){
    keyCode = e.keyCode;
    eventType = e.type;
}