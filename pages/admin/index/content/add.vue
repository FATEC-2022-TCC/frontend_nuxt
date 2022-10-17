<script setup lang="ts">
const title = ref("")
const description = ref("")
const files = ref<Array<File>>([])
const preview = ref("")

watch(files, async files => {
    const file = files[0]
    if (!file) return
    const base64 = await fileToBase64(file)
    preview.value = base64
})

const content = ref("")
const until = ref(new Date())

function onSave() {
    const contentRequest = {
        data: content.value,
        background: preview.value,
        title: title.value,
        description: description.value,
        until: until.value.toISOString()
    }
    addContent(contentRequest).then(handle({
        onFailure: error => alert(JSON.stringify(error)),
        onSuccess: _ => navigateTo("/admin/content")
    }))
}
</script>

<template>
    <div class="flex flex-col pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Novo conteúdo
        </h1>
        <br>
        <wysiwyg-editor v-model="content" />
        <br>
        <div class="flex flex-col space-y-2">
            <h2 class="font-amatic-sc text-4xl">
                Precisamos de algumas informações sobre o novo conteúdo
            </h2>
            <tail-input-base placeholder="Título" v-model="title" />
            <tail-input-base placeholder="Uma breve descrição" maxlength="255" v-model="description" />
            <div class="flex space-x-2">
                <tail-input-file-dialog v-model="files" class="flex-1" accept="image/*">
                    <tail-button-blue-violet title="Escolha um arquivo como preview do artigo" class="w-full" />
                </tail-input-file-dialog>
                <tail-button-base v-if="preview" class="bg-red" @click="preview = ''">
                    <icon name="ant-design:close-circle-filled" size="2rem"
                        class="m-auto hover:cursor-pointer text-white" />
                </tail-button-base>
            </div>
            <img v-if="preview" :src="preview" class="w-1/5 object-contain self-center" />
            <tail-date-picker v-model="until" :minDate="new Date()" class="border-blue-violet" />
        </div>
        <tail-fab-save @click="onSave()" />
    </div>
</template>