<script setup lang="ts">
    const props = defineProps(['title'])
    const { title } = props
</script>

<template>
    <button type="button" class="btn-primary" >{{ title }}</button>
</template>

<style>
.btn-primary {
    border: 0;
    padding: 10px;
    background-color: #7918D9;
    border-radius: 7px;
    font-size: 12px;
    color: white;
    font-weight: bold;
    cursor: pointer;
}
</style>