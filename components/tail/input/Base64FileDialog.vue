<script setup lang="ts">
const { multiple = false } = defineProps<{
    accept?: string,
    multiple?: boolean,
    error?: string,
    modelValue: Array<string>
}>()

const emit = defineEmits<{
    (event: "update:modelValue", value: Array<string>): void
}>()

async function onFiles(files: Array<File>, images: Array<string>) {
    const result = await Promise.all(files.map(fileToBase64))
    if (multiple) {
        result.push(...images)
    }
    emit('update:modelValue', result)
}
</script>

<template>
    <tail-input-file-dialog @update:model-value="(files: Array<File>) => onFiles(files, modelValue)"
        :multiple="multiple" :accept="accept" :error="error">
        <slot></slot>
    </tail-input-file-dialog>
</template>