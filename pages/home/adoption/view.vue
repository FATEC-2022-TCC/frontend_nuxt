<script setup lang="ts">
import { Adoption } from '~~/composables/public/Adoption';

const modal = useModal()
const session = useSession()

const route = useRoute()

const id = route.query["id"]?.toString() ?? ''

const response = ref<Adoption | null>(null)
const hasRemoteError = ref(false)

if (!id) navigateTo("/home/adoption")
else start()

function start() {
    getPublicAdoption(id).then(handle({
        onSuccess: onSuccess(response),
        onFailure: onFailure(hasRemoteError)
    }))
}

const onAdoptionRequest = () => requestAdoption(id).then(handle({
    onFailure: onFailure(hasRemoteError),
    onNullSucess: () => {
        modal.value = {
            title: "Tudo certo!!!",
            messages: [
                "A solicitação de adoção foi enviada",
                "Você pode a acompanhar na área de usuário"
            ],
            type: ModalType.Success
        }
    }
}))
</script>

<template>
    <div>
        <div v-if="response" class="flex-1 flex bg-white">
            <div class="flex-1 flex flex-col md:flex-row">
                <div class="flex-1">
                    <img class="w-full rounded" :src="response.picture">
                    <br>
                    <div class="flex flex-wrap gap-2 justify-center">
                        <img class="w-32" v-for="img in response.images" :src="img.data">
                    </div>
                    <br>
                </div>
                <div class="flex-1 flex flex-col justify-between p-4">
                    <div>
                        <h1 class="text-4xl font-amatic-sc">Nome:</h1>
                        <p class="text-xl"> {{ response.name }}</p>
                        <br>
                        <h1 class="text-4xl font-amatic-sc">Descrição:</h1>
                        <p class="text-xl"> {{ response.description }}</p>
                        <br>
                        <h1 class="text-4xl font-amatic-sc">Características:</h1>
                        <p class="text-xl">{{ response.category.name }} | {{ response.gender }} | {{ response.size }}
                        </p>
                        <br>
                        <h1 class="text-4xl font-amatic-sc">Publicado em:</h1>
                        <p class="text-xl"> {{ formatDate(response.created) }}</p>
                    </div>
                    <br>
                    <div class="w-full">
                        <tail-button-blue-violet v-if="session.token" title="Requisitar adoção"
                            @click="onAdoptionRequest" />
                        <tail-button-blue-violet v-else title="Faça o login para poder requisitar uma adoção"
                            @click="navigateTo('/signin')" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!hasRemoteError">
            <p>Carregando...</p>
        </div>
        <tail-error v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
    </div>
</template>