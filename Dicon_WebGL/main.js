//Renderer, Scene Essentials Setting
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 60, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Mesh Variable Declare, Materials, Add Scene, Positioning
var box = new THREE.BoxGeometry(1, 1, 1);
var whiteMaterial = new THREE.MeshPhongMaterial();
var boxMesh = new THREE.Mesh(box, whiteMaterial);
var boxMeshInvisible = new THREE.Mesh(box, whiteMaterial);
var boxGroup = new THREE.Group();
var light = new THREE.DirectionalLight( 0xdddddd, 0.8 );

scene.add(camera);
scene.add(light);
boxGroup.add(boxMesh);
boxGroup.add(boxMeshInvisible);
scene.add(boxGroup);

boxMesh.position.z -= 5;
boxMeshInvisible.position.z -= 3;

//Console Status, Update
setInterval(function(){
    console.log(mainTime.hours + " 시간, " + mainTime.minutes + " 분, " + mainTime.seconds + " 초 경과");
    renderer.render(scene, camera);
}, 1);

//Realtime Events
setInterval(function(){
    boxMesh.rotation.y+=0.03;
    boxMeshInvisible.rotation.y+=0.03;
    boxMeshInvisible.scale.set(1,1.5,1);
}, 1);

//Time Events
setInterval(function(){
    if(mainTime.seconds % 2 == 0){
        boxMeshInvisible.visible = false;
//        boxGroup.visible = false;
    } else {
        boxMeshInvisible.visible = true;
//        boxGroup.visible = true;
    }
}, 1);

setTimeout(function(){
}, 2000)