import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene + Background
const scene = new THREE.Scene();
const spaceTexture = new THREE.TextureLoader().load(
    `${import.meta.env.BASE_URL}images/galaxy.jpg`
);
spaceTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = spaceTexture;

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


const oldCanvas = document.querySelector('#bg');
if (oldCanvas && oldCanvas.parentElement) {
    renderer.domElement.id = 'bg';
    oldCanvas.parentElement.replaceChild(renderer.domElement, oldCanvas);
} else {

    renderer.domElement.id = 'bg';
    document.body.appendChild(renderer.domElement);
}

camera.position.setZ(50);

// === Objects ===
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0xFF6347, metalness: 0.3, roughness: 0.6 })
);
cube.position.set(-15, 0, -15);
scene.add(cube);

const icoMesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(10),
    new THREE.MeshStandardMaterial({ color: 0x00ff77, metalness: 0.4, roughness: 0.5 })
);
icoMesh.position.set(15, 0, -15);
scene.add(icoMesh);

// Star Field
const stars = new THREE.Group();
scene.add(stars);

function addStar() {
    const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    const x = THREE.MathUtils.randFloatSpread(300);
    const y = THREE.MathUtils.randFloatSpread(200);
    const z = -THREE.MathUtils.randFloat(60, 220);
    star.position.set(x, y, z);
    stars.add(star);
}
for (let i = 0; i < 400; i++) addStar();

// Lights
scene.add(new THREE.HemisphereLight(0xffffff, 0x101018, 0.8));

const key = new THREE.DirectionalLight(0xffffff, 2.0);
key.position.set(30, 40, 50);
scene.add(key);

const fill = new THREE.DirectionalLight(0xffffff, 0.8);
fill.position.set(-25, 10, 10);
scene.add(fill);

const rim = new THREE.DirectionalLight(0xffffff, 0.6);
rim.position.set(0, -20, -30);
scene.add(rim);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    icoMesh.rotation.z -= 0.02;
    icoMesh.rotation.y -= 0.02;
    stars.rotation.y += 0.0008;
    controls.update();
    renderer.render(scene, camera);
}
animate();