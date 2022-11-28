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

    <div class="flex flex-col p-4">
        <h1 class="font-amatic-sc text-6xl">
            Visualizar usuário
        </h1>
        <br>
        <div v-if="response && !hasRemoteError">
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
        </div>
        <div v-else-if="!hasRemoteError">
            <p>Carregando...</p>
        </div>
        <tail-error v-else>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
    </div>
</template>