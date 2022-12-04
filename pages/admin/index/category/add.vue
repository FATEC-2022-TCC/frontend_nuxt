<script setup lang="ts">

const modal = useModal()

const name = ref("")
const description = ref("")
const images = ref(new Array<string>())

interface Errors {
    name?: string,
    description?: string,
    images?: string,
}

const hasRemoteError = ref(false)
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

    addCategory({
        name: name.value,
        description: description.value,
        images: images.value
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: _ => {
            modal.value = {
                type: ModalType.Success,
                title: "Oba, a nova categoria foi inserida!",
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
            Nova categoria
        </h1>
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col gap-4">
            <h2 class="font-amatic-sc text-4xl">
                Precisamos de algumas informações sobre o novo conteúdo
            </h2>
            <tail-input-base placeholder="Nome" v-model="name" :error="errors.name" />
            <tail-input-area placeholder="Uma breve descrição" maxlength="255" v-model="description"
                :error="errors.description" />
            <tail-input-base64-file-dialog multiple :error="errors.images" v-model="images">
                <tail-button-blue-violet title="Fotos" />
            </tail-input-base64-file-dialog>
            <tail-image-handler v-model="images" v-if="images.length" />
            <tail-fab-save @click="onSave" />
        </div>
        <tail-error v-else>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
    </div>
</template>