<script setup lang="ts">

const modal = useModal()

const content = ref("")
const title = ref("")
const description = ref("")
const files = ref<Array<File>>([])
const background = ref("")
watch(files, async files => {
    const file = files[0]
    if (!file) return
    const base64 = await fileToBase64(file)
    background.value = base64
})
const until = ref(new Date())

interface AddErrors {
    content?: string,
    title?: string,
    description?: string,
    background?: string,
}

const hasRemoteError = ref(false)
const errors = ref<AddErrors>({})

function onSave() {
    hasRemoteError.value = false
    if (errorsToObject<AddErrors>(
        {
            content: [
                content,
                "Você precisa adicionar algum conteúdo",
                [
                    content => content == "<p></p>" && "Você precisa adicionar algum conteúdo"
                ]
            ],
            title: [title, "Você precisa adicionar algum título", []],
            description: [description, "Você precisa adicionar alguma descrição", []],
            background: [background, "Você precisa adicionar alguma imagem de fundo", []]
        },
        errors
    )) return

    addContent({
        data: content.value,
        background: background.value,
        title: title.value,
        description: description.value,
        until: until.value
    }).then(handle({
        onFailure: error => {
            console.log(JSON.stringify(error))
            hasRemoteError.value = true
        },
        onSuccess: _ => {
            modal.value = {
                type: ModalType.Success,
                title: "Oba, o novo conteúdo foi inserido!",
                messages: [
                    "Ele já está disponível aos usuários"
                ]
            }
            navigateTo("/admin/content")
        }
    }))
}
</script>

<template>
    <div class="flex flex-col p-4 pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Novo conteúdo
        </h1>
        <br>
        <wysiwyg-editor v-model="content" :error="errors.content" />
        <br>
        <div class="flex flex-col space-y-2">
            <h2 class="font-amatic-sc text-4xl">
                Precisamos de algumas informações sobre o novo conteúdo
            </h2>
            <tail-input-base placeholder="Título" v-model="title" :error="errors.title" />
            <tail-input-base placeholder="Uma breve descrição" maxlength="255" v-model="description"
                :error="errors.description" />
            <div class="flex space-x-2">
                <tail-input-file-dialog v-model="files" class="flex-1" accept="image/*" :error="errors.background">
                    <tail-button-blue-violet title="Escolha um arquivo como preview do artigo" />
                </tail-input-file-dialog>
                <tail-button-base v-if="background" class="bg-red" @click="background = ''">
                    <icon name="ant-design:close-circle-filled" size="2rem"
                        class="m-auto hover:cursor-pointer text-white" />
                </tail-button-base>
            </div>
            <img v-if="background" :src="background" class="w-full object-contain" />
            <br>
            <br>
            <h2 class="font-amatic-sc text-4xl">
                Até quando o conteúdo deve estar visível?
            </h2>
            <tail-date-picker v-model="until" :minDate="new Date()" class="border-blue-violet" />
        </div>
        <br>
        <tail-error v-if="hasRemoteError">
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
        <tail-fab-save @click="onSave()" />
    </div>
</template>