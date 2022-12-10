<script setup lang="ts">
import { User } from '~~/composables/admin/User';

const route = useRoute()

const response = ref<User | null>(null)

const hasRemoteError = ref(false)

const id = route.query["id"]?.toString() ?? ''

if (!id) navigateTo("/admin/users")
else start()

function start() {
    getUser(id).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(response)
    }))
}
</script>

<template>
    <tail-loading-page class="flex flex-col p-4" :has-remote-error="hasRemoteError" :is-loading="!response">
        <h1 class="font-amatic-sc text-6xl">
            Visualizar usuário
        </h1>
        <br>
        <h1 class="text-4xl font-amatic-sc">Nome: &nbsp;</h1>
        <p> {{ response.name }}</p>
        <br>
        <h1 class="text-4xl font-amatic-sc">Nome de usuário: &nbsp;</h1>
        <p> {{ response.username }}</p>
        <br>
        <h1 class="text-4xl font-amatic-sc">Email: &nbsp;</h1>
        <p> {{ response.email }}</p>
        <br>
        <h1 class="text-4xl font-amatic-sc">Tipo de usuário: &nbsp;</h1>
        <p> {{ response.authority }}</p>
        <br>
        <h1 class="text-4xl font-amatic-sc">Situação do usuário: &nbsp;</h1>
        <p> O usuário está {{ response.isActive ? 'ativo' : 'inativo' }}</p>
    </tail-loading-page>
</template>