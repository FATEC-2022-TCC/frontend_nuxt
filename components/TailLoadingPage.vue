<script setup lang="ts">
defineProps<{
    isLoading?: boolean,
    hasRemoteError: boolean
}>()
</script>

<template>
    <div v-bind="$attrs" v-if="(!isLoading && !hasRemoteError)">
        <slot></slot>
    </div>
    <div v-else-if="!hasRemoteError">
        <p>Carregando...</p>
    </div>
    <div v-else>
        <tail-error>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
    </div>
</template>