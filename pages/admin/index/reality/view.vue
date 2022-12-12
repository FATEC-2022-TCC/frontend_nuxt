<script setup lang="ts">
import { Reality } from '~~/composables/admin/Reality';

const route = useRoute()

const response = ref<Reality | null>(null)
const model = ref<THREE.Group | null>(null)

const hasRemoteError = ref(false)

const id = route.query["id"]?.toString() ?? ''

function start() {
    getReality(id).then(handle({
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
    model.value = scene
})

if (!id) navigateTo("/admin/complaint")
else start()

</script>

<template>
    <tail-loading-page class="p-4" :has-remote-error="hasRemoteError" :is-loading="!response">
        <h1 class="font-amatic-sc text-6xl">
            Análisar realidade aumentada
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
            <h1 class="text-4xl font-amatic-sc">Escala do modelo: &nbsp;</h1>
            <p> {{ response.scale }}</p>
            <br>
            <h1 class="text-4xl font-amatic-sc">Modelo: &nbsp;</h1>
            <tail-three-preview :scale="response.scale" :model="model" />
        </template>
    </tail-loading-page>
</template>