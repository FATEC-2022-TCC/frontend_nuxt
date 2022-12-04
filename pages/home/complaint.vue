<script setup lang="ts">

const modal = useModal()
const router = useRouter()
const session = useSession()

const local = ref("")
const description = ref("")
const images = ref<Array<string>>([])

interface ComplaintError {
    local?: string,
    description?: string
}

const hasRemoteError = ref(false)
const errors = ref<ComplaintError>({})

function onSave() {
    if (hasError<ComplaintError>(
        {
            local: lengthValidator(local, "Por favor, insira o local do incidente"),
            description: [
                lengthValidator(description, "Por favor, insira uma descrição"),
                buildValidator(description, text => text.length >= 50, "Insira uma descrição maior do que 50 letras")
            ]
        },
        errors
    )) return

    addComplaint({
        local: local.value,
        description: description.value,
        images: images.value
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
    <div class="flex flex-col gap-4 p-4">
        <h1 class="text-6xl font-amatic-sc">
            Denúncia
        </h1>
        <div v-if="!hasRemoteError" class="flex flex-col gap-4">
            <tail-input-base placeholder="Local do incidente" :error="errors.local" v-model="local" />
            <tail-input-area rows="4" placeholder="Descreva sua denúncia" :error="errors.description"
                v-model="description" />
            <tail-input-base64-file-dialog multiple v-model="images" >
                <tail-button-blue-violet title="Fotos" />
            </tail-input-base64-file-dialog>
            <tail-image-handler v-model="images" v-if="images.length" />
            <tail-button-blue-violet
                v-if="session.token"
                title="Enviar"
                @click="onSave"
            />
            <tail-button-blue-violet
                v-else
                title="Faça o login para poder criar uma denúncia"
                @click="navigateTo('/signin')"
            />
        </div>
        <tail-error v-else>
            <p>Algo deu errado.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
    </div>
</template>