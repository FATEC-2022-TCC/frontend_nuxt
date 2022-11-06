<script setup lang="ts">
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
defineEmits<{
    (event: 'onIcon'): void,
    (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
    <div class="w-full">
        <div class="relative flex items-center">
            <input class=" flex-1 pr-10 p-2 rounded-md border-2 border-blue-violet outline-none" :type="type"
                :placeholder="placeholder" :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                v-on:keyup.enter="$emit('onIcon')" />
            <div class="absolute right-2" @click="$emit('onIcon')">
                <slot></slot>
            </div>
        </div>
        <p v-if="error" class="ml-2 text-red text-start">
            {{ error }}
        </p>
    </div>
</template>