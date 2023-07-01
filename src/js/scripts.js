
//instalar o parcel: npm install parcel -g 
//instalar THREE.JS: npm install three
//Instalar o tween: npm i @tweenjs/tween.js@^18
//rodar o servidor:  npx parcel ./src/index.html


import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from '@tweenjs/tween.js';

import solo from '../img/solo.jpg';
import estrelas from '../img/estrelas.jpg';
import meteoro from '../img/meteoro.jpg';

const nave   = new URL('../assets/nave.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);


camera.position.set(-50, 30, -30);
orbit.update();

const textura = new THREE.TextureLoader();


const sphereGeometry = new THREE.SphereGeometry(10, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    map: textura.load(meteoro)
    
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(0, 0, 20);
sphere.castShadow = true;

const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.25;

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    estrelas,
    estrelas,
    estrelas,
    estrelas,
    estrelas,
    estrelas
]);

const sphere2Geometry = new THREE.SphereGeometry(10, 50, 50);
const sphere2Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(solo)
});

const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(15, -10, 10);
sphere2.receiveShadow = true;

const loader = new GLTFLoader();

let model;
loader.load(nave.href, function(gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.set(10, -5, -22);
    model.castShadow = true;
});

loader.receiveShadow = true;


function animate(time) {
    requestAnimationFrame(animate);

    sphere.position.y += 0.035;
    sphere2.position.y += -0.035;
    sphere2.position.z += 0.035;

    model.position.z += 0.1;
    model.position.y += 0.01;
    model.rotation.z -= 0.006;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
