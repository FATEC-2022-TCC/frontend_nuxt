<script setup lang="ts">
import { ContentResponse } from '~~/composables/admin/Content';

const route = useRoute()
const router = useRouter()

const content = ref<ContentResponse | null>(null)

const id = route.query["id"]?.toString() ?? ""
if (!id) router.replace("/home")
else getPublicContent(id).then(handle({
    onFailure: error => {
        console.log(JSON.stringify(error))
        router.replace("/home")
    },
    onSuccess: onSuccess(content)
}))
</script>

<template>
    <div class="flex-1 bg-white" v-if="content">
        <img class="w-full h-64 object-cover" :src="content.background" alt="">
        <br>
        <h1 class="text-4xl font-amatic-sc text-center">{{ content.title }}</h1>
        <div class="flex flex-col p-4" v-if="content" v-html="content.data"></div>
    </div>
</template>