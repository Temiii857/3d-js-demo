import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ---- SCENE / CAMERA / RENDERER ----
const scene = new THREE.Scene();
const spaceTexture = new THREE.TextureLoader().load('images/galaxy.jpg');
scene.background = spaceTexture;
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
camera.position.setZ(50);

// ---- FIRST OBJECT (CUBE) ----
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-15, 0, -15);
scene.add(cube);

// ---- SECOND OBJECT (ICOSAHEDRON - NEEDS LIGHT) ----
const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const icoMesh = new THREE.Mesh(ico, icoMaterial);
icoMesh.position.set(15, 0, -15);
scene.add(icoMesh);

// ---- LIGHTS (Phong MATERIAL NEEDS THIS) ----
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// ---- HELPERS (optional, but in tutorial) ----
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

// ---- ORBIT CONTROLS ----
const controls = new OrbitControls(camera, renderer.domElement);

// ---- ANIMATION LOOP ----
function animate() {
    requestAnimationFrame(animate);

    // cube spins one way
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // icosahedron spins opposite way a bit faster
    icoMesh.rotation.z -= 0.03;
    icoMesh.rotation.y -= 0.03;

    controls.update();
    renderer.render(scene, camera);
}
animate();