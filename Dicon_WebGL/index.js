var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 60, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var material = new THREE.MeshNormalMaterial();

var meshGroup = [];
var meshObject = new Array;

for(var i=0;i<3;i++) {
    meshObject[i]=new Array();
    for(var j=0;j<10;j++) {
        meshObject[i][j]=null;
    }
}

var mesh_xPos = -10;
var mesh_yPos = -2;

for(var j = 0; j < 3; j++){
    for(var i = 0; i < 10; i++){
        meshGroup[i] = new THREE.BoxGeometry(1, 1, 1);
        meshObject[j][i] = new THREE.Mesh(meshGroup[i], material);        scene.add(meshObject[j][i]);
        meshObject[j][i].position.x = mesh_xPos;
        meshObject[j][i].position.y = mesh_yPos;
        mesh_xPos+=2;
    }
    mesh_yPos += 2;
    mesh_xPos = -10;
}

camera.position.z = 10;

//var render = function () {
//  requestAnimationFrame( render );
//  cube.rotation.x += 0.1;
//  cube.rotation.y += 0.1;
//  renderer.render( scene, camera );
//};
//render();

var scalee = 0;
setInterval(function(){
    //renderer.setSize( window.innerWidth, window.innerHeight );
    for(var j = 0; j < 3; j++){
        for(var i = 0; i < 10; i++){
            meshObject[j][i].rotation.x+=0.07;
            meshObject[j][i].rotation.y+=0.2;
            meshObject[j][i].scale.set(scalee, scalee, scalee);
        }
    }
    scalee+=0.005;
    renderer.render( scene, camera );
}, 20);

var cnt = 0;
setInterval(function(){
    for(var j = 0; j < 3; j++){
        for(var i = 0; i < 10; i++){
            if(i == cnt){
                scene.remove(meshObject[j][i]);     
            }
        }
    }
    cnt++;
}, 10000);
