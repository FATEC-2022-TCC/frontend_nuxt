<script setup lang="ts">
import { AdoptionProjection } from '~~/composables/user/Adoption';

const search = ref("")
const page = ref(1)
const pagination = ref(emptyPage<AdoptionProjection>())

const hasRemoteError = ref(false)

function start() {
    getUserAdoptionProjection(search.value, page.value).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(pagination)
    }))
}

start()
</script>

<template>
    <div class="flex flex-col p-4">
        <div class="flex flex-col items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Minhas requisições de adoção
            </h1>
            <br>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
        </div>
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col justify-between flex-1">
            <div class="flex flex-wrap justify-center gap-4">
                <tail-user-adoption-projection
                    v-for="p in pagination.items"
                    :projection="p"
                    @click="navigateTo(`adoption/view?id=${p.id}`)"
                />
            </div>
            <br>
            <tail-pagination
                class="self-center"
                v-model="page"
                @update:model-value="start"
                :min-page="1"
                :max-page="pagination.pages"
            />
        </div>
        <tail-error class="mt-2 mr-4" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
    </div>
</template>