<script setup lang="ts">
const { accept = "*" } = defineProps({
    accept: String
})
const emit = defineEmits<{
    (e: 'update:modelValue', files: Array<File>): void
}>()

let input: HTMLInputElement | null = null

onMounted(() => {
    input = document.createElement("input")
    input.type = "file"
    input.accept = accept
    input.onchange = event => {
        const files = (event.target as HTMLInputElement).files
        const res: Array<File> = []
        if (!!files) {
            for (let i = 0; i < files.length; i++) {
                const file = files.item(i)
                if (!file) continue
                res.push(file)
            }
        }
        emit("update:modelValue", res)
    }
})

onBeforeUnmount(() => {
    input?.remove()
})

function onClick() {
    input?.click()
}
</script>

<template>
    <div @click="onClick()">
        <slot></slot>
    </div>
</template>