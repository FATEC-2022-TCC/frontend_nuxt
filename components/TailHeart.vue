<script setup lang="ts">
    interface Props {
        value?: boolean
    }
    const { value } = withDefaults(defineProps<Props>(), {
        value: false
    })
    const state = ref(value)
</script>

<template>
    <div
        class="w-10 h-10 rounded flex cursor-pointer transition-shadow hover:shadow-2xl"
        :class="state ? 'bg-[#BF80FF33]' : 'bg-[#E5E5E5]'"
        @click="state = !state">
        <icon
            name="ant-design:heart-filled" 
            size="2rem" 
            class="m-auto"
            :class="state ? 'text-[#F35353]' : 'text-[#8E8E8E]'"
        />
    </div>
</template>

