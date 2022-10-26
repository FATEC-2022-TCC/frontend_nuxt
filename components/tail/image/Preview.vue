<script setup lang="ts">
defineProps({
    content: String,
    index: Number
})
</script>

<template>
    <div class="flex flex-col border rounded shadow p-2 border-blue-violet gap-2">
        <icon 
            name="ant-design:close-circle-filled"
            size="2rem"
            class="hover:cursor-pointer self-end text-red"
            @click="$emit('onDelete', index)"
        />
        <img :src="content" class="object-cover flex-1"/>
    </div>
</template>