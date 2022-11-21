<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ContentProjection } from '~~/composables/admin/Content';
import { AdoptionProjection } from '~~/composables/public/Adoption';

const contentProjections = ref<Array<ContentProjection>>([])
const adoptionPagination = ref(emptyPage<AdoptionProjection>())
const contentPagination = ref(emptyPage<ContentProjection>())

getContentProjectionInEvidence().then(handle({
    onSuccess: onSuccess(contentProjections)
}))

searchPublicAdoption("", "", "", 1).then(handle({
    onSuccess: onSuccess(adoptionPagination)
}))

searchPublicContentProjection("", 1).then(handle({
    onSuccess: onSuccess(contentPagination)
}))
</script>

<template>
    <div>
        <carousel :autoplay="5000" pause-autoplay-on-hover :items-to-show="1.5" wrap-around
            v-if="contentProjections.length">
            <slide v-for="(cp, index) in contentProjections" :key="cp.id">
                <div class="flex flex-col h-52 md:h-80 mx-2 w-full cursor-pointer"
                    @click="navigateTo(`/home/content?id=${cp.id}`)">
                    <img :src="cp.background"
                        class="object-cover object-center w-full h-full rounded-bl-xl rounded-br-xl" />
                    <div class="absolute left-2 right-2 bottom-0 rounded-bl-xl rounded-br-xl"
                        :class="index % 2 == 0 ? 'bg-blue-violet' : 'bg-burnt-yellow'">
                        <h1 class="text-white text-4xl font-amatic-sc">
                            {{ cp.title }}
                        </h1>
                        <p class="text-white text-xl">
                            {{ cp.description }}
                        </p>
                    </div>
                </div>
            </slide>

            <template #addons>
                <navigation />
            </template>
        </carousel>
        <div class="p-4" v-if="adoptionPagination.items.length">
            <h1 class="font-amatic-sc text-4xl font-bold text-blue-violet">Novos animais por aqui:</h1>
            <br>
            <div class="flex justify-center gap-4">
                <tail-public-adoption-projection
                    v-for="p in adoptionPagination.items" :projection="p"
                    @click="navigateTo(`home/adoption/view?id=${p.id}`)"
                />
            </div>
            <br>
            <tail-button-blue-violet
                title="Encontrar mais"
                @click="navigateTo('home/adoption')"
            />
        </div>
        <div class="p-4" v-if="contentPagination.items.length">
            <h1 class="font-amatic-sc text-4xl font-bold text-blue-violet">Nosso blog:</h1>
            <br>
            <div class="flex justify-center gap-4">
                <tail-public-content-projection
                    v-for="p in contentPagination.items"
                    :projection="p"
                    @click="navigateTo(`home/content?id=${p.id}`)"
                />
            </div>
        </div>
        <tail-chatbot />
    </div>
</template>