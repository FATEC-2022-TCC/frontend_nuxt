<script setup lang="ts">
defineProps({
    accept: String,
    multiple: Boolean,
    error: String
})

const emit = defineEmits<{
    (event: "update:modelValue", value: Array<string>): void
}>()

async function onFiles(files: Array<File>) {
    const result = await Promise.all(files.map(fileToBase64))
    emit('update:modelValue', result)
}

</script>

<template>
    <tail-input-file-dialog @update:model-value="onFiles" :multiple="multiple" :accept="accept" :error="error">
        <slot></slot>
    </tail-input-file-dialog>
</template>