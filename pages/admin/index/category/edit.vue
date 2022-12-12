<script setup lang="ts">
const modal = useModal()
const route = useRoute()

const name = ref("")
const description = ref("")
const images = ref(emptyList<string>())

interface Errors {
    name?: string,
    description?: string,
    images?: string
}

const hasRemoteError = ref(false)
const isLoading = ref(true)
const errors = ref<Errors>({})

const id = route.query["id"]?.toString() ?? ''

if (!id) navigateTo("/admin/category")
else start()

function start() {
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
    <tail-loading-page class="flex flex-col gap-4 p-4 pb-32" :is-loading="isLoading" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl">
            Editar categoria
        </h1>
        <tail-input-base placeholder="Nome" v-model="name" :error="errors.name" />
        <tail-input-area placeholder="Uma breve descrição" maxlength="255" v-model="description"
            :error="errors.description" />
        <tail-input-base64-file-dialog multiple :error="errors.images" v-model="images">
            <tail-button-blue-violet title="Fotos" />
        </tail-input-base64-file-dialog>
        <tail-image-handler v-model="images" v-if="images.length" />
        <tail-fab-save @click="onSave" />
    </tail-loading-page>
</template>