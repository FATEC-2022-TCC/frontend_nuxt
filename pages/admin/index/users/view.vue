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
        <template v-if="response">
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
            <h1 class="text-4xl font-amatic-sc">Tipo de usuário: &nbsp;</h1>
            <p> {{ response.authority }}</p>
            <br>
            <h1 class="text-4xl font-amatic-sc">Situação do usuário: &nbsp;</h1>
            <p> O usuário está {{ response.isActive ? 'ativo' : 'inativo' }}</p>
            <br><br>
            <h1 class="font-amatic-sc text-6xl">
                Informações privadas
            </h1>
            <br>
            <h1 class="text-4xl font-amatic-sc">Foto de identificação: &nbsp;</h1>
            <img :src="response.privateInfo.picture">
            <br>
            <h1 class="text-4xl font-amatic-sc">Email: &nbsp;</h1>
            <p> {{ response.privateInfo.email }}</p>
            <br>
            <h1 class="text-4xl font-amatic-sc">Telefone: &nbsp;</h1>
            <p> {{ response.privateInfo.telephony }}</p>
            <br>
            <h1 class="text-4xl font-amatic-sc">Documento: &nbsp;</h1>
            <p> {{ response.privateInfo.identification }}</p>
            <br>
            <h1 class="text-4xl font-amatic-sc">Endereço: &nbsp;</h1>
            <p> {{ response.privateInfo.address }}</p>
        </template>
    </tail-loading-page>
</template>