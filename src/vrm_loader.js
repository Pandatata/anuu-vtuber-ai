// VRM Loader using three.js and @pixiv/three-vrm

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRM, VRMUtils } from '@pixiv/three-vrm';

// Scene setup
let scene, camera, renderer, vrm;

export async function loadVRM(modelPath, canvas) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, -2); // Adjust camera position

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(modelPath);

    vrm = await VRM.from(gltf);
    scene.add(vrm.scene);

    VRMUtils.rotateVRM0(vrm); // Rotate the model to face the camera

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (vrm) {
            vrm.update(delta);
        }
        renderer.render(scene, camera);
    }
    animate();
}

let lipSyncTimeout;
export function startLipSync() {
    if (!vrm) return;

    // Clear any existing lip-sync timeout
    if (lipSyncTimeout) {
        clearTimeout(lipSyncTimeout);
    }

    const expressionManager = vrm.expressionManager;
    const blendShapeA = expressionManager.getExpression('a');

    if (!blendShapeA) return;

    let lipSyncCounter = 0;
    const lipSyncDuration = 3000; // 3 seconds
    const interval = 100; // 100ms

    function animateLipSync() {
        if (lipSyncCounter * interval >= lipSyncDuration) {
            expressionManager.setValue(blendShapeA.name, 0);
            return;
        }

        const value = Math.random() * 0.75;
        expressionManager.setValue(blendShapeA.name, value);
        lipSyncCounter++;
        lipSyncTimeout = setTimeout(animateLipSync, interval);
    }

    animateLipSync();
}
