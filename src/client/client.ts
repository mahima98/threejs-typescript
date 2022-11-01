import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x47624f);

const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // (zoom distance, width/height, pas kner , pas kner)
camera1.position.z = 2;

const camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1); // (right,  left, top, bottom)
camera2.position.z = 2;

const canvas1 = document.getElementById("c1") as HTMLCanvasElement;
const canvas2 = document.getElementById("c2") as HTMLCanvasElement;

const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 });
renderer1.setSize(200, 200); // width and height of scene (background + cube size)

const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });
renderer2.setSize(200, 200);
// document.body.appendChild(renderer.domElement);

new OrbitControls(camera1, renderer1.domElement);
new OrbitControls(camera2, renderer2.domElement);

// const geometry = new THREE.BoxGeometry();
const geometry = new THREE.TorusGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0xeeeeee,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
cube.scale.x = 0.5;
cube.scale.y = 0.5;
cube.scale.z = 0.5;
scene.add(cube);

console.log(scene);

//update the cube size and aspext ratio through listener
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera1.aspect = window.innerWidth / window.innerHeight;
  camera1.updateProjectionMatrix();
  renderer1.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder("cube");
cubeFolder.open();

const cameraFolder = cubeFolder.addFolder("Position");
cameraFolder.add(camera1.position, "x", 0, -10, 10);
cameraFolder.add(camera1.position, "y", 0, -10, 10);
cameraFolder.add(camera1.position, "z", 0, -10, 10);
cameraFolder.open();

const cubeRotationFolder = cubeFolder.addFolder("Rotation");
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2);

const cubeScaleFolder = cubeFolder.addFolder("Scale");
cubeScaleFolder.add(cube.scale, "x", 0, -10, 10);
cubeScaleFolder.add(cube.scale, "y", 0, -10, 10);
cubeScaleFolder.add(cube.scale, "z", 0, -10, 10);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.02;
  cube.rotation.y += 0.01;
  stats.update();
  render();
}

function render() {
  renderer1.render(scene, camera1);
  renderer2.render(scene, camera2);
}

animate();

//without animation - one way to improve performance for heavy scenes
// const controls = new OrbitControls(camera1, renderer1.domElement);
// controls.addEventListener("change", render);
// render();
