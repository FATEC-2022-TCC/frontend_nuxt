<script setup lang="ts">
const files = ref<Array<File>>([])
const previews = ref<Array<String>>([])
watch(files, async files => {
    const arr: String[] = []
    for (const file of files) arr.push(await fileToBase64(file))
    previews.value = arr
})
</script>

<template>
    <div class="p-4">
        <h1 class="text-6xl font-amatic-sc">
            Denúncia
        </h1>
        <div class="space-y-2 mt-4">
            <tail-input-area rows="4" placeholder="Descreva sua denúncia" />
            <tail-input-file-dialog multiple>
                <tail-button-blue-violet title="Evidências" />
            </tail-input-file-dialog>
        </div>
    </div>
</template>