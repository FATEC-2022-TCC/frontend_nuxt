<script setup lang="ts">
import { UserProjection } from '~~/composables/admin/User';

const search = ref("")
const isActive = ref(true)
const isValidated = ref(true)
const page = ref(1)

const pagination = ref(emptyPage<UserProjection>())

const hasRemoteError = ref(false)

function start() {
    searchUserProjection(search.value, isActive.value, isValidated.value, page.value).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(pagination)
    }))
}

function paramChange() {
    page.value = 1
    start()
}

watch(isActive, paramChange)
watch(isValidated, paramChange)

start()
</script>

<template>
    <tail-loading-page class="flex flex-col p-4" :has-remote-error="hasRemoteError">
        <div class="flex flex-col gap-4">
            <h1 class="font-amatic-sc text-6xl self-start">
                Usuários
            </h1>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
            <div class="flex items-center justify-between">
                <p>O usuário está {{ isActive ? 'ativo' : 'inativo' }}</p>
                <tail-switch v-model="isActive" />
            </div>
            <div class="flex items-center justify-between">
                <p>O usuário {{ isValidated ? '' : 'não' }} está validado</p>
                <tail-switch v-model="isValidated" />
            </div>
        </div>
        <br>
        <div class="flex-1 flex flex-col gap-4 justify-between">
            <div class="flex flex-col gap-4">
                <tail-admin-user-projection v-for="p in pagination.items" :projection="p"
                    @click="navigateTo(`/admin/users/view?id=${p.id}`)"
                    @on-edit="navigateTo(`/admin/users/edit?id=${$event}`)" />
            </div>
            <tail-pagination class="self-center"
                v-model="page"
                @update:model-value="start"
                :min-page="1"
                :max-page="pagination.pages"
            />
        </div>
    </tail-loading-page>
</template>