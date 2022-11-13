<script setup lang="ts">

const modal = useModal()
const router = useRouter()

const local = ref("")
const description = ref("")
const previews = ref<Array<string>>([])

interface ComplaintError {
    local?: string,
    description?: string,
    files?: string,
}

const hasRemoteError = ref(false)
const errors = ref<ComplaintError>({})

function onDeleteImage(index: number) {
    const cpy = previews.value
    cpy.splice(index, 1)
    previews.value = [...cpy]
}

function onSave() {
    if (hasError<ComplaintError>(
        {
            local: lengthValidator(local, "Por favor, insira o local do incidente"),
            description: [
                lengthValidator(description, "Por favor, insira uma descrição"),
                buildValidator(description, text => text.length >= 50, "Insira uma descrição maior do que 50 letras")
            ],
            files: lengthValidator(previews, "Por favor, insira algumas evidências")
        },
        errors
    )) return

    addComplaint({
        local: local.value,
        description: description.value,
        files: previews.value
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onNullSucess: () => {
            modal.value = {
                type: ModalType.Success,
                title: "Tudo certo!",
                messages: [
                    "Sua denúncia foi feita de forma anônima.",
                    "Ela será analisada assim que possível."
                ]
            }
            router.replace("/home")
        }
    }))
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
            <tail-input-base64-file-dialog multiple v-model="previews">
                <tail-button-blue-violet title="Fotos" />
            </tail-input-base64-file-dialog>
            <div class="flex flex-wrap gap-2 justify-center">
                <tail-image-preview v-for="(p, index) in previews" :content="p" :index="index"
                    class="w-56 aspect-square" @onDelete="onDeleteImage" />
            </div>
            <br>
            <tail-button-blue-violet title="Enviar" @click="onSave" />
            <tail-error v-if="hasRemoteError">
                <p>Algo deu errado.</p>
                <p>Tente novamente mais tarde!</p>
            </tail-error>
        </div>
    </div>
</template>