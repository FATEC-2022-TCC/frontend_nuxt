<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
</script>

<template>
    <datepicker autoApply :clearable="false" :enableTimePicker="false" format="dd/MM/yyyy" />
</template>