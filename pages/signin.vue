<script setup lang="ts">

const session = useSession()
const router = useRouter()

const username = ref("")
const password = ref("")

interface SignInErrors {
    username?: string,
    password?: string
}

const errors = ref<SignInErrors>({})
const hasRemoteError = ref(false)

function doLogin() {
    hasRemoteError.value = false
    if (errorsToObject<SignInErrors>(
        {
            username: [username, "Digite seu nome de usuário", []],
            password: [password, "Digite a sua senha", []]
        },
        errors
    )) return

    login({
        username: username.value,
        password: password.value
    }).then(handle({
        onFailure: error => {
            console.log(JSON.stringify(error))
            hasRemoteError.value = true
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
    }))
}
</script>

<template>
    <div class="flex h-screen flex-col-reverse sm:flex-row">
        <div class="hidden bg-blue-violet sm:block sm:w-1/2 md:w-3/5 lg:w-4/6 xl:w-9/12"></div>
        <div class="flex h-full sm:w-1/2 md:w-2/5 lg:w-2/6 xl:w-3/12">
            <div class="m-auto p-4 flex flex-col space-y-4 w-4/5">
                <h1 class="font-amatic-sc text-6xl">
                    Login
                </h1>
                <br>
                <tail-input-base :error="errors.username" placeholder="Nome de usuário" v-model="username" />
                <tail-input-base :error="errors.password" placeholder="Senha" type="password" v-model="password" />
                <tail-error v-if="hasRemoteError">
                    <p>Algo deu errado.</p>
                    <p>Verifique seu nome de usuário e sua senha.</p>
                </tail-error>
                <br>
                <tail-button-blue-violet title="Fazer login" @click="doLogin()" />
                <nuxt-link to="/signup">
                    <tail-button-seashell title="Criar conta" class="w-full" />
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
            </div>
        </div>
    </div>
</template>