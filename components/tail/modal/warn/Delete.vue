<script setup lang="ts">
defineEmits<{
    (event: 'onDismiss'): void
    (event: 'onConfirm'): void
}>()
</script>

<template>
    <tail-modal-base>
        <div class="shadow-3xl rounded p-4 bg-burnt-yellow text-white">
            <div class="flex justify-end">
                <icon name="ant-design:close-circle-filled" size="2rem" class="hover:cursor-pointer text-white"
                    @click="$emit('onDismiss')" />
            </div>
            <br>
            <h1 class="text-6xl font-amatic-sc">
                Deseja mesmo deletar esse item?
            </h1>
            <br>
            <tail-button-blue-violet title="Sim, eu tenho certeza" @click="$emit('onConfirm')" />
        </div>
    </tail-modal-base>
</template>