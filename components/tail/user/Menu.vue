<template>
    <div class="w-full">
        <div class="block h-48 bg-blue-violet"></div>
        <ul>
            <nuxt-link to="/user">
                <li class="flex items-center p-4 hover:bg-bondi-blue hover:cursor-pointer hover:text-white">
                    <icon name="ant-design:home-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Página inicial
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/home">
                <li class="flex items-center p-4 hover:bg-bondi-blue hover:cursor-pointer hover:text-white">
                    <icon name="ant-design:left-circle-filled" size="1.5rem"
                        class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Sair
                    </p>
                </li>
            </nuxt-link>
        </ul>
    </div>
</template>