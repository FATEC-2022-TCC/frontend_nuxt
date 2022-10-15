<script setup lang="ts">
const { modelValue = [] } = defineProps({
    modelValue: Array<File>
})
const emit = defineEmits<{
    (e: 'update:modelValue', files: Array<File>): void
}>()

function onChange(element: HTMLInputElement) {
    const fileList = element.files ?? new FileList()
    const files = new Array<File>()
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i)
        if (file == null) continue;
        files.push(file)
    }
    emit('update:modelValue', files)
    // const formData = new FormData()
    // for (const f of newFiles) {
    //     formData.append("files", f)
    // }
    // uploadFile(formData).then(handle({}))
}
</script>

<template>
    <div class="flex flex-col w-96">
        <input type="file" multiple v-on:change="onChange($event.target as HTMLInputElement)"
            class="font-nunito p-2 rounded-md bg-seashell border-2 border-blue-violet outline-none" v-bind="$attrs" />
        <ul v-if="modelValue.length > 1">
            <li v-for="file in modelValue" class="flex items-center p-2">
                <p class="flex-1"> {{ file.name }}</p>
            </li>
        </ul>
    </div>
</template>