<script setup lang="ts">
const { modelValue = false } = defineProps({
    modelValue: Boolean
})
</script>

<template>
    <div class="w-10 h-10 rounded flex cursor-pointer transition-shadow hover:shadow-2xl"
        :class="modelValue ? 'bg-[#BF80FF33]' : 'bg-[#E5E5E5]'" @click="$emit('update:modelValue', !modelValue)">
        <icon name="ant-design:heart-filled" size="2rem" class="m-auto"
            :class="modelValue ? 'text-[#F35353]' : 'text-[#8E8E8E]'" />
    </div>
</template>

