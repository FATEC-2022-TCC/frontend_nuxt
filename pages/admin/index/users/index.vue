<script setup lang="ts">
import { UserProjection } from '~~/composables/admin/User';

const search = ref("")
const isActive = ref(true)
const page = ref(1)

const pagination = ref(emptyPage<UserProjection>())

const hasRemoteError = ref(false)

function start() {
    searchUserProjection(search.value, isActive.value, page.value).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(pagination)
    }))
}

watch(isActive, start)

start()
</script>

<template>
    <div class="flex flex-col p-4">
        <div class="flex flex-col items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Usuários
            </h1>
            <br>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
            <tail-select class="mt-2"
                :data="[
                    {description: 'Usuários ativos', value: true},
                    {description: 'Usuário inativos', value: false}
                ]"
                :visual-transform="data => data.description"
                :value-transform="data => data.value"
                v-model="isActive"
            />
        </div>
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <div class="flex flex-col gap-4">
                <tail-admin-user-projection
                    v-for="p in pagination.items"
                    :projection="p"
                    @click="navigateTo(`/admin/users/view?id=${p.id}`)"
                    @on-edit="navigateTo(`/admin/users/edit?id=${$event}`)"
                />
            </div>
            <div class="flex-1"></div>
            <br>
            <tail-pagination
                class="self-center"
                v-model="page"
                @update:model-value="start"
                :min-page="1"
                :max-page="pagination.pages"
            />
        </div>
        <tail-error v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
    </div>
</template>