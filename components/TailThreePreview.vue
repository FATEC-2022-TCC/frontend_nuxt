<script setup lang="ts">
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

const props = defineProps<{
    scale: number,
    model: THREE.Group | null,
    error?: string
}>()

const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff, 1)
const axes = new THREE.AxesHelper(60)
scene.add(light)
scene.add(axes)

watch(() => props.scale, scale => props.model?.scale.set(scale, scale, scale))
watch(() => props.model, (value, old) => {
    if (old) scene.remove(toRaw(old))
    if (value) scene.add(toRaw(value))
})

const renderRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
    const div = renderRef.value
    if (!div) return

    const camera = new THREE.PerspectiveCamera(
        75,
        div.clientWidth / div.clientHeight,
        0.1,
        1000
    )

    camera.position.set(5, 5, 5)

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    })

    renderer.setSize(div.clientWidth, div.clientHeight)

    //necessary for metallics models
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

    //only to user control model in 3D space, we don't care for callbacks
    const orbitControls = new OrbitControls(camera, renderer.domElement)

    div.appendChild(renderer.domElement)

    function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }
    animate()

    div.addEventListener('resize', _ => {
        camera.aspect = div.clientWidth / div.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(div.clientWidth, div.clientHeight)
    })
})
</script>

<template>
    <div>
        <div ref="renderRef" class="bg-[#acacac] w-full aspect-video border-burnt-yellow rounded border-2"></div>
        <p v-if="error" class="ml-2 text-red">
            {{ error }}
        </p>
    </div>
</template>