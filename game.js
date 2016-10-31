//Scene Components
var sceneComponents = function(){
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
};

var GameObject = function(){
};

var thisScene = new sceneComponents();

function setupScene(){
    thisScene.scene = new THREE.Scene();
    thisScene.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    thisScene.renderer = new THREE.WebGLRenderer();
    thisScene.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(thisScene.renderer.domElement);
}


var object;
function setupGame(){
    var mesh = new THREE.SphereGeometry( 60, 24, 16 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    var physicsMaterial = new THREE.MeshPhongMaterial({color: "#5d4725", shading: THREE.FlatShading});
    object = new THREE.Mesh( mesh, physicsMaterial );
    var light = new THREE.DirectionalLight( 0xdddddd, 0.8 );
    light.position.set( -80, 80, 80 );
    object.position.z = -160;
    
    thisScene.scene.add(light);
    thisScene.scene.add(object);
}

function animateScene(){
    setInterval(function(){
        object.rotation.y+=0.001;
        thisScene.renderer.render(thisScene.scene, thisScene.camera);
    }, 1);
}