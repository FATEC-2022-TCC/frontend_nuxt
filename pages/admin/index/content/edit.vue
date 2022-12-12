<script setup lang="ts">

const route = useRoute()
const modal = useModal()

const content = ref("")
const title = ref("")
const description = ref("")
const background = ref(emptyList<string>())
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
            background.value = [result.background]
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
        background: background.value[0],
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
    <tail-loading-page class="flex flex-col p-4 pb-32" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl">
            Editar conteúdo
        </h1>
        <br>
        <wysiwyg-editor v-if="content" v-model="content" :error="errors.content" />
        <br>
        <div class="flex flex-col gap-4">
            <h2 class="font-amatic-sc text-4xl">
                Precisamos de algumas informações sobre o novo conteúdo
            </h2>
            <tail-input-base placeholder="Título" v-model="title" :error="errors.title" />
            <tail-input-base placeholder="Uma breve descrição" maxlength="255" v-model="description"
                :error="errors.description" />
            <div class="flex gap-4">
                <tail-input-base64-file-dialog v-model="background" class="flex-1" accept="image/*" :error="errors.background">
                    <tail-button-blue-violet title="Escolha um arquivo como preview do artigo" />
                </tail-input-base64-file-dialog>
                <tail-button-base v-if="background" class="bg-red" @click="background = []">
                    <icon name="ant-design:close-circle-filled" size="2rem"
                        class="m-auto hover:cursor-pointer text-white" />
                </tail-button-base>
            </div>
            <img v-if="background.length" :src="background[0]" class="w-full object-contain" />
            <h2 class="font-amatic-sc text-4xl">
                Até quando o conteúdo deve estar visível?
            </h2>
            <tail-date-picker v-model="until" :minDate="new Date()" class="border-blue-violet" />
            <tail-fab-save @click="onSave" />
        </div>
    </tail-loading-page>
</template>