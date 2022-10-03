<script setup lang="ts">

import { login, adminTest } from '~~/api'

const router = useRouter()
const route = useRoute()

const counter = useState('counter', () => 0)

const result = await adminTest()
result
.takeIfError(error => {
    console.log(error)
})
.takeIfSuccess(_ => {
    console.log("Success")
})
</script>

<template>
    <h1>
        Hello World
    </h1>
    <h6>
        {{ $route.name }}
    </h6>
    <div>
        <h6>
            {{ counter }}
        </h6>
        <button @click="counter++">Increment</button>
    </div>
</template>