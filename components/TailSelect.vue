<script setup lang="ts">
const {
    data,
    visualTransform,
    valueTransform,
    modelValue,
    error
} = defineProps<{
    data: Array<Object>,
    visualTransform?: (any: any) => string,
    valueTransform?: (any: any) => any
    modelValue: any,
    error?: string
}>()

defineEmits<{
    (event: 'update:modelValue', value: any): any
}>()
</script>

<template>
    <div>
        <select class="w-full border-2 border-blue-violet rounded p-2 bg-transparent text-blue-violet"
            v-model="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
            <slot></slot>
            <option v-for="d in data" :value="valueTransform ? valueTransform(d) : d">
                {{ visualTransform ? visualTransform(d) : `${d}` }}
            </option>
        </select>
        <p v-if="error" class="ml-2 text-red">
            {{ error }}
        </p>
    </div>
</template>