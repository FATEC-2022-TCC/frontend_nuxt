<script setup lang="ts">
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

const loader = new GLTFLoader();

const loadModel = (url: string): Promise<THREE.Group> => new Promise(resolve => loader.load(url, gltf => resolve(gltf.scene)))

async function isSessionSupported(): Promise<boolean> {
    if (!navigator.xr) return false
    return navigator.xr.isSessionSupported('immersive-ar')
}

async function requestSession() {
    const supported = await isSessionSupported()
    if (!supported) {
        //AR session isn't supported. Try it on another device.
        alert("A sessão de AR não é suportada. Tente em outro dispositivo.")
        return
    }
    try {
        // const flower = await loadModel("https://immersive-web.github.io/webxr-samples/media/gltf/sunflower/sunflower.gltf")
        const reticle = await loadModel("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf")
        const model = await loadModel("/model.glb")
        model.visible = false

        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl', { xrCompatible: true })
        if (!gl) throw "webgl is null"

        const scene = new THREE.Scene();

        const light = new THREE.AmbientLight(0xffffff, 1);

        scene.add(light)
        scene.add(model)
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

        session.addEventListener('select', _ => model.position.copy(reticle.position))

        //where session was created
        const local = await session.requestReferenceSpace('local')

        //current session position
        const viewer = await session.requestReferenceSpace('viewer');

        const hitTestSource = session.requestHitTestSource && await session.requestHitTestSource({ space: viewer });

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

            for (const result of frame.getHitTestResults(hitTestSource)) {
                const pose = result.getPose(local)
                if (!pose) continue
                reticle.position.set(
                    pose.transform.position.x,
                    pose.transform.position.y,
                    pose.transform.position.z
                )
                reticle.updateMatrixWorld(true)
                renderer.render(scene, camera)
            }
            renderer.render(scene, camera)
        }
        session.requestAnimationFrame(onXRFrame);
    } catch (e) {
        console.log(e)
        //Something went wrong when loading the AR session. Refresh the page and try again!
        alert("Alguma coisa deu errada ao carregar a sessão de AR. Atualize página e tente novamente!")
    }
}
</script>

<template>
    <div>
        <tail-button-blue-violet title="Iniciar sessão" @click="requestSession" />
    </div>
</template>