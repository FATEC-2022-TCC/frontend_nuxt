<template>
    <div class="w-full">
        <ul>
            <nuxt-link to="/user">
                <li>
                    <icon name="ant-design:home-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Página inicial
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/user/animal">
                <li>
                    <icon name="icon-park-solid:dog" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Meus animais
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/user/adoption">
                <li>
                    <icon name="ant-design:heart-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Minhas adoções
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/user/password">
                <li>
                    <icon name="ant-design:lock-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Minha senha
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/home">
                <li>
                    <icon name="ant-design:left-circle-filled" size="1.5rem"
                        class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Voltar
                    </p>
                </li>
            </nuxt-link>
        </ul>
    </div>
</template>

<style scoped lang="postcss">
li {
    @apply flex items-center p-4 hover:bg-burnt-yellow hover:cursor-pointer hover:text-white;
}
</style>