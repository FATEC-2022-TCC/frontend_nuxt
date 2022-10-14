<script setup lang="ts">
const files = ref<File[]>([])

function onChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target == null) return
    const fileList = target.files ?? new FileList()
    const newFiles: File[] = []
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i)
        if (file == null) continue;
        newFiles.push(file)
    }
    files.value = newFiles
    const formData = new FormData()
    for (const f of newFiles) {
        formData.append("files", f)
    }
    uploadFile(formData).then(handle({}))
}
</script>

<template>
    <div class="flex flex-col w-96">
        <input type="file" multiple v-on:change="onChange($event)"
            class="font-nunito p-2 rounded-md bg-seashell border-2 border-blue-violet outline-none" v-bind="$attrs" />
        <ul v-if="files.length > 1">
            <li v-for="file in files" class="flex items-center p-2">
                <p class="flex-1"> {{ file.name }}</p>
            </li>
        </ul>
    </div>
</template>