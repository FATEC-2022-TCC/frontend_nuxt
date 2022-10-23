<script setup lang="ts">
const modal = useModal()
useHead({
  title: 'Animais'
})
</script>

<template>
  <div>
    <tail-modal-error v-if="modal.type == ModalType.Error" :modal-state="modal" />
    <tail-modal-success v-if="modal.type == ModalType.Success" :modal-state="modal" />
    <!-- !!modalType does not work since first enum value is treated as zero -->
    <nuxt-page :class="modal.type != undefined ? 'blur' : ''" />
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>