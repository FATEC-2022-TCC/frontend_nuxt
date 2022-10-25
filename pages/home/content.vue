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
    onSuccess: set(content)
}))
</script>

<template>
    <div class="flex flex-col p-4" v-if="content" v-html="content.data"></div>
</template>