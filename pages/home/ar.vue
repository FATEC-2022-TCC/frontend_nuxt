<script setup lang="ts">
import type { XRSystem } from 'webxr'

import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader();

const loadModel = (url: string): Promise<THREE.Group> => new Promise(resolve => loader.load(url, gltf => resolve(gltf.scene)))

async function isSessionSupported(): Promise<boolean> {
    if (!navigator.xr) return false
    return navigator.xr.isSessionSupported('immersive-ar')
}

async function requestSession() {
    const supported = await isSessionSupported()
    if (supported) {
        try {
            const flower = await loadModel("https://immersive-web.github.io/webxr-samples/media/gltf/sunflower/sunflower.gltf")
            const reticle = await loadModel("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf")

            const canvas = document.createElement('canvas')
            const gl = canvas.getContext('webgl', { xrCompatible: true })
            if (!gl) throw "webgl is null"

            const scene = new THREE.Scene();

            const light = new THREE.DirectionalLight(0xffffff, 0.3);
            light.position.set(10, 15, 10);

            scene.add(light)
            //scene.add(flower)
            scene.add(reticle)

            const camera = new THREE.PerspectiveCamera();
            camera.matrixAutoUpdate = false;

            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                context: gl,
                canvas: gl.canvas
            })
            renderer.autoClear = true

            const xr = navigator.xr
            if (!xr) throw "XRSystem is null"
            const session = await xr.requestSession('immersive-ar', {
                requiredFeatures: ['local', 'hit-test'],
            })
            session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) })

            session.addEventListener('select', _ => {
                const clone = flower.clone()
                clone.position.copy(reticle.position)
                scene.add(clone)
            })

            //where session was created
            const local = await session.requestReferenceSpace('local')

            //current session position
            const viewer = await session.requestReferenceSpace('viewer');

            if (!session.requestHitTestSource) throw "requestHitTestSource is null"

            const hitTestSource = await session.requestHitTestSource({ space: viewer });

            if (!hitTestSource) throw "hitTestSource is null"

            const onXRFrame = (time: DOMHighResTimeStamp, frame: XRFrame) => {
                session.requestAnimationFrame(onXRFrame);
                gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer?.framebuffer ?? null)

                const pose = frame.getViewerPose(local);

                if (pose) {
                    const view = pose.views[0];

                    const viewport = session.renderState.baseLayer?.getViewport(view);
                    if (!viewport) return
                    renderer.setSize(viewport.width, viewport.height)

                    camera.matrix.fromArray(view.transform.matrix)
                    camera.projectionMatrix.fromArray(view.projectionMatrix);
                    camera.updateMatrixWorld(true);

                }

                const hitTestResults = frame.getHitTestResults(hitTestSource);

                if (hitTestResults.length > 0) {
                    const hitPose = hitTestResults[0].getPose(local);
                    if (hitPose) {
                        reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z)
                        reticle.updateMatrixWorld(true);
                    }
                }

                renderer.render(scene, camera)
            }
            session.requestAnimationFrame(onXRFrame);
        } catch (e) {
            alert("Something went wrong on VR session: " + JSON.stringify(e))
        }
    } else {
        alert("VR session is not supported")
    }
}
</script>

<template>
    <div>
        <tail-button-blue-violet title="Iniciar sessão" @click="requestSession" />
    </div>
</template>