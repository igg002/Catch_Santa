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
var mapSize = 50;
var startingPoint = 10;
var upperBuildArea = 1;
var upperBuildTimes;
var startingPointArray = new Array();
for(var i = 0; i < mapSize; i++){
    tileMap[i] = new Array();
}
var savingFirstPoints = new Array();
for(var i = 0; i < mapSize; i++){
    savingFirstPoints[i] = new Array();
}

var thisScene = new sceneComponents();
var basicSphereMesh = new GameObject();

function generateWorldTileMap(){
    for(var startingPointCnt = 0; startingPointCnt < startingPoint; startingPointCnt++){
        startingPointArray[startingPointCnt] = Math.floor(Math.random() * mapSize).toString() + "," + Math.floor(Math.random() * mapSize).toString();
        console.log(startingPointArray[startingPointCnt]);
    }
    
    for(var i = 0; i < mapSize; i++){
        for(var j = 0; j < mapSize; j++){
            for(var k = 0; k < startingPoint; k++){
                if(i == startingPointArray[k].split(",")[0] && j == startingPointArray[k].split(",")[1]){
                    tileMap[i][j] = 1;
                    savingFirstPoints[i][j] = 1;
                    break;
                } else {
                    tileMap[i][j] = 0;
                    savingFirstPoints[i][j] = 0;
                }
            }
        }
    }
    
    for(var i = 0; i < mapSize; i++){
        for(var j = 0; j < mapSize; j++){
            if(savingFirstPoints[i][j] == 1){
                upperBuildTimes = Math.ceil(Math.random() * 5);
                upperBuildArea = 0;
                console.log("upperBuildingTimes : " + upperBuildTimes);
                for(var k = 0; k < upperBuildTimes; k++){
                    upperBuildArea += Math.ceil(Math.random() * 5);
                    console.log("upperBuildingArea : " + upperBuildArea);
                    for(var h = 0; h < mapSize; h++){
                        for(var r = 0; r < mapSize; r++){
                            if(h >= i-upperBuildArea && h <= i+upperBuildArea){
                                if(r >= j-upperBuildArea && r<= j+upperBuildArea){
                                    tileMap[h][r]++;  
                                }
                            }
                        }
                    }
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
            for(var k = 0; k <= tileMap[i][j]; k++){
                var block = new THREE.BoxGeometry(1, 1, 1);
                var material = new THREE.MeshPhongMaterial({shading: THREE.FlatShading});
                var object = new THREE.Mesh(block, material);
                thisScene.scene.add(object);
                object.position.set(i, k, j);
            }
        }
    }
    console.log("Terrain Build Complete");
}

//var block = new THREE.BoxGeometry(1, 1, 1);
//                var material = new THREE.MeshPhongMaterial({shading: THREE.FlatShading});
//                var object = new THREE.Mesh(block, material);
//                thisScene.scene.add(object);
//                object.position.set(j, k, i);

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