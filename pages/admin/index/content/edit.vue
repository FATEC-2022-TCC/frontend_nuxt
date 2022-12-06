<script setup lang="ts">

const route = useRoute()
const modal = useModal()

const content = ref("")
const title = ref("")
const description = ref("")
const files = ref<Array<File>>([])
const background = ref("")
watch(files, async files => {
    const file = files[0]
    if (!file) return
    background.value = await fileToBase64(file)
})
const until = ref(new Date())

interface EditErrors {
    content?: string,
    title?: string,
    description?: string,
    background?: string,
}

const hasRemoteError = ref(false)
const errors = ref<EditErrors>({})

const id = route.query["id"]?.toString() ?? ''

function start() {
    getContent(id).then(handle({
        onFailure: error => {
            console.log(error)
            modal.value = {
                type: ModalType.Error,
                title: "Ops!",
                messages: [
                    "Parece que esse conteúdo não foi encontrado!"
                ]
            }
            navigateTo("/admin/content")
        },
        onSuccess: result => {
            content.value = result.data
            title.value = result.title
            description.value = result.description
            background.value = result.background
            until.value = new Date(result.until)
        }
    }))
}

if (!id) navigateTo("/admin/content")
else start()

function onSave() {
    hasRemoteError.value = false
    if (hasError<EditErrors>(
        {
            content: [
                lengthValidator(content, "Você precisa adicionar algum conteúdo"),
                buildValidator(
                    content,
                    content => content !== "<p></p>",
                    "Você precisa adicionar algum conteúdo"
                )
            ],
            title: lengthValidator(title, "Você precisa adicionar algum título"),
            description: lengthValidator(description, "Você precisa adicionar alguma descrição"),
            background: lengthValidator(background, "Você precisa adicionar alguma imagem de fundo")
        },
        errors
    )) return

    updateContent({
        id,
        data: content.value,
        background: background.value,
        title: title.value,
        description: description.value,
        until: until.value
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: _ => {
            modal.value = {
                type: ModalType.Success,
                title: "Eba!",
                messages: [
                    "O conteúdo foi atualizado com sucesso!"
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
            Editar conteúdo
        </h1>
        <br>
        <wysiwyg-editor v-if="content" v-model="content" :error="errors.content" />
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col space-y-2">
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
            <tail-fab-save @click="onSave" />
        </div>
        <tail-error v-else>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
    </div>
</template>