<script setup lang="ts">

const modal = useModal()

const name = ref('')
const username = ref('')
const password = ref('')
const email = ref('')
const repeatedPassword = ref('')

interface SignUpErrors {
    name?: string,
    username?: string,
    email?: string,
    password?: string,
    repeatedPassword?: string,
}

const errors = ref<SignUpErrors>({})
const hasRemoteError = ref(false)

function doSignUp() {
    hasRemoteError.value = false
    if (hasError<SignUpErrors>(
        {
            name: lengthValidator(name, "Digite seu nome completo"),
            username: lengthValidator(username, "Digite um nome de usuário"),
            email: lengthValidator(email, "Digite um email"),
            password: lengthValidator(password, "Digite uma senha"),
            repeatedPassword: [
                lengthValidator(repeatedPassword, "Digite uma senha"),
                buildValidator(
                    repeatedPassword,
                    repeated => repeated !== password.value,
                    "Por favor, digite a mesma senha"
                )
            ]
        },
        errors
    )) return

    signup({
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value
    }).then(handle({
        onFailure: error => {
            console.log("Error: " + JSON.stringify(error))
            hasRemoteError.value = true
        },
        onSuccess: _ => {
            modal.value = {
                title: "Tudo certo!!!",
                messages: [
                    "Você está cadastrado.",
                    "Agora é só fazer o login e usar a plataforma com cautela."
                ],
                type: ModalType.Success
            }
            navigateTo("/signin")
        }
    }))
}
</script>

<template>
    <div class="flex flex-col sm:flex-row-reverse min-h-screen">
        <div class="hidden h-auto bg-blue-violet sm:block sm:w-1/2 md:w-3/5"></div>
        <div class="flex h-auto sm:w-1/2 md:w-2/5">
            <div class="m-auto p-4 flex flex-col space-y-4 w-4/5">
                <h1 class="font-amatic-sc text-6xl">
                    Cadastro
                </h1>
                <br>
                <tail-input-base :error="errors.name" placeholder="Nome completo" v-model="name" />
                <tail-input-base :error="errors.username" placeholder="Apelido único" v-model="username" />
                <tail-input-base :error="errors.email" placeholder="E-mail" v-model="email" />
                <tail-input-base :error="errors.password" placeholder="Senha" type="password" v-model="password" />
                <tail-input-base :error="errors.repeatedPassword" placeholder="Repetir a senha" type="password"
                    v-model="repeatedPassword" />
                <tail-error v-if="hasRemoteError">
                    <p>Algo deu errado.</p>
                    <p>Você já está cadastrado?</p>
                    <p>Se sim, tente um método de recuperação de senha.</p>
                    <p>Caso não, contate a prefeitura de sua cidade.</p>
                </tail-error>
                <tail-button-blue-violet title="Cadastrar" @click="doSignUp" />
                <br>
                <nuxt-link to="/home" class="flex items-center self-end">
                    <span class="mr-2">
                        Voltar para home
                    </span>
                    <icon name="ant-design:home-filled" size="1.5rem" class="text-burnt-yellow" />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>