<script setup lang="ts">
import { dataToEsm } from '@rollup/pluginutils'

const local = ref("")
const description = ref("")
const files = ref<Array<File>>([])
const previews = ref<Array<string>>([])
watch(files, async files => previews.value = await Promise.all(files.map(fileToBase64)))

interface CompliantError {
    local?: string,
    description?: string,
    files?: string,
}

const hasRemoteError = ref(false)
const errors = ref<CompliantError>({})

function onDeleteImage(index: number) {
    const cpy = previews.value
    cpy.splice(index, 1)
    previews.value = [...cpy]
}

function onSave() {
    if (hasError<CompliantError>(
        {
            local: lengthValidator(local, "Por favor, insira o local do incidente"),
            description: lengthValidator(description, "Por favor, insira uma descrição", 50),
            files: lengthValidator(previews, "Por favor, insira algumas evidências")
        },
        errors
    )) return
}
</script>

<template>
    <div class="p-4">
        <h1 class="text-6xl font-amatic-sc">
            Denúncia
        </h1>
        <div class="space-y-2 mt-4">
            <tail-input-base placeholder="Local do incidente" :error="errors.local" v-model="local" />
            <tail-input-area rows="4" placeholder="Descreva sua denúncia" :error="errors.description"
                v-model="description" />
            <tail-input-file-dialog multiple :error="errors.files" v-model="files">
                <tail-button-blue-violet title="Evidências" />
            </tail-input-file-dialog>
            <div class="flex flex-wrap gap-2 justify-center">
                <tail-image-preview v-for="(p, index) in previews" :content="p" :index="index"
                    class="w-56 aspect-square" @onDelete="onDeleteImage" />
            </div>
            <br>
            <tail-button-blue-violet title="Enviar" @click="onSave" />
        </div>
    </div>
</template>