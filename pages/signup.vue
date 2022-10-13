<script setup lang="ts">
const name = ref('')
const username = ref('')
const password = ref('')
const repeatedPassword = ref('')

async function signUp() {
    if (password.value != repeatedPassword.value) {
        alert("Senhas diferentes")
        return
    }
    const response = await signup({
        name: name.value,
        username: username.value,
        password: password.value
    })
    response.handle({
        onFailure: error => {
            alert("Error: " + JSON.stringify(error))
        },
        onSuccess: _ => {
            alert("Usuário criado com sucesso")
        }
    })
}
</script>

<template>
    <div class="flex h-screen flex-col sm:flex-row-reverse">
        <div class="hidden bg-blue-violet sm:block sm:w-1/2 md:w-3/5">
        </div>
        <div class="flex h-full sm:w-1/2 md:w-2/5">
            <form class="m-auto p-4 flex flex-col space-y-4 w-4/5" @submit.prevent="signUp">
                <h1 class="font-amatic-sc text-6xl">
                    Cadastro
                </h1>
                <br>
                <tail-input placeholder="Nome completo" required="required" v-model="name" minlength="2" pattern="\w+\s\w+" />
                <tail-input placeholder="Apelido único" required="required" v-model="username" minlength="4" maxlength="255" />
                <tail-input placeholder="Senha" type="password" required="required" v-model="password" pattern="^([a-zA-Z0-9@*#]{8,15})$" />
                <tail-input placeholder="Repetir a senha" type="password" required="required" v-model="repeatedPassword" />
                <br>
                <tail-blue-violet-button title="Login" />
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