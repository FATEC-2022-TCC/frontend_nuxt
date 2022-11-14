<script setup lang="ts">
import { StateDescription, StatusRequest } from '~/composables/api/Status'

defineProps<{
    statuses: Array<StateDescription>
}>()
const emit = defineEmits<{
    (event: 'onAddStatus', value: StatusRequest): void
}>()

const status = ref(-1)
const description = ref("")
const files = ref<Array<string>>([])

interface Errors {
    status?: string,
    description?: string,
    files?: string
}

const errors = ref<Errors>({})

function onSave(statuses: Array<StateDescription>) {
    if (hasError<Errors>(
        {
            status: buildValidator(status, status => status != -1, "Por favor, insira um status válido"),
            description: lengthValidator(description, "Por favor, insira uma descrição")
        },
        errors
    )) return

    const object = statuses.filter(object => object.code == status.value).pop()
    if (!object) return

    emit("onAddStatus", {
        code: object.code,
        description: `${object.description}\n\n${description.value}`,
        files: files.value
    })
}
</script>

<template>
    <div class="bg-white p-4 border border-blue-violet flex flex-col">
        <h1 class="text-4xl font-amatic-sc">Adicionar novo status:</h1>
        <br>
        <div class="flex flex-col">
            <h1 class="text-4xl font-amatic-sc">Tipo de status:</h1>
            <tail-select :data="statuses" :visual-transform="status => status.description"
                :value-transform="status => status.code" :error="errors.status" v-model="status">
                <option :value="-1">
                    Nenhum
                </option>
            </tail-select>
        </div>
        <br>
        <tail-input-area v-model="description" :error="errors.description" />
        <br>
        <tail-input-base64-file-dialog multiple :error="errors.files" v-model="files">
            <tail-button-blue-violet title="Fotos" />
        </tail-input-base64-file-dialog>
        <div class="flex flex-wrap gap-2 justify-center mt-4" v-if="files.length">
            <tail-image-handler v-model="files" />
        </div>
        <br>
        <icon name="ant-design:save-filled" size="3rem"
            class="text-blue-violet hover:text-burnt-yellow hover:cursor-pointer m-auto mr-0"
            @click="onSave(statuses)" />
    </div>
</template>