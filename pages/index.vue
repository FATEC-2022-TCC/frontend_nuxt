<script setup lang="ts">
import login from '~~/api/';

const router = useRouter()
const route = useRoute()
const counter = useState('counter', () => 0)

const result = await login({
    username: 'test',
    password: 'T'
})
result
    .takeIfError(error => {
        console.log(error)
    })
    .takeIfSuccess(token => {
        console.log(token)
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