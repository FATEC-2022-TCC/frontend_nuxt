<script setup lang="ts">
const modal = useModal()
const route = useRoute()

const name = ref("")
const description = ref("")
const images = ref(new Array<string>())

const hasRemoteError = ref(false)
const isLoading = ref(true)

const id = route.query["id"]?.toString() ?? ''

function getCompliant() {
    getCategory(id).then(handle({
        onSuccess: response => {
            name.value = response.name
            description.value = response.description
            images.value = response.images.map(base64 => base64.data)
        },
        onFailure: onFailure(hasRemoteError),
        finally() {
            isLoading.value = false
        }
    }))
}

if (!id) navigateTo("/admin/category")
getCompliant()

interface Errors {
    name?: string,
    description?: string,
    images?: string
}

const errors = ref<Errors>({})

function onSave() {
    hasRemoteError.value = false
    if (hasError<Errors>(
        {
            name: lengthValidator(name, "Você precisa adicionar algum nome"),
            description: lengthValidator(description, "Você precisa adicionar alguma descrição"),
        },
        errors
    )) return

    updateCategory({
        id: parseInt(id),
        name: name.value,
        description: description.value,
        images: images.value
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: _ => {
            modal.value = {
                type: ModalType.Success,
                title: "Oba, a nova categoria foi atualizada!",
                messages: [
                    "Ela já está disponível aos usuários"
                ]
            }
            navigateTo("/admin/category")
        }
    }))
}

</script>

<template>
    <div class="flex flex-col p-4 pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Editar categoria
        </h1>
        <br>
        <div v-if="!isLoading && !hasRemoteError" class="space-y-2">
            <tail-input-base placeholder="Nome" v-model="name" :error="errors.name" />
            <tail-input-area placeholder="Uma breve descrição" maxlength="255" v-model="description"
                :error="errors.description" />
            <tail-input-base64-file-dialog multiple :error="errors.images" v-model="images">
                <tail-button-blue-violet title="Fotos" />
            </tail-input-base64-file-dialog>
            <div class="flex flex-wrap gap-2 justify-center mt-4" v-if="images.length">
                <tail-image-handler v-model="images" />
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