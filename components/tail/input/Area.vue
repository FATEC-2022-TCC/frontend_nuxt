<script setup lang="ts">
const counter = ref(0)
defineProps({
    placeholder: String,
    type: String,
    modelValue: String,
    error: {
        default: "",
        required: false,
        type: String
    }
})
</script>

<template>
    <div>
        <div class="relative">
            <textarea v-bind="$attrs" class="w-full p-2 rounded-md border-2 border-blue-violet outline-none"
                :type="type" :placeholder="placeholder" :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value); counter = ($event.target as HTMLInputElement).value.length" />
            <p class="absolute right-4 bottom-4 select-none">Letras: {{ counter }}</p>
        </div>
        <p v-if="error" class="ml-2 text-red">
            {{ error }}
        </p>
    </div>
</template>