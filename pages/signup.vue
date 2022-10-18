<script setup lang="ts">

interface SignUpErrors {
    name?: string,
    username?: string,
    email?: string,
    password?: string,
    repeatedPassword?: string,
}

const errors = ref<SignUpErrors>({})

const name = ref('')
const username = ref('')
const password = ref('')
const email = ref('')
const repeatedPassword = ref('')

function doSignUp() {
    const checked: SignUpErrors = {}

    if (!name.value) {
        checked.name = "Digite seu nome completo"
    }

    if (!username.value) {
        checked.username = "Digite um nome de usuário"
    }

    if (!email.value) {
        checked.email = "Digite um email"
    }

    if (!password.value) {
        checked.password = "Digite uma senha"
    }

    if ((password.value != repeatedPassword.value) || !repeatedPassword.value) {
        checked.repeatedPassword = "Senhas diferentes"
    }

    errors.value = checked

    if (Object.keys(checked).length) return

    signup({
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
        repeatedPassword: repeatedPassword.value
    }).then(handle(
        {
            onFailure: error => {
                console.log("Error: " + JSON.stringify(error))
            },
            onSuccess: _ => {
                console.log("Usuário criado com sucesso")
            }
        }
    ))
}
</script>

<template>
    <div class="flex h-screen flex-col sm:flex-row-reverse">
        <div class="hidden bg-blue-violet sm:block sm:w-1/2 md:w-3/5">
        </div>
        <div class="flex h-full sm:w-1/2 md:w-2/5">
            <form class="m-auto p-4 flex flex-col space-y-4 w-4/5" @submit.prevent="doSignUp()">
                <h1 class="font-amatic-sc text-6xl">
                    Cadastro
                </h1>
                <br>
                <tail-input-base :error="errors.name" placeholder="Nome completo" v-model="name" minlength="2"
                    pattern="\w+\s\w+" />
                <tail-input-base :error="errors.username" placeholder="Apelido único" v-model="username" minlength="4"
                    maxlength="255" />
                <tail-input-base :error="errors.email" placeholder="E-mail" v-model="email" minlength="4"
                    maxlength="255" />
                <tail-input-base :error="errors.password" placeholder="Senha" type="password" v-model="password"
                    pattern="^([a-zA-Z0-9@*#]{8,15})$" />
                <tail-input-base :error="errors.repeatedPassword" placeholder="Repetir a senha" type="password"
                    v-model="repeatedPassword" />
                <br>
                <tail-button-blue-violet title="Cadastrar" />
                <br>
                <nuxt-link to="/home" class="flex items-center self-end">
                    <span class="mr-2">
                        Voltar para home
                    </span>
                    <icon name="ant-design:home-filled" size="1.5rem" class="text-burnt-yellow" />
                </nuxt-link>
            </form>
        </div>
    </div>
</template>