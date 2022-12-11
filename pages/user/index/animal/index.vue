<script setup lang="ts">
import { AnimalProjection } from '~~/composables/user/Animal'

const page = ref(1)
const search = ref("")

const pagination = ref(emptyPage<AnimalProjection>())
const onDeleteData = ref(0)

const hasRemoteError = ref(false)

const start = () => getAnimalProjection(search.value, page.value).then(handle({
    onFailure: onFailure(hasRemoteError),
    onSuccess: onSuccess(pagination)
}))

const onDeleteConfirmed = () => deleteAnimal(`${onDeleteData.value}`).then(handle({
    onFailure: onFailure(hasRemoteError),
    finally: () => {
        onDeleteData.value = 0
        start()
    }
}))

start()
</script>

<template>
    <tail-loading-page class="flex flex-col gap-4 p-4 pb-32" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl self-start">
            Meus animais
        </h1>
        <tail-input-search v-model="search" @on-search="page = 1; start()" />
        <div class="flex-1 flex flex-col gap-4 justify-between">
            <div class="flex gap-4 justify-center">
                <tail-user-animal-projection
                    v-for="p in pagination.items"
                        :projection="p"
                        @click="navigateTo(`animal/view?id=${p.id}`)"
                        @on-delete="onDeleteData = p.id"
                        @on-edit="navigateTo(`animal/edit?id=${p.id}`)"
                    />
            </div>
            <tail-pagination
                class="self-center"
                v-model="page"
                @update:model-value="start"
                :min-page="1"
                :max-page="pagination.pages"
            />
        </div>
        <tail-modal-warn-delete
            v-if="onDeleteData"
            @on-click="onDeleteConfirmed"
            @on-dismiss="onDeleteData = 0"
        />
        <tail-fab-add @click="navigateTo('animal/add')" />
    </tail-loading-page>
</template>