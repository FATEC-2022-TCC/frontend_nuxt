<script setup lang="ts">

</script>

<template>
    <div class="w-full">
        <ul>
            <nuxt-link to="/admin">
                <li>
                    <icon name="ant-design:home-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Página inicial
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/admin/users">
                <li>
                    <icon name="ant-design:user-outlined" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Usuários
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/admin/content">
                <li>
                    <icon name="ant-design:book-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Conteúdo
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/admin/category">
                <li>
                    <icon name="ant-design:folder-open-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Categoria
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/admin/complaint">
                <li>
                    <icon name="ant-design:frown-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Denúncias
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/admin/adoption">
                <li>
                    <icon name="ant-design:smile-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Adoção
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/admin/reality">
                <li>
                    <icon name="ant-design:robot-filled" size="1.5rem" class="text-blue-violet cursor-pointer mr-4" />
                    <p class="text-xl">
                        Realidade aumentada
                    </p>
                </li>
            </nuxt-link>
            <nuxt-link to="/home">
                <li>
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

<style scoped lang="postcss">
li {
    @apply flex items-center p-4 hover:bg-burnt-yellow hover:cursor-pointer hover:text-white;
}
</style>