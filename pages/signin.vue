<script setup lang="ts">

const cookieToken = useCookie('token')
const router = useRouter()

const username = ref("")
const password = ref("")

async function doLogin() {
    const result = await login(
        {
            username: username.value,
            password: password.value
        }
    )
    result.handle({
        onFailure: error => {
            console.log(`Error: ${error.message} and ${error.code}`)
        },
        onSuccess: token => {
            console.log(`Token: ${token}`)
            cookieToken.value = token
            router.replace("/user")
        }
    })
}
</script>

<template>
    <div class="flex h-screen flex-col-reverse sm:flex-row">
        <div class="hidden bg-blue-violet sm:block sm:w-1/2 md:w-3/5"></div>
        <div class="flex h-full sm:w-1/2 md:w-2/5">
            <form class="m-auto p-4 flex flex-col space-y-4 w-4/5" @submit.prevent="doLogin">
                <h1 class="font-amatic-sc text-6xl">
                    Login
                </h1>
                <br>
                <tail-input placeholder="Nome de usuário" v-model="username" required="required" />
                <tail-input placeholder="Senha" type="password" v-model="password" required="required" />
                <br>
                <tail-blue-violet-button title="Fazer login" />
                <nuxt-link to="/signup">
                    <tail-seashell-button title="Criar conta" class="w-full" />
                </nuxt-link>
                <br>
                <br>
                <div class="cursor-pointer self-end flex items-center">
                    <nuxt-link to="/forgot" class="mr-2">Esqueci minha senha</nuxt-link>
                    <icon name="ant-design:unlock-filled" size="1.5rem" class="text-burnt-yellow" />
                </div>
                <div class="cursor-pointer self-end flex items-center">
                    <nuxt-link to="home" class="mr-2">Voltar para home</nuxt-link>
                    <icon name="ant-design:home-filled" size="1.5rem" class="text-burnt-yellow" />
                </div>
            </form>
        </div>
    </div>
</template>