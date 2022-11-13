<script setup lang="ts">
defineProps<{
    modelValue: Array<string>
}>()
const emit = defineEmits<{
    (event: 'update:modelValue', value: Array<string>): void
}>()
const onDelete = (index: number, images: Array<string>) => {
    images.splice(index, 1)
    emit('update:modelValue', images)
}
</script>

<template>
    <tail-image-preview
        v-for="(p, index) in modelValue"
        :key="p + index"
        :content="p"
        :index="index"
        class="w-56 aspect-square"
        @on-delete="(index: number) => onDelete(index, modelValue)"
    />
</template>