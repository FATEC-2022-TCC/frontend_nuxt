<script setup lang="ts">
import { CompliantProjection } from '~~/composables/admin/Compliant';

const search = ref("")
const closed = ref(false)
const page = ref(1)

const pagination = ref(emptyPage<CompliantProjection>())

const hasRemoteError = ref(false)

const getCompliant = () => getCompliantProjection(search.value, closed.value, page.value).then(handle({
    onSuccess: onSuccess(pagination),
    onFailure: onFailure(hasRemoteError)
}))

getCompliant()
</script>

<template>
    <div class="flex flex-col p-4">
        <div class="flex flex-col items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Denúncias
            </h1>
            <br>
            <tail-input-search v-model="search" @on-search="page = 1; getCompliant()" />
            <br>
            <div class="flex justify-between w-full">
                <div class="flex">
                    <h1 class="font-amatic-sc text-4xl">Denúncias em fechadas?&nbsp;</h1>
                    <p class="font-amatic-sc text-4xl" v-if="closed">Sim</p>
                    <p class="font-amatic-sc text-4xl" v-else>Não</p>
                </div>
                <tail-switch v-model="closed" @update:modelValue="page = 1; getCompliant()" />
            </div>
        </div>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <div class="flex flex-wrap justify-center flex-1">
                <tail-admin-compliant-projection class="mt-4 mr-4" v-for="p in pagination.items" :projection="p"
                    @on-edit="navigateTo(`/admin/compliant/edit?id=${$event}`)" />
            </div>
            <br>
            <tail-pagination class="self-center" v-model="page" @update:modelValue="getCompliant"
                :min-page="1" :max-page="pagination.pages" />
        </div>
        <tail-error class="mt-2" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
    </div>
</template>