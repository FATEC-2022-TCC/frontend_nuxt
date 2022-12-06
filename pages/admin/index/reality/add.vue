<script setup lang="ts">
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

const modal = useModal()

const data = ref(new Array<string>())
const scale = ref(1)
const title = ref("")
const description = ref("")
const background = ref(new Array<string>())
const images = ref(new Array<string>())

const loader = new GLTFLoader()
const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff, 1)
const axes = new THREE.AxesHelper(60)
const renderRef = ref<HTMLDivElement | null>(null)

interface Errors {
    data?: string,
    scale?: string,
    title?: string,
    description?: string,
    background?: string,
    images?: string,
}

const hasRemoteError = ref(false)
const errors = ref<Errors>({})

watch(data, async data => {
    const toParse = data[0]
    if (!toParse) return
    const url = await base64ToURL(toParse)
    const model = await loader.loadAsync(url)
    initScene()
    scene.add(model.scene)
})

function onSave() {
    hasRemoteError.value = false
    if (hasError<Errors>(
        {
            title: lengthValidator(title, "Você precisa adicionar algum nome"),
            description: lengthValidator(description, "Você precisa adicionar alguma descrição"),
            background: lengthValidator(background, "Você deve inserir uma foto de perfil"),
            images: lengthValidator(images, "Você precisa inserir ao menos uma imagem")
        },
        errors
    )) return

    // addAdoption({
    //     name: name.value,
    //     description: description.value,
    //     gender: gender.value,
    //     size: size.value,
    //     categoryId: categoryId.value,
    //     picture: picture.value[0],
    //     images: images.value,
    // }).then(handle({
    //     onFailure: onFailure(hasRemoteError),
    //     onSuccess: _ => {
    //         modal.value = {
    //             type: ModalType.Success,
    //             title: "Oba, a nova adoção foi inserida no sistema!",
    //             messages: [
    //                 "Ela ainda não está disponível aos usuários",
    //                 "Você deve edita-la e torna-la visível"
    //             ]
    //         }
    //         navigateTo("/admin/adoption")
    //     }
    // }))
}

function initScene() {
    scene.remove(...scene.children)
    scene.add(light)
    scene.add(axes)
}

onMounted(() => {
    const div = renderRef.value
    if (!div) return

    const camera = new THREE.PerspectiveCamera(
        75,
        div.clientWidth / div.clientHeight,
        0.1,
        1000
    )

    camera.position.z = 5

    initScene()

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    })
    renderer.setSize(div.clientWidth, div.clientHeight)
    
    //necessary for metallics models
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

    //only to user see model, we don't care for callbacks
    const orbitControls = new OrbitControls(camera, renderer.domElement)

    div.appendChild(renderer.domElement)

    function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }
    animate()
})
</script>

<template>
    <div class="flex flex-col p-4 pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Nova realidade aumentada
        </h1>
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col gap-4">
            <tail-input-base placeholder="Título" v-model="title" :error="errors.title" />
            <tail-input-area placeholder="Uma breve descrição" v-model="description" :error="errors.description" />
            <tail-input-base64-file-dialog :error="errors.background" v-model="background">
                <tail-button-blue-violet title="Uma foto de preview" />
            </tail-input-base64-file-dialog>
            <tail-image-handler v-model="background" v-if="background.length" />
            <tail-input-base64-file-dialog multiple :error="errors.images" v-model="images">
                <tail-button-blue-violet title="Escolha mais algumas fotos do modelo" />
            </tail-input-base64-file-dialog>
            <tail-image-handler v-model="images" v-if="images.length" />
            <tail-input-base64-file-dialog :error="errors.data" v-model="data">
                <tail-button-blue-violet title="Escolha o modelo" />
            </tail-input-base64-file-dialog>
            <div ref="renderRef" class="bg-[#00F] w-full h-96 border-burnt-yellow rounded border-2"></div>
            <tail-fab-save @click="onSave" />
        </div>
        <tail-error v-else>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
    </div>
</template>