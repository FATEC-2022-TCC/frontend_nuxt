<script setup lang="ts">
import { UpdateComplaintRequest } from '~~/composables/admin/Complaint';
type Status = { code: number, description: string }
defineProps<{
    statuses: Array<Status>
}>()
const emit = defineEmits<{
    (event: 'onAddStatus', value: UpdateComplaintRequest): void
}>()

const status = ref<Status>({ code: -1, description: "Nenhum" })
const description = ref("")
const files = ref<Array<string>>([])

interface Errors {
    status?: string,
    description?: string,
    files?: ""
}

const errors = ref<Errors>({})

function onSave() {
    if (hasError<Errors>(
        {
            status: buildValidator(status, status => status.code != -1, "Por favor, insira um status válido"),
            description: lengthValidator(description, "Por favor, insira uma descrição")
        },
        errors
    )) return

    emit("onAddStatus", {
        id: -1,
        status: {
            code: status.value.code,
            description: `${status.value.description}\n\n${description.value}`,
            files: files.value
        }
    })
}
</script>

<template>
    <div class="p-4 border border-blue-violet flex flex-col">
        <h1 class="text-4xl font-amatic-sc">Adicionar novo status:</h1>
        <br>
        <div class="flex flex-col">
            <h1 class="text-4xl font-amatic-sc">Tipo de status:</h1>
            <select class="border-2 rounded p-2 text-blue-violet text-xl mt-2" v-model="status">
                <option :value="{ code: -1, description: 'Nenhum' }">
                    Nenhum
                </option>
                <option v-for="status in statuses" :value="status">
                    {{ status.description }}
                </option>
            </select>
            <p v-if="errors.status" class="ml-2 text-red">
                {{ errors.status }}
            </p>
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
            class="text-blue-violet hover:text-burnt-yellow hover:cursor-pointer m-auto mr-0" @click="onSave" />
    </div>
</template>