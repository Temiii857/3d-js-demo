import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const spaceTexture = new THREE.TextureLoader().load('images/galaxy.jpg');
scene.background = spaceTexture;
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
camera.position.setZ(50);


const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-15, 0, -15);
scene.add(cube);


const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const icoMesh = new THREE.Mesh(ico, icoMaterial);
icoMesh.position.set(15, 0, -15);
scene.add(icoMesh);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);


const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);


    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;


    icoMesh.rotation.z -= 0.03;
    icoMesh.rotation.y -= 0.03;

    controls.update();
    renderer.render(scene, camera);
}
animate();