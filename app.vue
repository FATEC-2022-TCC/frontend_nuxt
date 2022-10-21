<script setup lang="ts">
const modal = useModal()
useHead({
  title: 'Animais'
})
</script>

<template>
  <div>
    <tail-modal v-if="modal.type != ModalType.None" :modal-state="modal" />
    <nuxt-page :class="modal.type != ModalType.None ? 'blur-xl' : ''" />
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>