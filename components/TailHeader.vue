<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
    <div class="bg-[#222] p-4 flex flex-col sm:flex-row">
        <img src="/quatro.png" class="h-10 object-contain">
        <div class="flex-1 hidden sm:block"></div>
        <ul class="menu flex-col mt-6 sm:flex-row sm:m-auto font-amatic-sc text-3xl" :class="isOpen ? 'flex' : ['hidden', 'sm:flex']">
            <li>
                <nuxt-link to="/home">Início</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/home/adoption">Adoção</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/home/contact">Contato</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/home/rules">Regras</nuxt-link>
            </li>
            <div class="hidden sm:block w-16"></div>
            <li>
                <nuxt-link to="/signin">Login</nuxt-link>
            </li>
        </ul>
        <div class="block sm:hidden">
            <icon 
                name="ant-design:menu-outlined" 
                size="2rem" 
                class="text-white ml-2 mt-3 cursor-pointer hover:text-burnt-yellow" 
                @click="isOpen = !isOpen" 
            />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.menu {
    li {
        @apply text-white;
        @apply mx-3;
        @apply hover:text-burnt-yellow;
    }
}
</style>