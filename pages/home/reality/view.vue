<script setup lang="ts">
import * as THREE from "three"
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

import { Reality } from '~~/composables/public/Reality';

const route = useRoute()

const response = ref<Reality | null>(null)
const modelRef = ref<THREE.Group | null>(null)

const hasRemoteError = ref(false)
const canAR = ref(false)

const id = route.query["id"]?.toString() ?? ''

function start() {
    getPublicReality(id).then(handle({
        onSuccess: onSuccess(response),
        onFailure: onFailure(hasRemoteError)
    }))
}

watch(response, async res => {
    if (!res) return
    const gltf = await base64ToGLTF(res.data)
    const scene = gltf.scene
    const scale = res.scale
    scene.scale.set(scale, scale, scale)
    modelRef.value = gltf.scene
})

if (!id) navigateTo("/home/reality")
else start()

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
    const model = modelRef.value?.clone()
    if (!model) return
    try {
        const reticle = (await loadModel("/reticle.glb")).scene
        reticle.visible = false

        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl', { xrCompatible: true })
        if (!gl) throw "webgl is null"

        const scene = new THREE.Scene();

        const light = new THREE.AmbientLight(0xffffff, 1);

        scene.add(light)
        //scene.add(reticle)
        scene.add(model)

        const camera = new THREE.PerspectiveCamera();
        camera.matrixAutoUpdate = false

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            context: gl,
            canvas: gl.canvas
        })
        renderer.autoClear = false

        //necessary for metallics models
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

        const xr = navigator.xr
        if (!xr) throw "XRSystem is null"
        const session = await xr.requestSession('immersive-ar', {
            requiredFeatures: ['local', 'hit-test'],
        })
        session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) })

        // session.addEventListener('select', _ => {
        //     model.position.copy(reticle.position)
        //     model.visible = true
        // })

        //where session was created
        const local = await session.requestReferenceSpace('local')

        //current session position
        const viewer = await session.requestReferenceSpace('viewer');

        const hitTestSource = session.requestHitTestSource && await session.requestHitTestSource({ space: viewer });

        if (!hitTestSource) throw "hitTestSource is null"

        let adjusted = false

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

                if (!adjusted) {
                    model.matrix.fromArray(view.transform.matrix)
                    model.updateMatrixWorld(adjusted = true)
                }
            }

            // for (const result of frame.getHitTestResults(hitTestSource)) {
            //     const pose = result.getPose(local)
            //     if (!pose) continue
            //     model.position.set(
            //         pose.transform.position.x,
            //         pose.transform.position.y,
            //         pose.transform.position.z
            //     )
            //     reticle.updateMatrixWorld(true)
            // }
            renderer.render(scene, camera)
        }
        session.requestAnimationFrame(onXRFrame);
    } catch (e) {
        console.log(e)
        //Something went wrong when loading the AR session. Refresh the page and try again!
        alert("Alguma coisa deu errada ao carregar a sessão de AR. Atualize página e tente novamente!")
    }
}

isSessionSupported().then(value => canAR.value = value)
</script>

<template>
    <tail-loading-page class="p-4" :has-remote-error="hasRemoteError" :is-loading="!response">
        <h1 class="font-amatic-sc text-6xl">
            Realidade aumentada
        </h1>
        <template v-if="response">
            <h1 class="text-4xl font-amatic-sc">Título: &nbsp;</h1>
            <p> {{ response.title }}</p>
            <br>
            <h1 class="text-4xl font-amatic-sc">Descrição: &nbsp;</h1>
            <p> {{ response.description }}</p>
            <br>
            <h1 class="text-4xl font-amatic-sc">Foto de preview: &nbsp;</h1>
            <img :src="response.background" />
            <br>
            <h1 class="text-4xl font-amatic-sc">Imagens: &nbsp;</h1>
            <div class="mt-2 flex flex-wrap justify-center gap-2">
                <img v-for="f in response.images" :src="f.data" class="w-48">
            </div>
            <br>
            <h1 class="text-4xl font-amatic-sc">Modelo: &nbsp;</h1>
            <tail-three-preview :scale="response.scale" :model="modelRef" />
            <br>
            <br>
            <tail-button-blue-violet v-if="canAR" title="Iniciar sessão de realidade aumentada"
                @click="requestSession" />
            <tail-button-blue-violet v-else title="A sessão não é suportada neste dispositivo" />
        </template>
    </tail-loading-page>
</template>