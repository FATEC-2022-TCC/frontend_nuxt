<script setup lang="ts">

const cookieToken = useCookie('token')
const router = useRouter()

const username = ref("")
const password = ref("")

async function doLogin() {
    const body = {
        username: username.value,
        password: password.value
    }
    const result = await login(body)
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
    <div class="flex h-screen flex-col-reverse md:flex-row">
        <div class="hidden md:block bg-blue-violet md:w-3/5">

        </div>
        <div class="flex h-full md:w-2/5">
            <form class="m-auto p-4 flex flex-col space-y-4 w-4/5 lg:w-3/5" @submit.prevent="doLogin">
                <h1 class="font-amatic-sc text-6xl">
                    Login
                </h1>
                <br>
                <tail-input placeholder="Nome de usuário" v-model="username" required="required" />
                <tail-input placeholder="Senha" type="password" v-model="password" required="required" />
                <br>
                <tail-blue-violet-button title="Login" />
                <tail-seashell-button title="Criar conta" />
                <br>
                <a class="self-end">Esqueci minha senha</a>
            </form>
        </div>
    </div>
</template>