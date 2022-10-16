<script setup lang="ts">
const isOpen = ref(false)

const session = useSession()

function signOut() {
    session.value = {
        token: "",
        type: TokenType.NONE
    }
}
</script>

<template>
    <header class="bg-[#222] flex flex-col sm:flex-row p-4">
        <div class="flex">
            <div class="flex items-center sm:hidden flex-1">
                <icon name="ant-design:menu-outlined" size="2rem"
                    class="text-white cursor-pointer hover:text-burnt-yellow" @click="isOpen = !isOpen" />
            </div>
            <img src="/quatro.png" class="h-10 object-contain" />
        </div>
        <div class="flex-1"></div>
        <ul class="flex-col font-amatic-sc text-3xl sm:space-x-4 sm:flex-row sm:m-auto sm:flex"
            :class="isOpen ? 'flex' : 'hidden'">
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
            <li v-if="session.type == TokenType.NORMAL">
                <nuxt-link to="/user">Usuário</nuxt-link>
            </li>
            <li v-else-if="session.type == TokenType.ADMIN">
                <nuxt-link to="/admin">Administrador</nuxt-link>
            </li>
            <li v-if="session.type == TokenType.NONE">
                <nuxt-link to="/signin">Login</nuxt-link>
            </li>
            <li v-else>
                <p @click="signOut" class="hover:cursor-pointer">
                    Sair
                </p>
            </li>
        </ul>
    </header>
</template>

<style scoped lang="postcss">
li {
    @apply text-white hover:text-burnt-yellow;
}
</style>