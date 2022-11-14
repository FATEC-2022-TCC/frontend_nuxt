<script setup lang="ts">
defineProps<{
    data: Array<Object>,
    visualTransform?: (any: any) => string,
    valueTransform?: (any: any) => any
    modelValue: any,
    error?: string
}>()

defineEmits<{
    (event: 'update:modelValue', value: any): void
}>()
</script>

<template>
    <div class="w-full">
        <select class="w-full border-2 border-blue-violet rounded p-2 bg-white text-blue-violet"
            :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
            <slot></slot>
            <option v-for="d in data" :value="valueTransform ? valueTransform(d) : d">
                {{ visualTransform ? visualTransform(d) : d }}
            </option>
        </select>
        <p v-if="error" class="ml-2 text-red">
            {{ error }}
        </p>
    </div>
</template>