<script setup lang="ts">
function onClick(index: number) {
    alert(`Item ${index} clicked`)
}
</script>

<template>
    <div class="w-full">
        <div class="block h-48 bg-blue-violet"></div>
        <ul>
            <nuxt-link to="/home">
                <li class="flex items-center p-4 hover:bg-bondi-blue hover:cursor-pointer hover:text-white">
                    <icon name="ant-design:home-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="font-nunito text-xl">
                        Página inicial
                    </p>
                </li>
            </nuxt-link>
            <li class="flex items-center p-4 hover:bg-bondi-blue hover:cursor-pointer hover:text-white">
                <icon name="ant-design:left-circle-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                <p class="font-nunito text-xl">
                    Sair
                </p>
            </li>
        </ul>
    </div>
</template>