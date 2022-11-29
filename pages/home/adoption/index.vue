<script setup lang="ts">
import { AdoptionProjection } from '~~/composables/public/Adoption';

const search = ref("")
const gender = ref("")
const size = ref("")
const page = ref(1)

const pagination = ref(emptyPage<AdoptionProjection>())
const hasRemoteError = ref(false)

const start = () => searchPublicAdoption(search.value, gender.value, size.value, page.value).then(handle({
    onSuccess: onSuccess(pagination),
    onFailure: onFailure(hasRemoteError)
}))

watch(gender, () => {
    page.value = 1;
    start()
})
watch(size, () => {
    page.value = 1;
    start()
})

start()
</script>

<template>
    <div class="flex-1 flex flex-col pb-4">
        <div class="flex flex-col gap-2 bg-white rounded p-4 pb-4 items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Adoção
            </h1>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
            <div class="w-full flex gap-2">
                <tail-select :data="['Macho', 'Fêmea']" v-model="gender">
                    <option value="">
                        Gênero do animal
                    </option>
                </tail-select>
                <tail-select :data="['Pequeno', 'Médio', 'Grande']" v-model="size">
                    <option value="">
                        Porte do animal
                    </option>
                </tail-select>
            </div>
        </div>
        <br>
        <div class="flex-1 flex flex-col justify-between">
            <div class="justify-center flex flex-wrap gap-4">
                <tail-public-adoption-projection
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
    </div>
</template>