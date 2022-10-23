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
    <header class="select-none bg-[#222] flex flex-col justify-between md:flex-row p-4">
        <div class="flex items-center justify-between">
            <div class="bg-lilac rounded p-1 aspect-square rotate-180 cursor-pointer md:hidden" @click="isOpen = !isOpen">
                <icon name="iconoir:menu-scale" size="2rem" class="text-blue-violet hover:text-black" />
            </div>
            <img src="/quatro.png" class="h-10 object-contain" />
        </div>
        <ul class="mt-4 flex-col font-amatic-sc text-3xl md:space-x-4 md:flex-row md:flex md:m-0"
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