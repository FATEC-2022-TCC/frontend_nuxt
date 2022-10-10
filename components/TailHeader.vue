<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
    <div>
        <div class="bg-burnt-yellow p-4">
            4002-8922
        </div>
        <div class="bg-[#222] p-4 flex flex-col sm:flex-row">
            <img src="/quatro.png" class="h-10 object-contain">
            <div class="flex-1 hidden sm:block"></div>
            <ul class="menu flex-col mt-6 sm:flex-row sm:m-auto" :class="isOpen ? 'isOpen': 'isClosed'">
                <li>
                    <nuxt-link to="/home">Home</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/home/adoption">Adoption</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/home/contact">Contact</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/home/rules">Rules</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/login">Login</nuxt-link>
                </li>
            </ul>
            <div class="block sm:hidden">
                <icon name="ant-design:menu-outlined" size="2rem" class="text-white ml-2 mt-3"
                    @click="isOpen = !isOpen" />
            </div>
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

.isOpen {
    @apply flex;
    @apply sm:flex;
}

.isClosed {
    @apply hidden;
    @apply sm:flex;
}
</style>