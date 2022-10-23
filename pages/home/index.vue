<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ContentProjection } from '~~/composables/admin/Content';

const contentProjections = ref<Array<ContentProjection>>([])

getContentProjectionInEvidence().then(handle({
    onSuccess: result => contentProjections.value = result
}))
</script>

<template>
    <div>
        <carousel :autoplay="5000" pause-autoplay-on-hover :items-to-show="1.01" wrap-around
            v-if="contentProjections.length">
            <slide v-for="(cp, index) in contentProjections" :key="cp.id">
                <div class="h-80 w-full">
                    <img :src="cp.background" class="object-cover w-full h-full rounded-bl-xl rounded-br-xl">
                    <div class="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        rounded-bl-xl
                        rounded-br-xl
                    " :class="index % 2 == 0 ? 'bg-blue-violet' : 'bg-burnt-yellow'">
                        <h1 class="text-white text-6xl font-amatic-sc">
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
    </div>
</template>