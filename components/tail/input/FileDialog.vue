<script setup lang="ts">
const { 
    accept = "*"
} = defineProps({
    accept: String,
    error: String
})
const emit = defineEmits<{
    (e: 'update:modelValue', files: Array<File>): void
}>()

const inputs = Array<HTMLInputElement>()

function onClick() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept
    input.onchange = event => {
        const fileList = (event.target as HTMLInputElement).files
        const files: Array<File> = []
        if (!!fileList) {
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList.item(i)
                if (!file) continue
                files.push(file)
            }
        }
        emit("update:modelValue", files)
    }
    inputs.push(input)
    input.click()
}

//it's for do not leak HTML elements throught DOM
onBeforeUnmount(() => {
    for (const input of inputs) input.remove()
})
</script>

<template>
    <div @click="onClick()">
        <slot></slot>
        <p v-if="error" class="ml-2 text-red">
            {{ error }}
        </p>
    </div>
</template>