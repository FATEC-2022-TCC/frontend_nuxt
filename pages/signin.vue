<script setup lang="ts">

const session = useSession()
const router = useRouter()

const username = ref("")
const password = ref("")

const hasError = ref(false)

function doLogin() {
    login({
        username: username.value,
        password: password.value
    }).then(handle(
        {
            onFailure: error => {
                alert(`Error: ${error.message} and ${error.code}`)
            },
            onSuccess: response => {
                const { token, type } = response
                const newSession = {
                    token,
                    type: TokenType.NONE
                }
                switch (type) {
                    case "NORMAL":
                        newSession.type = TokenType.NORMAL
                        break;
                    case "ADMIN":
                        newSession.type = TokenType.ADMIN
                        break;
                }
                session.value = newSession
                router.replace("/home")
            }
        }
    ))
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
                <nuxt-link to="/forgot" class="self-end">
                    <span class="mr-2">
                        Esqueci minha senha
                    </span>
                    <icon name="ant-design:unlock-filled" size="1.5rem" class="text-burnt-yellow" />
                </nuxt-link>
                <nuxt-link to="/home" class="flex items-center self-end">
                    <span class="mr-2">
                        Voltar para a pagina inicial
                    </span>
                    <icon name="ant-design:home-filled" size="1.5rem" class="text-burnt-yellow" />
                </nuxt-link>
            </form>
        </div>
    </div>
</template>