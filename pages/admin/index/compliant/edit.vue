<script setup lang="ts">
import { Compliant } from '~~/composables/admin/Compliant';

const modal = useModal()
const route = useRoute()

const compliant = ref<Compliant | null>(null)

const resolution = ref("")
const closed = ref(false)

const files = ref<Array<File>>([])
const previews = ref<Array<string>>([])
watch(files, async files => previews.value = await Promise.all(files.map(fileToBase64)))

const hasRemoteError = ref(false)

const id = route.query["id"]?.toString() ?? ''

if (!id) navigateTo("/admin/compliant")
else getCompliant(id).then(handle({
    onSuccess: onSuccess(compliant, compliant => {
        if (!compliant) return
        resolution.value = compliant.resolution
        closed.value = compliant.closed
        previews.value = compliant.resolutionFiles.map(f => f.data)
    }),
    onFailure: onFailure(hasRemoteError)
}))

function onDeleteImage(index: number) {
    const cpy = previews.value
    cpy.splice(index, 1)
    previews.value = [...cpy]
}

function onSave() {
    const id = compliant.value?.id
    if (!id) return
    updateCompliant({
        id,
        resolution: resolution.value,
        resolutionFiles: previews.value,
        closed: closed.value
    }).then(handle({
        onSuccess: _ => {
            modal.value = {
                type: ModalType.Success,
                title: "A denúncia foi atualizada!",
                messages: []
            }
            navigateTo("/admin/compliant")
        },
        onFailure: onFailure(hasRemoteError)
    }))
}
</script>

<template>
    <div class="flex flex-col p-4 pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Analisar denúncia
        </h1>
        <br>
        <div v-if="compliant && !hasRemoteError">
            <div class="ml-4">
                <h1 class="text-4xl font-amatic-sc">Local: &nbsp;</h1>
                <p> {{ compliant.local }}</p>
                <br>
                <h1 class="text-4xl font-amatic-sc">Descrição: &nbsp;</h1>
                <p> {{ compliant.description }}</p>
                <br>
                <h1 class="text-4xl font-amatic-sc">Imagens: &nbsp;</h1>
                <div class="mt-2 flex flex-wrap justify-center gap-2">
                    <img v-for="f in compliant.files" :src="f.data" class="w-48">
                </div>
            </div>
            <br>
            <br>
            <div>
                <h1 class="text-4xl font-amatic-sc">Resolução da denúncia: &nbsp;</h1>
                <br>
                <tail-input-area v-model="resolution" placeholder="Escreva a resolução do caso acima" />
                <div class="flex">
                    <h1 class="text-4xl font-amatic-sc">Deseja fechar a denúncia?: &nbsp;</h1>
                    <h1 v-if="closed" class="text-4xl font-amatic-sc">Sim</h1>
                    <h1 v-else class="text-4xl font-amatic-sc">Não</h1>
                    <div class="flex-1"></div>
                    <tail-switch v-model="closed" />
                </div>
                <br>
                <tail-input-file-dialog multiple v-model="files">
                    <tail-button-blue-violet title="Adicionar imagens ao caso" />
                </tail-input-file-dialog>
                <br>
                <div class="flex flex-wrap gap-2 justify-center">
                    <tail-image-preview v-for="(p, index) in previews" :content="p" :index="index" @on-delete="onDeleteImage"
                        class="w-56 aspect-square" />
                </div>
            </div>
        </div>
        <div v-else-if="!hasRemoteError">
            <p>Carregando...</p>
        </div>
        <tail-error v-else>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
        <tail-fab-save @click="onSave()" />
    </div>
</template>