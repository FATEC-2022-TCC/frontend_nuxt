<script setup lang="ts">
const modal = useModal()

const data = ref(new Array<string>())
const scale = ref("1")
const title = ref("")
const description = ref("")
const background = ref(new Array<string>())
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

    addReality({
        data: data.value[0],
        scale: scaleRef.value,
        title: title.value,
        description: description.value,
        background: background.value[0],
        images: images.value,
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onNullSucess: () => {
            modal.value = {
                type: ModalType.Success,
                title: "Oba, a nova realidade aumentada foi incluida no sistema!",
                messages: [
                    "Ela ainda não está disponível aos usuários",
                    "Você deve edita-la e torna-la visível"
                ]
            }
            navigateTo("/admin/reality")
        }
    }))
}
</script>

<template>
    <div class="flex flex-col p-4 pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Nova realidade aumentada
        </h1>
        <br>
        <tail-loading-page :has-remote-error="hasRemoteError">
            <div class="flex flex-col gap-4">
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
                <tail-fab-save @click="onSave" />
            </div>
        </tail-loading-page>
    </div>
</template>