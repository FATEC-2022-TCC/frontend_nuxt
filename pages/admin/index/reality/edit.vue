<script setup lang="ts">
const modal = useModal()
const route = useRoute()

const data = ref(new Array<string>())
const scale = ref("1")
const title = ref("")
const description = ref("")
const background = ref(new Array<string>())
const isVisible = ref(false)
const images = ref(new Array<string>())

const model = ref<THREE.Group | null>(null)
const scaleRef = ref(1)

interface Errors {
    data?: string,
    scale?: string,
    title?: string,
    description?: string,
    background?: string,
    images?: string,
}

const isLoading = ref(true)
const hasRemoteError = ref(false)
const errors = ref<Errors>({})

watch(data, async data => {
    const toParse = data[0]
    if (!toParse) return
    const gltf = await base64ToGLTF(toParse)
    model.value = gltf.scene
    const num = parseFloat(scale.value)
    scaleRef.value = num
})

watch(scale, scale => {
    const num = parseFloat(scale)
    scaleRef.value = num
})

const id = route.query["id"]?.toString() ?? ''

function start() {
    getReality(id).then(handle({
        onSuccess: response => {
            data.value = [response.data]
            scale.value = `${response.scale}`
            title.value = response.title
            description.value = response.description
            background.value = [response.background]
            isVisible.value = response.isVisible
            images.value = response.images.map(e => e.data)
            isLoading.value = false
        },
        onFailure: onFailure(hasRemoteError)
    }))
}

if (!id) navigateTo("/admin/reality")
else start()

function onSave() {
    hasRemoteError.value = false
    if (hasError<Errors>(
        {
            title: lengthValidator(title, "Você precisa adicionar algum nome"),
            description: lengthValidator(description, "Você precisa adicionar alguma descrição"),
            background: lengthValidator(background, "Você deve inserir uma foto de perfil"),
            images: lengthValidator(images, "Você precisa inserir ao menos uma imagem"),
            data: lengthValidator(data, "Você precisa inserir um modelo"),
            scale: lengthValidator(scale, "Você precisa inserir a escala do modelo")
        },
        errors
    )) return

    updateReality({
        id: parseInt(id),
        data: data.value[0],
        scale: scaleRef.value,
        title: title.value,
        description: description.value,
        background: background.value[0],
        isVisible: isVisible.value,
        images: images.value,
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onNullSucess: () => {
            modal.value = {
                type: ModalType.Success,
                title: "Oba, a nova realidade aumentada foi atualizada!"
            }
            navigateTo("/admin/reality")
        }
    }))
}
</script>

<template>
    <tail-loading-page class="flex flex-col gap-4 p-4 pb-32" :is-loading="isLoading" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl">
            Nova realidade aumentada
        </h1>
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
        <tail-input-base64-file-dialog :error="errors.data" v-model="data" accept=".glb">
            <tail-button-blue-violet title="Escolha o modelo" />
        </tail-input-base64-file-dialog>
        <tail-input-base type="number" step="0.1" placeholder="Escala do modelo" v-model="scale"
            :error="errors.scale" />
        <tail-three-preview :scale="scaleRef" :model="model" :error="errors.data" />
        <div class="flex items-center justify-between">
            <p>O modelo {{ isVisible ? '' : 'não' }} está vísivel aos usuários</p>
            <tail-switch v-model="isVisible" />
        </div>
        <tail-fab-save @click="onSave" />
    </tail-loading-page>
</template>