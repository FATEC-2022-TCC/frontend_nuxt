<script setup lang="ts">
function onClick(index: number) {
    alert(`Item ${index} clicked`)
}
</script>

<template>
    <div class="w-full">
        <div class="block h-48 bg-blue-violet"></div>
        <li class="flex items-center p-4 hover:bg-bondi-blue hover:cursor-pointer hover:text-white"
            v-for="num in 10" :key="num" @click="onClick(num)">
            <icon 
                name="ant-design:menu-outlined" 
                size="1.5rem"
                class="text-blue-violet cursor-pointer mr-4" 
            />
            <p class="font-nunito text-xl">
                Function here
            </p>
        </li>
    </div>
</template>