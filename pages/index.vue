<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const counter = useState('counter', () => 0)
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