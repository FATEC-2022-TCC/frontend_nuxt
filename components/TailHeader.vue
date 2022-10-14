<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
    <header class="bg-[#222] flex flex-col sm:flex-row p-4">
        <div class="flex">
            <div class="flex items-center sm:hidden flex-1">
                <icon 
                    name="ant-design:menu-outlined" 
                    size="2rem" 
                    class="text-white cursor-pointer hover:text-burnt-yellow" 
                    @click="isOpen = !isOpen" 
                />
            </div>
            <img src="/quatro.png" class="h-10 object-contain"/>
        </div>
        <div class="flex-1"></div>
        <ul class="menu flex-col font-amatic-sc text-3xl sm:space-x-4 sm:flex-row sm:m-auto sm:flex" :class="isOpen ? 'flex' : 'hidden'">
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
            <div class="hidden w-4 sm:block"></div>
            <li>
                <nuxt-link to="/signin">Login</nuxt-link>
            </li>
        </ul>
    </header>
</template>

<style lang="postcss" scoped> 
.menu {
    li {
        @apply text-white;
        @apply hover:text-burnt-yellow;
    }
}
</style>