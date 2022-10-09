<script setup lang="ts">
//import { login } from '~~/api';

const cookieToken = useCookie('token')
const router = useRouter()

const username = ref("")
const password = ref("")

async function doLogin() {
    // const response = await login(
    //     {
    //         username: username.value,
    //         password: password.value
    //     }
    // )
    // response.when({
    //     onSuccess: token => {
    //         console.log("login success: " + token)
    //         cookieToken.value = token
    //         router.push("/user")
    //     },
    //     onFailure: error => {
    //         console.log("login error: " + JSON.stringify(error))
    //     }
    // })
}
</script>

<template>
    <div class="flex h-screen flex-col-reverse md:flex-row">
        <div class="hidden md:block bg-blue-violet md:w-3/5">
            
        </div>
        <div class="flex h-full md:w-2/5">
            <div class="m-auto p-4 flex flex-col space-y-4 w-4/5 lg:w-3/5">
                <h1 class="font-amatic-sc text-6xl">
                    Login
                </h1>
                <br>
                <tail-input placeholder="Nome de usuário" />
                <tail-input placeholder="Senha" type="password" />
                <br>
                <tail-blue-violet-button title="Login" />
                <tail-seashell-button title="Criar conta" />
                <br>
                <a class="self-end">Esqueci minha senha</a>
            </div>
        </div>
    </div>
</template>